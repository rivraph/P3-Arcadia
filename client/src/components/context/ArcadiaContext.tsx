import { createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

const ContextArcadia = createContext<ContextArcadiaType>({
  handleClickRewards: () => {},
  debPoints: 0,
  userScores: 0,
  userData: {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    number: "",
    address: "",
    zipcode: "",
    city: "",
    country: "",
    birthdate: "",
    registration_date: "",
    tel_num: "",
  },
  userId: 0 || null,
  edit: false,
  setDebPoints: () => {},
  setUserScores: () => {},
  setUserData: () => {},
  setEdit: () => {},
  handleKeyPress: () => {},
  handleEditClick: () => {},
  toggleSwitch: () => {},
});

type ContextArcadiaType = {
  debPoints: number;
  setDebPoints: Dispatch<SetStateAction<number>>;
  userScores: number;
  setUserScores: Dispatch<SetStateAction<number>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  userId: string | null;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  handleClickRewards: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  handleKeyPress: (event: React.KeyboardEvent) => void;
  handleEditClick: () => void;
  toggleSwitch: () => void;
};

type UserData = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  number: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  birthdate: string;
  registration_date: string;
  tel_num: string;
};

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [debPoints, setDebPoints] = useState<number>(0);
  const [userScores, setUserScores] = useState<number>(0);
  const [userId] = useState(() => localStorage.getItem("id"));
  const [userData, setUserData] = useState<UserData>({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    number: "",
    address: "",
    zipcode: "",
    city: "",
    country: "",
    birthdate: "",
    registration_date: "",
    tel_num: "",
  });
  const [edit, setEdit] = useState(false);

  // fonction du clic info du rewards choisi
  const handleClickRewards = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    // récupère l'ID
    const articleId =
      event.currentTarget.closest("div.points-card")?.querySelector("img")
        ?.dataset.points || "";
    console.info("récupération id =>", articleId);

    // récupère le nombre de parties physique échangées en prévision de rewards history
    const partNum =
      event.currentTarget
        .closest("div.points-card")
        ?.querySelector("div.number")?.innerHTML || "";
    console.info(partNum);

    // récupère le nombre de points à débiter
    const debpts = Number(event.currentTarget.dataset.points) || 0;
    console.info("nombre de points à débiter =>", debpts);

    //stock ces points dans debPoints
    setDebPoints(debpts);
    window.confirm("Are you sure? If you click OK, you validate your choice");
  };

  // fetch les données de l'utilisateur en fonction de l'id enregistrés dans le localStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/scores/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (response.ok) {
          const [userScoresData] = await response.json();
          setUserScores(userScoresData.user_points);
        }
      } catch (err) {
        window.alert("erreur de lecture des jeux");
        console.error("Erreur lors de la connexion :", err);
      }
    };
    fetchData();
  }, [userId]);

  // mise à jour des points de l'utilisateur dans la bdd
  useEffect(() => {
    if (debPoints === 0) return;
    const userUpdatePoints = Number(userScores) - debPoints;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/scores/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: Number(userId),
              users_id: Number(userId),
              user_points: userUpdatePoints,
            }),
          },
        );
        if (response.ok) {
          const [updateScoresData] = await response.json();
          console.info(
            "Données misent à jour reçues du backend :",
            updateScoresData,
          );
          setUserScores(updateScoresData.user_points);
          setDebPoints(0); // réinitialisation du nombre de points débattus après le clic sur le bouton
        }
      } catch (err) {
        window.alert("erreur de lecture des jeux");
        console.error("Erreur lors de la connexion :", err);
      }
    };
    fetchData();
  }, [userId, debPoints, userScores]);

  //fonction collecte infos de la bdd au chargement de la page pour remplir les champs en dynamique
  useEffect(() => {
    console.info("num user lus au chargement de la page => ", userId);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            method: "get",
          },
        );

        if (response.status === 200) {
          const allUserData = await response.json();
          const userData = allUserData[0];
          setUserData(userData); // Enregistre les données dans le state
          console.info(
            "User data lus en front au chargement de la page",
            userData,
          );
        } else {
          console.error(
            "Erreur lors de la récupération des données utilisateur:",
            await response.json(),
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error,
        );
      }
    };
    fetchData();
  }, [userId]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      console.info("bouton édition appuyé");
    }
  };

  const toggleSwitch = () => {
    setEdit(!edit);
  };

  //fonction pour mettre à jour les informations à l'aide du bouton modifier
  const handleEditClick = async () => {
    if (edit === true) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          },
        );

        console.info("données user au clic envoyé en PUT =>", userData);

        if (response.ok) {
          const [userUpdateData] = await response.json();
          console.info(
            "donnée modifiées recues et enregistrés du back pour affichage => ",
            userUpdateData,
          );
          setUserData(userUpdateData);
          toggleSwitch();
        } else {
          console.error("Error fetching user data:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    if (edit === false) {
      toggleSwitch();
    }
  };

  return (
    <ContextArcadia.Provider
      value={{
        debPoints,
        setDebPoints,
        userId,
        userScores,
        handleClickRewards,
        setUserScores,
        userData,
        setUserData,
        handleKeyPress,
        handleEditClick,
        setEdit,
        edit,
        toggleSwitch,
      }}
    >
      {children}
    </ContextArcadia.Provider>
  );
}

function useContextProvider() {
  const context = useContext(ContextArcadia);
  return context;
}

export { ContextProvider, useContextProvider };
