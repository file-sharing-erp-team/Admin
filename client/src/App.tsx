import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./config/router";
import { useAuth } from "./utils/hooks/useAuth";
import { AuthContext } from "./utils/context/AuthContext";
import { useTypeSelector } from "./utils/hooks/useTypeSelector";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const loader = useTypeSelector((state) => state.loader);

  return (
    <div className="w-screen h-screen App ">
      <AuthContext.Provider
        value={{ login, logout, token, userId, isAuthenticated }}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"colored"}
      />
    </div>
  );
}

export default App;
