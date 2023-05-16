import React from  'react' ;
import './App.css'
import { Routes ,Route , Link, NavLink } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Redeem from "./Pages/RedeemCodePage";
import MainPage from './Pages/MainPage';

function App(){
    return(
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/SignUp" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/redeem" element={<Redeem />} />
        </Routes>
        
        );
}
export default App;

