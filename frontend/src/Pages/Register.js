import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
import backgroundvideo from "./images/RegisterVid.mp4" ;

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    if (name && surname && email && password && confirmPassword) {
      if (password === confirmPassword) {
        console.log("Registration successful!");
        // Redirect to login page or dashboard
      } else {
        setError("Passwords do not match");
      }
    } else {
      setError("Please fill out all fields");
    }
  };

  return (
    <div className="register-container">
      <video className="video-background" autoPlay loop muted>
        <source src={backgroundvideo} type="video/mp4" />
      </video>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-header">Register</h1>
        {error && <div className="register-error">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          className="register-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          className="register-input"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="register-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="register-button">
          Register
        </button>
        <div className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;