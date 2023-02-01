import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IParams, FormSubmit } from '../../utils/TypeScript'
import { useDispatch } from 'react-redux'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { resetPassword } from '../../redux/actions/userAction'

const ResetPassword = () => {
  const { slug }: IParams = useParams()
  const token = String(slug)
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [cfPassword, setCfPassword] = useState('')
  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(resetPassword(password, cfPassword, token) as any)
  }
  return (
    <div className="forget_pass">
      <div>Reset Password</div>
      <form onSubmit={handleSubmit}>
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
              onChange={(e) => setPassword(e.target.value)}
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
              value={cfPassword}
              onChange={(e) => setCfPassword(e.target.value)}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ResetPassword
