import React, { useState } from 'react'
import LoginPass from '../components/auth/LoginPass';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='auth_page'>
      <div>Login Page</div>
      <LoginPass />
      <small style={{cursor: 'pointer'}}>
        <Link to='/forget_password'>
          Forget password
        </Link>
      </small>
      <p>
        No account?
        <Link to={`/register`} style={{ color: 'crimson' }}>
          Register Now
        </Link>
      </p>
    </div>
  );
}

export default Login;