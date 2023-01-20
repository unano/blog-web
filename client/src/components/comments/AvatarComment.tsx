import { compareSync } from 'bcrypt'
import React from 'react'
import { Link } from 'react-router-dom'
import { IUser } from '../../utils/TypeScript'
interface IProps {
    user: IUser
}

const AvatarComment: React.FC<IProps> = ({user}) => {
    return (
      <div className="blog_comment_avatar">
        <img src={user.avatar} alt="avatar" />
        <small>Reply</small>
      </div>
    );
}

export default AvatarComment