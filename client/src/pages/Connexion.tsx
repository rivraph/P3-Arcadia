import { useEffect, useRef, useState } from "react";
import "../styles/Connexion.css";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../components/context/ArcadiaContext";

function Connexion() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { userId, setUserId, setIsModalOpen, setIsOverlayVisible } =
    useContextProvider();
  console.info("userId", userId);

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const dataToSend = {
        email: emailRef.current?.value,
        password,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        },
      );

      console.info("Statut de la réponse :", response.status);

      if (response.ok) {
        const dataObject = await response.json();
        console.info("Données reçues du backend :", dataObject);

        // Mise à jour du rôle dans le localStorage et state userId
        const role = dataObject.role;
        const firstname = dataObject.firstname;
        const id = dataObject.id;
        setUserId(Number(id));
        localStorage.setItem("id", id);
        localStorage.setItem("prenom", firstname);
        localStorage.setItem("role", role);
        setIsOverlayVisible(false);
        setIsModalOpen(false);

        // Redirection basée sur le rôle
        if (localStorage.getItem("role") === "boss") {
          if (isMobile) {
            window.alert("Admin login is not available on mobile");
            navigate("/");
            // Redirige vers la page d'accueil ou une autre page
            return null;
          }
          console.info("navigue vers admin");
          navigate("/admin/adminpage");
        } else if (localStorage.getItem("role") === "user") {
          console.info("navigue vers users");
          navigate("/users/gamelist");
        } else {
          console.info("erreur donc navigue vers homepage");
          navigate("/homepage");
          // Par défaut, redirige vers la homepage
        }
      } else {
        console.info("Échec de la connexion :", await response.json());
        alert("Échec de la connexion. Vérifiez votre email et mot de passe.");
        navigate("/homepage");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
      navigate("/homepage");
    }
  };

  useEffect(() => {
    // Vérifier la taille de l'écran à chaque redimensionnement
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Par exemple, < 768px = mobile
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <div className="mainconnexion">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            ref={emailRef}
            id="email"
            name="email"
            placeholder="Email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="Password"
            required
          />

          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
}

export default Connexion;
