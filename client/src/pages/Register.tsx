import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useContextProvider } from "../components/context/ArcadiaContext";

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserId, setUserScores } = useContextProvider();

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const dataToSend = {
      firstname: firstnameRef.current?.value,
      lastname: lastnameRef.current?.value,
      email: emailRef.current?.value,
      password,
      tel_num: "",
      role: "user",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        },
      );

      if (response.ok) {
        const insertUser = await response.json();
        console.info("Données reçues du backend :", insertUser.role);

        // Mise à jour du rôle dans le localStorage
        const role = insertUser.role;
        console.info(
          "donnée de role stocké avant injection dans localstorage",
          role,
        );
        localStorage.setItem("role", role);
        localStorage.setItem("id", insertUser.id);
        localStorage.setItem("gamename", "");
        setUserId(insertUser.id);
        setUserScores(0);
        console.info(
          "Rôle enregistré dans localStorage :",
          localStorage.getItem("role"),
        );

        // Redirection basée sur le rôle
        if (localStorage.getItem("role") === "boss") {
          console.info("navigue vers admin");
          navigate("/admin/profil");
        } else if (localStorage.getItem("role") === "user") {
          console.info("navigue vers users");
          navigate("/users/gamelist");
        } else {
          console.info("erreur donc navigue vers homepage");
          navigate("/homepage"); // Par défaut, redirige vers la homepage
        }
      } else {
        console.info("Échec de la connexion : ");
        navigate("/homepage");
        alert("Échec de la connexion. Vérifiez votre email et mot de passe.");
      }
    } catch (err) {
      navigate("/homepage");
      console.error("Erreur lors de la connexion :", err);
    }
  };

  return (
    <div className="mainregistercontener">
      <div className="main-register">
        <h1>REGISTER</h1>
        <form className="labelgroup" onSubmit={handleSubmit}>
          <label htmlFor="username">Firstname:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            ref={firstnameRef}
            placeholder="Firstname"
          />

          <label htmlFor="password">Lastname:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            ref={lastnameRef}
            placeholder="Lastname"
          />

          <label htmlFor="password">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            ref={emailRef}
            placeholder="Email"
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="Password"
          />

          <button type="submit" className="button-link-register">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
