import React from  'react' ;
import './App'
import { Routes ,Route , Link, NavLink } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App(){
    return(
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        </Routes>
        
        );
}
export default App;

