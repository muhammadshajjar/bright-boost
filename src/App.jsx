import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./RootLayout";

import Authentication from "./pages/Authentication";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import DiscussionForum from "./pages/DiscussionForum";

import { ConfigProvider } from "antd";
import ProtectRoutes from "./ProtectRoutes";

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
            <p>Stats</p>
          </ProtectRoutes>
        ),
      },
    ],
  },
]);

const App = () => {
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
