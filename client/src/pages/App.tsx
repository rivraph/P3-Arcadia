import "../styles/App.css";
import GameList from "./Gamelist";
function App() {
  return (
    <div className="page">
      <header>
        <h1 className="logo">ARCADIA</h1>
      </header>

      <main className="text-box">
        <GameList />
      </main>

      <footer>
        Développé par le&nbsp;
        <a
          href="https://www.wildcodeschool.com/"
          className="wcs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Max, Raph, Vinc, Sab
        </a>
      </footer>
    </div>
  );
}

export default App;
