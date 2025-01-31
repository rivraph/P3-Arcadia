import "../styles/Basket.css";

function Basket() {
  const value = 10000;
  console.info("affichage du panier ??");

  return (
    <div className="mainbasket">
      <h1> {value} 🏆</h1>
    </div>
  );
}

export default Basket;
