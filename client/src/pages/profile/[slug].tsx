import React from "react";
import { useParams } from "react-router-dom";
import { IParams, RootStore } from "../../utils/TypeScript";
import { useSelector } from "react-redux";
import OtherInfo from "../../components/profile/OtherInfo";
import UserInfo from "../../components/profile/UserInfo";
import UserBlogs from "../../components/profile/userBlogs";

const Profile = () => {
  const { slug }: IParams = useParams();
  const { auth } = useSelector((state: RootStore) => state);

  return (
    <div className="user_profile">
        <div>{auth.user?._id === slug ? <UserInfo/> : <OtherInfo/>}</div>
      <div><UserBlogs/></div>
    </div>
  );
};

export default Profile;
