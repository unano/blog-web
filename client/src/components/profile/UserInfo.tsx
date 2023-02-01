import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  InputChange,
  RootStore,
  IUserInfo,
  FormSubmit,
  IUser,
} from '../../utils/TypeScript'
import NotFound from '../global/NotFound'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { GrUpdate } from 'react-icons/gr'
import { updateUser, resetPassword } from '../../redux/actions/userAction'

interface IProps {
  setFollow: (follow: IUser[]) => void
  setFollowing: (following: boolean) => void
}

const UserInfo: React.FC<IProps> = ({ setFollow, setFollowing }) => {
  const { auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const initState = {
    name: '',
    account: '',
    avatar: '',
    password: '',
    cf_password: '',
  }

  const [user, setUser] = useState<IUserInfo>(initState)
  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const { name, avatar, password, cf_password } = user

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      const file = files[0]
      setUser({ ...user, avatar: file })
    }
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (avatar || name) dispatch(updateUser(avatar as File, name, auth) as any)
    if (password && auth.access_token)
      dispatch(resetPassword(password, cf_password, auth.access_token) as any)
  }
  const handleFollowers = () => {
    setFollow(auth.user?.followers || [])
    setFollowing(false)
  }

  const handleFollowings = () => {
    setFollow(auth.user?.followings || [])
    setFollowing(true)
  }

  if (!auth.user) return <NotFound />
  return (
    <form className="user_info" onSubmit={handleSubmit}>
      <div className="avatar">
        <img
          src={avatar ? URL.createObjectURL(avatar as Blob) : auth.user?.avatar}
          alt="avatar"
        ></img>
        <span>
          <label htmlFor="file_up">
            <GrUpdate />
          </label>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file_up"
            onChange={handleChangeFile}
          />
        </span>
      </div>
      <div className="info_exc_avatar">
        <div className="follow_info">
          <div
            onClick={handleFollowers}
            onKeyUp={handleFollowers}
            role="button"
            tabIndex={0}
          >
            <b>{auth.user.follower_num}</b> followers
          </div>
          <div
            onClick={handleFollowings}
            onKeyUp={handleFollowers}
            role="button"
            tabIndex={0}
          >
            <b>{auth.user.following_num}</b> following
          </div>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name_userPage"
            name="name"
            defaultValue={auth.user.name}
            onChange={handleChangeInput}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="account">Account</label>
          <input
            type="text"
            id="account_userPage"
            name="account"
            defaultValue={auth.user?.account}
            onChange={handleChangeInput}
            disabled={true}
          />
        </div>
        <div className="psw">
          <label htmlFor="password">Password</label>
          <div className="pass">
            <input
              type={typePass ? 'text' : 'password'}
              id="password_userPage"
              name="password"
              value={password}
              onChange={handleChangeInput}
            />
            <small
              onClick={() => setTypePass(!typePass)}
              onKeyUp={() => setTypeCfPass(!typePass)}
              role="button"
              tabIndex={0}
            >
              {typePass ? <AiFillEye /> : <AiFillEyeInvisible />}
            </small>
          </div>
        </div>
        <div className="psw">
          <label id="cf_password" htmlFor="cf_password">
            Confirm Password
          </label>
          <div className="pass">
            <input
              type={typeCfPass ? 'text' : 'password'}
              id="cf_password_userPage"
              name="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
            />
            <small
              onClick={() => setTypeCfPass(!typeCfPass)}
              onKeyUp={() => setTypeCfPass(!typeCfPass)}
              role="button"
              tabIndex={0}
            >
              {typeCfPass ? <AiFillEye /> : <AiFillEyeInvisible />}
            </small>
          </div>
        </div>
        <button type="submit">Update</button>
      </div>
    </form>
  )
}

export default UserInfo
