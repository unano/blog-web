import { useEffect } from 'react'
import LoginPass from '../components/auth/LoginPass';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript';

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { auth } = useSelector((state: RootStore)=>state)
      console.log(location);
  useEffect(() => {
    if (auth.access_token) {
      let url = location.search.replace('?','/')
       return navigate(url);
    }
  }, [auth.access_token, navigate])
  
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
          <Link to={`/register${location.search}`}>Register Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;