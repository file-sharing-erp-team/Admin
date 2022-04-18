import React, {FC} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {Layout} from "antd";
import Navbar from "./components/Navbar";
import './App.css'


const App:FC = () => {
  return (
    <div>
        <BrowserRouter>
            <Layout>
                <Navbar/>
                <Layout.Content>
                    <AppRouter/>
                </Layout.Content>
            </Layout>
        </BrowserRouter>
    </div>
  );
}

export default App;
