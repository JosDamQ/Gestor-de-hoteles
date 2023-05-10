import React, { createContext, useEffect, useState } from "react";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export const AuthContext = createContext();

export const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <NotFoundPage></NotFoundPage>,
      children: [
        {
          path: "/",
          element: <HomePage></HomePage>,
            
        },
        {
          path: "login",
          element: <LoginPage></LoginPage>
        },
        {
          path: "register",
          element: <RegisterPage></RegisterPage>
        }
      ]
    },
  ]);

  return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
            <RouterProvider router={routes}></RouterProvider>
        </AuthContext.Provider>
    )
};
