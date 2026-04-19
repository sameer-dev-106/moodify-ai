import React from "react";
import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";

const Register = () => {
  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <FormGroup
            type="text"
            label="Username"
            placeholder="Enter your username"
          />
          <FormGroup
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <FormGroup
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
