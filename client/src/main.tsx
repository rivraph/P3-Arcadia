import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Admin from "./components/auth/isAdmin";
import Users from "./components/auth/isUsers";
import About from "./pages/About";
import App from "./pages/App";
import Connexion from "./pages/Connexion";
import Contact from "./pages/Contact";
import GameList from "./pages/Gamelist";
import MainGame from "./pages/MainGame";
import NotFound from "./pages/NotFound";
import Profil from "./pages/Profil";
import Register from "./pages/Register";
import Rewards from "./pages/Rewards";
/* import RewardsHistory from "./pages/RewardsHistory";
import ScoresHistory from "./pages/ScoresHistory"; */
import HomePage from "./pages/homePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navigate
        to={
          localStorage.getItem("role") === "boss"
            ? "/admin/profil"
            : localStorage.getItem("role") === "user"
              ? "/users/profil"
              : "/homepage"
        }
      />
    ),
  },
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "homepage",
        element: <HomePage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "connexion",
        element: <Connexion />,
      },
      {
        path: "users",
        element: <Users />,
        children: [
          {
            path: "gamelist",
            element: <GameList />,
          },
          {
            path: "profil",
            element: <Profil />,
          },
          {
            path: "maingame",
            element: <MainGame />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "rewards",
            element: <Rewards />,
          },
          /*  {
            path: "scoreshistory",
            element: <ScoresHistory />,
          },
          {
            path: "rewardshistory",
            element: <RewardsHistory />,
          }, */
          {
            path: "contact", // Page de contact
            element: <Contact />,
          },
        ],
      },
      {
        path: "admin",
        element: <Admin />, // Composant administrateur
        children: [
          {
            path: "profil", // Profil admin
            element: <Profil />,
          },
          {
            path: "gamelist", // Liste des jeux pour l'admin
            element: <GameList />,
          },
          {
            path: "maingame", // Jeu principal pour l'admin
            element: <MainGame />,
          },
          {
            path: "about", // Page à propos pour l'admin
            element: <About />,
          },
          {
            path: "rewards", // Récompenses admin
            element: <Rewards />,
          },
          /* {
            path: "scoreshistory", // Historique des scores admin
            element: <ScoresHistory />,
          },
          {
            path: "rewardshistory", // Historique des récompenses admin
            element: <RewardsHistory />,
          }, */
          {
            path: "contact", // Contact admin
            element: <Contact />,
          },
        ],
      },
    ],
  },
  {
    path: "*", // Route de secours pour les pages non trouvées
    element: <NotFound />, // Page d'erreur 404
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
