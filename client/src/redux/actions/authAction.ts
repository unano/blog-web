import { AUTH, IAuthType } from '../types/authType'
import { ALERT, IAlertType } from '../types/alertType'
import { IUserLogin, IUserRegister } from '../../utils/TypeScript'
import { postAPI, getAPI } from '../../utils/FetchData'
import { Dispatch } from 'redux'
import { validRegister } from '../../utils/Valid'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await postAPI('login', userLogin)
      dispatch({
        type: AUTH,
        payload: res.data,
      })

      dispatch({
        type: ALERT,
        payload: { success: 'Login Success' },
      })
      localStorage.setItem('logged', 'true')
    } catch (err: any) {
      dispatch({
        type: ALERT,
        payload: { errors: err.response.data.msg },
      })
    }
  }

export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister)
    if (check.errLength > 0) {
      return dispatch({
        type: ALERT,
        payload: { errors: check.errMsg },
      })
    }
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const res = await postAPI('register', userRegister)
      dispatch({
        type: ALERT,
        payload: { success: res.data.msg },
      })
    } catch (err: any) {
      dispatch({
        type: ALERT,
        payload: { errors: err.response.data.msg },
      })
    }
  }

export const refreshToken =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem('logged')
    if (logged !== 'true') return

    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const res = await getAPI('refresh_token')
      dispatch({
        type: AUTH,
        payload: res.data,
      })
      dispatch({
        type: ALERT,
        payload: { success: res.data.msg },
      })
    } catch (err: any) {
      dispatch({
        type: ALERT,
        payload: { errors: err.response.data.msg },
      })
    }
  }

export const logout =
  (token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token
    try {
      localStorage.removeItem('logged')
      dispatch({ type: AUTH, payload: {} })
      await getAPI('/logout', access_token)
      window.location.href = '/' //this will reset redux data
    } catch (err: any) {
      dispatch({
        type: ALERT,
        payload: { errors: err.response.data.msg },
      })
    }
  }

export const forgetPassword =
  (account: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await postAPI('forget_password', { account })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
      dispatch({
        type: ALERT,
        payload: { errors: err.response.data.msg },
      })
    }
  }
