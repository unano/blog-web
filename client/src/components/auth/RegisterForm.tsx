import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { InputChange, FormSubmit } from '../../utils/TypeScript'
import { register } from '../../redux/actions/authAction'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
const RegisterForm = () => {
  const initialState = { name: '', account: '', password: '', cf_password: '' }
  const [userRegister, setUserRegister] = useState(initialState)
  const { name, account, password, cf_password } = userRegister

  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const dispatch = useDispatch()

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target
    setUserRegister({ ...userRegister, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(register(userRegister) as any)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="name">
        <label htmlFor="name" className="login_label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChangeInput}
          placeholder="Your name is up to 20 chars"
        ></input>
      </div>
      <div className="account">
        <label htmlFor="account" className="login_label">
          Email
        </label>
        <input
          type="text"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
          placeholder="Example@gmail.com"
        ></input>
      </div>
      <div className="password">
        <label htmlFor="password" className="login_label">
          Password
        </label>
        <div>
          <input
            type={typePass ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
            placeholder="password must be ate least 6 chars"
          ></input>
          <div
            className="eye"
            onClick={() => setTypePass(!typePass)}
            onKeyUp={() => setTypePass(!typePass)}
            role="button"
            tabIndex={0}
          >
            {typePass ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>
      </div>
      <div className="cf_password">
        <label htmlFor="cf_password" className="login_label">
          ConfirmP
        </label>
        <div>
          <input
            type={typeCfPass ? 'text' : 'password'}
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            placeholder="confirm password"
          ></input>
          <div
            className="eye"
            onClick={() => setTypeCfPass(!typeCfPass)}
            onKeyUp={() => setTypeCfPass(!typeCfPass)}
            role="button"
            tabIndex={0}
          >
            {typeCfPass ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>
      </div>
      <button type="submit">Regist</button>
    </form>
  )
}

export default RegisterForm
