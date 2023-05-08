import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
import bgvideo from "./images/myvideo.mp4" ;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    if (email === "example@example.com" && password === "password") {
      // Successful login, redirect to dashboard or home page
      console.log("Login successful!");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
       <video className="video-background" autoPlay loop muted>
        <source src={bgvideo} type="video/mp4" />
      </video>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-header">Login</h1>
        {error && <div className="login-error">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        <div className="login-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </form>
    </div>
  );
};
export default Login;
