import "../styles/Rewards.css";

function Rewards() {
  return (
    <div className="mainrewards">
      <h1>Rewards</h1>
      <div className="rewards">
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
      </div>
    </div>
  );
}

export default Rewards;
