import { useEffect, useState } from "react";
import "../styles/Basket.css";

function Basket() {
  const id = localStorage.getItem("id");
  console.info("controle id envoyé pour le fetch", id);
  const [points, setPoints] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/scores/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.ok) {
          const [userInfo] = await response.json();
          const points = userInfo.user_points;
          const name = userInfo.firstname;
          setPoints(points);
          setName(name);
          console.info("Données reçues du backend :", points);
        }
      } catch (err) {
        window.alert("erreur de lecture des jeux");
        console.error("Erreur lors de la connexion :", err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="mainbasket">
      <h1>
        {name} : {points} 🏆
      </h1>
    </div>
  );
}

export default Basket;
