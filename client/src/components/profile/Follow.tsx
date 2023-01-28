import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { IUser, RootStore } from '../../utils/TypeScript';

interface IProps {
  follow: IUser[];
}
const Follow: React.FC<IProps> = ({ follow}) => {
  console.log(follow);

  return (
    <div className="follow_users">
      {follow.map((user) => (
        <div key={user._id} className="follow_user">
          <div className="img">
            <img src={user.avatar} alt="avatar" />
          </div>
          <div className="name">
            <Link to={`/profile/${user._id}?page=1`}>{user.name}</Link>
            <br />
            <small>{user.account}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Follow