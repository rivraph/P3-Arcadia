import "../styles/Rewards.css";

function Rewards() {
  return (
    <>
      <h1>Rewards</h1>
      <div className="points-card">
        <img src="../assets/card_mod.webp" alt="Reward Card" />

        <button type="button">Buy for 100 points</button>
      </div>

      <div className="points-card">
        <img src="../assets/card_mod.webp" alt="Reward Card" />

        <button type="button">Buy for 500 points </button>
      </div>

      <div className="points-card">
        <img src="../assets/card_mod.webp" alt="Reward Card" />

        <button type="button">Buy for 1000 points</button>
      </div>
    </>
  );
}

export default Rewards;
