import React, { useState, useEffect } from 'react'
import LoginPass from '../components/auth/LoginPass';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript';

const Login = () => {
  const navigate = useNavigate()

  const { auth } = useSelector((state: RootStore)=>state)

  useEffect(() => {
    if(auth.access_token) navigate('/')
  },[auth.access_token, navigate])
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