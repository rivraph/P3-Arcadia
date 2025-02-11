import "../styles/Basket.css";
import { useContextProvider } from "../components/context/ArcadiaContext";

function Basket() {
  const { userScores, userData } = useContextProvider();
  console.info("controle userData dans basket => ", userData.firstname);
  console.info("controle userScores dans basket => ", userScores);

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
