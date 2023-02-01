import RegisterForm from '../components/auth/RegisterForm'
import { Link, useLocation } from 'react-router-dom'
const Register = () => {
  const location = useLocation()
  return (
    <div className="auth_page  login">
      <div>Register</div>
      <RegisterForm />
      <div className="login_jump">
        <small style={{ cursor: 'pointer' }}>
          <Link to="/forget_password">Forget password</Link>
        </small>
        <p>
          <small>Already have an account? </small>
          <br />
          <Link to={`/login${location.search}`}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
