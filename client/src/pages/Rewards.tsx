import { useEffect, useState } from "react";
import "../styles/Rewards.css";

type articleProps = {
  id: number;
  article_name: string;
  debpoints: number;
  parts: number;
  description: string;
};

type userScoresProps = {
  id: number;
  users_id: number | null;
  user_points: number;
  game_max_score_id: number;
  game_max_score: number;
};

function Rewards() {
  const [article, setArticle] = useState<articleProps[]>([]);
  const [userScores, setUserScores] = useState<userScoresProps[]>([]);
  const [debPoints, setDebPoints] = useState<number>(0);
  const [userId] = useState(() => localStorage.getItem("id"));

  // fetch les données stockés dans la BDD rewards
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (response.ok) {
          const articleData = await response.json();
          setArticle(articleData);
        }
      } catch (err) {
        window.alert("erreur de lecture des jeux");
        console.error("Erreur lors de la connexion :", err);
      }
    };
    fetchData();
  }, []);

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
          const [userData] = await response.json();
          setUserScores(userData.user_points);
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
    console.info("controle soustraction =>", userUpdatePoints);

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

  const handleClick = (
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
    window.confirm(
      `Are you sure? If you click OK, ${debPoints} points will be displayed`,
    );
  };

  return (
    <>
      <h1>Rewards</h1>
      <div className="mainrewards">
        {article.map((a) => (
          <div className="rewards" key={a.id}>
            <div className="points-card">
              <img
                src="../assets/card_mod.webp"
                alt="arriere plan de la card"
                data-points={a.id}
              />
              <div className="number">{a.parts}</div>
              <button
                type="button"
                onClick={handleClick}
                data-points={a.debpoints.toString()}
              >
                {a.article_name}
              </button>
              <div className="description">
                <p>{a.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Rewards;
