import { useEffect, useContext } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import axios from "axios";
import RootLayout from "./RootLayout";

import Authentication from "./pages/Authentication";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import DiscussionForum from "./pages/DiscussionForum";

import { ConfigProvider } from "antd";
import ProtectRoutes from "./ProtectRoutes";
import Stats from "./pages/Stats";

const SESSIONSAPIURL = "http://localhost:3000/session";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <p>Page not found!!</p>,
    children: [
      {
        path: "/",
        element: <Authentication />,
        children: [
          {
            index: true,
            element: <SignupForm />,
          },
          {
            path: "login",
            element: <LoginForm />,
          },
        ],
      },

      {
        path: "home",
        element: (
          <ProtectRoutes>
            <Home />
          </ProtectRoutes>
        ),
      },
      {
        path: "discussion-fourm",
        element: (
          <ProtectRoutes>
            <DiscussionForum />
          </ProtectRoutes>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectRoutes>
            <Stats />
          </ProtectRoutes>
        ),
      },
    ],
  },
]);

const App = () => {
  const { activeSession } = useContext(AuthContext);
  useEffect(() => {
    // const getIdOfLatestSession = async () => {
    //   try {
    //     const response = await axios.get(SESSIONSAPIURL);
    //     const sessionID = response.data[response.data.length - 1].id;
    //     console.log(sessionID);
    //     activeSession(sessionID);
    //   } catch (e) {
    //     console.log(e);
    //   }
    const checkSession = async () => {
      try {
        const response = await axios.get(SESSIONSAPIURL);
        const sessions = response.data;

        if (sessions.length === 0) {
          createNewSession();
        } else {
          const lastSession = sessions[sessions.length - 1];

          const currentDate = new Date().toISOString().split("T")[0];

          if (lastSession.date !== currentDate) {
            createNewSession();
          }
        }
      } catch (e) {
        alert(e.message);
      }
    };

    const createNewSession = async () => {
      const currentDate = new Date().toISOString().split("T")[0];
      const newSession = {
        date: currentDate,
        studentsAttended: 0,
        questionsAnswered: 0,
        tutorsJoind: [],
      };
      await axios.post(SESSIONSAPIURL, newSession);
    };

    checkSession();
    // getIdOfLatestSession();
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins",
          fontSize: "16px",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
