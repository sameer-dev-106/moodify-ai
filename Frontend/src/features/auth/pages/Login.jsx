import React from "react";
import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";

const Login = () => {
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
