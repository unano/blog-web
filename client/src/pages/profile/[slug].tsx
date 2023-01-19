import React from "react";
import { useParams } from "react-router-dom";
import { IParams, RootStore } from "../../utils/TypeScript";
import { useSelector } from "react-redux";
import OtherInfo from "../../components/profile/OtherInfo";
import UserInfo from "../../components/profile/UserInfo";
import UserBlogs from "../../components/profile/UserBlogs";

const Profile = () => {
  const { slug }: IParams = useParams();
  const { auth } = useSelector((state: RootStore) => state);

  return (
    <div className="user_profile">
      <div>
        {auth.user?._id === slug ? (
          <UserInfo />
        ) : (
          slug && <OtherInfo id={slug} />
        )}
      </div>
      <div className="user_blogs">
        <h3>Blogs</h3>
        <UserBlogs />
      </div>
    </div>
  );
};

export default Profile;
