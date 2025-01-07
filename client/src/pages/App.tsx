import "../styles/App.css";

function App() {
  return (
    <>
      <header>
        <h1 className="logo">ARCADIA</h1>
      </header>

      <main className="text-box">
        <hgroup className="block-primary">
          <h2 className="block-primary-main">Bientôt ARCADIA</h2>
          <p className="block-primary-sub">
            Des jeux, des jeux et encore des jeux d'arcade
          </p>
        </hgroup>
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
    </>
  );
}

export default App;
