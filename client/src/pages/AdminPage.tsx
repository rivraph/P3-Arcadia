import { useEffect, useState } from "react";
import "../styles/AdminPage.css";

type allScores = {
  id: number;
  users_id: number;
  user_points: number;
  game_max_score_id: number;
  game_max_score: number;
};

type allUsersData = {
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
function AdminPage() {
  const [allUserScores, setAllUserScores] = useState<allScores[]>([]);
  const [usersDatas, setUsersDatas] = useState<allUsersData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            method: "get",
          },
        );

        if (response.status === 200) {
          const users = await response.json();
          console.info(
            "controle users stocké dans la BDD demandé par l'admin => ",
            users,
            setUsersDatas(users),
          );
        } else {
          console.error(
            "Erreur lors de la récupération des données des utilisateurs par l'admin:",
            await response.json(),
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des utilisateurs par l'admin:",
          error,
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/scores`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (response.ok) {
          const allScoresData = await response.json();
          console.info("fetch Scores recu par l'admin =>", allScoresData);
          setAllUserScores(allScoresData);
        }
      } catch (err) {
        console.error("Erreur lors de la connexion :", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mainconteneuradmin">
      <h1>Admin Page</h1>
      <div className="adminarray">
        <div className="column">
          <h2>Firstname</h2>
          {usersDatas.map((u) => (
            <p key={u.id}>{u.firstname}</p>
          ))}
        </div>
        <div className="column">
          <h2>Lastname</h2>
          {usersDatas.map((u) => (
            <p key={u.id}>{u.lastname}</p>
          ))}
        </div>
        <div className="column">
          <h2>email</h2>
          {usersDatas.map((u) => (
            <p key={u.id}>{u.email}</p>
          ))}
        </div>
        <div className="column">
          <h2>Scores</h2>
          {allUserScores.map((s) => (
            <p key={s.id}>{s.user_points}</p>
          ))}
        </div>
        <div className="column">
          <h2>MDP</h2>
          {usersDatas.map((u) => (
            <p key={u.id}>{u.password}</p>
          ))}
        </div>
        <div className="column">
          <h2>MDP</h2>
          {usersDatas.map((u) => (
            <p key={u.id}>{u.role}</p>
          ))}
        </div>
      </div>
      {/* Admin Page */}
    </div>
  );
}

export default AdminPage;
