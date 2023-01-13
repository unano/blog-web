import React, { useState } from 'react'
import LoginPass from '../components/auth/LoginPass';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="auth_page  login">
      <div>Login</div>
      <LoginPass />
      <div className="login_jump">
        <small style={{ cursor: "pointer" }}>
          <Link to="/forget_password">Forget password</Link>
        </small>
        <p>
          <small>No account? </small>
          <Link to={`/register`}>Register Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;