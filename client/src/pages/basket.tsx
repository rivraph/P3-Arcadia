import "../styles/Basket.css";
import { useContextProvider } from "../components/context/ArcadiaContext";

function Basket() {
  const id = localStorage.getItem("id");
  console.info("controle id envoyé pour le fetch", id);
  const { userScores, userData } = useContextProvider();

  console.info("userScore dans basket =>", userScores);
  console.info("userData dans basket =>", userData);

  return (
    <div className="mainbasket">
      <h1>
        {userData.firstname}{" "}
        {userScores < 0
          ? ": 0"
          : userScores === null
            ? ": 0"
            : userScores > 0
              ? `: ${userScores}`
              : ""}{" "}
        🏆
      </h1>
    </div>
  );
}

export default Basket;
