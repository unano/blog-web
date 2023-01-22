import React from 'react'
import { IUser } from '../../utils/TypeScript'

interface IProps{
    user: IUser
}
const AvatarReply: React.FC<IProps> = ({ user }) => {
  return (
    <div className='reply_comment'>
      <img
        src={user.avatar}
        alt="avatar"
      ></img>
    </div>
  );
}

export default AvatarReply