import "../styles/Connexion.css";

function Connexion() {
  return (
    <>
      <div className="mainconnexion">
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default Connexion;
