import { useEffect, useState } from "react";
import { useContextProvider } from "../components/context/ArcadiaContext";
import "../styles/Rewards.css";

type articleProps = {
  id: number;
  article_name: string;
  debpoints: number;
  parts: number;
  description: string;
};

function Rewards() {
  const [article, setArticle] = useState<articleProps[]>([]);
  const { handleClickRewards, userScores } = useContextProvider();

  // Fetch des articles depuis la BDD
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
        window.alert("Erreur de lecture des jeux");
        console.error("Erreur lors de la connexion :", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Rewards</h1>
      <div className="mainrewards">
        {article.map((a) => {
          const isDisabled = a.debpoints > userScores;

          return (
            <div
              className={`rewards ${isDisabled ? "disabled" : ""}`}
              key={a.id}
            >
              <div className="points-card">
                <img
                  src="../assets/card_mod.webp"
                  alt="arrière-plan de la carte"
                  data-points={a.id}
                />
                <div className="number">{a.parts}</div>
                <button
                  type="button"
                  onClick={isDisabled ? undefined : handleClickRewards}
                  data-points={a.debpoints.toString()}
                  disabled={isDisabled}
                >
                  {a.article_name}
                </button>
                <div className="description">
                  <p>{a.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Rewards;
