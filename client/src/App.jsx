import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllGames from "./Pages/AllGames";
import Landing, { loader as landingLoader } from "./Pages/Landing";
import Challengers from "./Pages/Challengers";
import Valorant, { loader as valorantLoader } from "./Pages/Valorant";
import Pubg, { loader as pubgLoader } from "./Pages/Pubg";
import Fortnite, { loader as fortniteLoader } from "./Pages/Fortnite";
import HomeLAyout from "./Pages/HomeLAyout";
import Dashboard, { loader as dashboardLoader } from "./Pages/Dashboard";
import Stats from "./Pages/Stats";
import Register, { action as registerAction } from "./Pages/Register";
import Login, { action as loginAction } from "./Pages/Login";
import Admin, { loader as adminLoader } from "./Pages/Admin";
import EditGames, { loader as editGameLoader } from "./Pages/EditGames";
import { action as deleteGameAction } from "./Pages/DeleteGame";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Error from "./Pages/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLAyout />,
    errorElement:<Error/>,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "allgames",
        element: <Dashboard />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AllGames />,
          },
          {
            path: "challenges",
            element: <Challengers />,
          },
          {
            path: "valorant",
            element: <Valorant />,
            loader: valorantLoader,
          },
          {
            path: "pubg_pc",
            element: <Pubg />,
            loader: pubgLoader,
          },
          {
            path: "fortnite",
            element: <Fortnite />,
            loader: fortniteLoader,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-game/:id",
            element: <EditGames />,
            loader: editGameLoader,
          },
          {
            path: "delete-ship/:id",
            action: deleteGameAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
