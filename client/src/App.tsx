import React from 'react';
import { useAuth } from "./utils/hooks/useAuth";
import { BrowserRouter } from "react-router-dom";
import Router from "./utils/config/router";
import { AuthContext } from "./utils/context/AuthContext";

function App() {

    const {login, logout, token, userId} = useAuth();
    const isAuthenticated = !!token;

    return (
        <>
            <AuthContext.Provider
                value={{ login, logout, token, userId, isAuthenticated }}
            >
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </AuthContext.Provider>
        </>
    );
}

export default App;
