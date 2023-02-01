import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { forgetPassword } from '../redux/actions/authAction'
import { FormSubmit } from '../utils/TypeScript'

const Forgetpassword = () => {
  const [account, setAccount] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(forgetPassword(account) as any)
  }

  return (
    <div className="forget-password">
      <div className="head">Forget password</div>
      <div className="inputs">
        <form onSubmit={handleSubmit}>
          <label htmlFor="account">Email</label>
          <div>
            <input
              type="text"
              className=""
              onChange={(e) => setAccount(e.target.value)}
            />
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Forgetpassword
