import React, { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth_page  login">
      <div>Register</div>
      <RegisterForm />
      <div className="login_jump">
        <small style={{ cursor: "pointer" }}>
          <Link to="/forget_password">Forget password</Link>
        </small>
        <p>
          <small>Already have an account? </small>
          <Link to={`/login`}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
