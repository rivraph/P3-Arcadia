import { useEffect, useState } from "react";
import "../styles/Rewards.css";

type articleProps = {
  id: number;
  article_name: string;
  debpoints: number;
  parts: number;
  description: string;
  image_url: string;
};

function Rewards() {
  const [article, setArticle] = useState<articleProps[]>([]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const articleId =
      event.currentTarget.closest("div.points-card")?.querySelector("img")
        ?.dataset.points || "";
    console.info("récupération id =>", articleId);

    const partNum =
      event.currentTarget
        .closest("div.points-card")
        ?.querySelector("div.number")?.innerHTML || "";
    console.info("récupération part =>", partNum);

    const pts = Number(event.currentTarget.dataset.points) || "";
    console.info("nombre de points à débité =>", pts);

    // Ajouter des points à l'utilisateur dans la bdd
    // Envoyer une notification à l'utilisateur
    // Afficher un message de succès ou d'échec
  };

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
          console.info("Données retour du backend :", articleData);
        }
      } catch (err) {
        window.alert("erreur de lecture des jeux");
        console.error("Erreur lors de la connexion :", err);
      }
    };
    fetchData();
  }, []);

  console.info(article);

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
