
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputChange, FormSubmit } from "../../utils/TypeScript";
import { login } from "../../redux/actions/authAction";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
const LoginPass = () => {
  const initialState = { account: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialState);
    const { account, password } = userLogin;

    const [typePass, setTypePass] = useState(false);
    
    const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };
    
    const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(login(userLogin) as any)
  }
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
            {typePass ? <AiFillEye/>:<AiFillEyeInvisible/> }
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
