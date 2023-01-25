

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../utils/TypeScript"; 
import { InputChange, FormSubmit } from "../../utils/TypeScript";
import { login } from "../../redux/actions/authAction";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LoginPass = () => {
  const initialState = { account: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialState);
  const { account, password } = userLogin;

  const [typePass, setTypePass] = useState(false);
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    await dispatch(login(userLogin) as any);
  };

  useEffect(() => {
    if (auth.access_token) {
      navigate(`/`);
    } 
  }, [auth.access_token, navigate])
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="email">
        <label htmlFor="account" className="login_label">
          Email
        </label>
        <input
          type="text"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
        ></input>
      </div>
      <div className="password">
        <label htmlFor="password" className="login_label">
          Password
        </label>
        <div>
          <input
            type={typePass ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          ></input>
          <div className="eye" onClick={() => setTypePass(!typePass)}>
            {typePass ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>
      </div>
      <button type="submit" disabled={account && password ? false : true}>
        Login
      </button>
    </form>
  );
};

export default LoginPass;
