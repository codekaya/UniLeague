import React, { useState } from 'react';
import './MainPage.css';
import UniLogo from "./images/Logo/Unilig2.png";

function MainPage() {
  const [searchValue, setSearchValue] = useState('');
  const [userLoggedin, setUserLoggedin] = useState(false);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleLogout = () => {
    setTimeout(() => {
      setUserLoggedin(false);
    }, 25);
  };

  return (
    <div className="mainPage-container">
      <div className="mainPage-topbar">
        <img className="mainPage-logo" src={UniLogo} alt="UniLogo" />

        <div className="mainPage-button-container"></div>
        <a className="topbar-button" href='About' >About Us </a>
        <a className="topbar-button"href='Compare'>Compare</a>
        <a className="topbar-button"href='Rating'>Rating</a>
        <div className="dropdown-container">
          <div className="dropdown">
            <button className="dropdown-button">Menu</button>
            <div className="dropdown-content">
              {userLoggedin ? (
                <a className="login-btn" href="Profile">Profile</a>
              ) : (
                <a className="login-btn" href="login">Login</a>
              )}
              {userLoggedin ? (
                <a className="exit-btn" onClick={handleLogout}>Logout</a>
              ) : (
                <a className="exit-btn" href="signup">Register</a>
              )}
            </div>
          </div>
        </div>
      </div>
              <div class="search">
          <input type="text" placeholder="Search..." />
          <button type="submit" class="search-button"></button>
        </div>
    </div>
  );
}

export default MainPage;