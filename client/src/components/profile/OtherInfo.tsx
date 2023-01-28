


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOtherInfo } from "../../redux/actions/userAction";
import { RootStore, IUser } from "../../utils/TypeScript";
import Loading from "../global/Loading";
import { getAPI, patchAPI } from "../../utils/FetchData";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { ALERT } from "../../redux/types/alertType";

interface IProps {
  id: string;
}

const OtherInfo: React.FC<IProps> = ({ id }) => {
  const [other, setOther] = useState<IUser>();
  const { otherInfo, auth } = useSelector((state: RootStore) => state);
  const [isFollowing, setIsfollowing] = useState<boolean | null>(null);
  console.log(other);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;
    if (otherInfo.every((user) => user._id !== id)) {
      dispatch(getOtherInfo(id) as any);
    } else {
      const newUser = otherInfo.find((user) => user._id === id);
      if (newUser) setOther(newUser);
    }
  }, [id, otherInfo, dispatch]);

  const handleFollow = async () => {
    try {
      if (!auth.user || !auth.access_token || !other?._id) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      await patchAPI(`user/follow/${auth.user._id}`,{user_id: other?._id}, access_token);
      setIsfollowing(true);
    } catch (err: any) {
      dispatch({
        type: ALERT,
        payload: { errors: err.response.data.msg },
      });
    }
  };

  const handleUnfollow = async () => {
    try {
      if (!auth.user || !auth.access_token || !other?._id) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      await patchAPI(
        `user/unfollow/${auth.user._id}`,
        { user_id: other?._id },
        access_token
      );
      setIsfollowing(false);
    } catch (err: any) {
      dispatch({
        type: ALERT,
        payload: { errors: err.response.data.msg },
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      if (!auth.user || !auth.access_token || !other?._id) return;
      const result = await checkTokenExp(auth.access_token, dispatch);
      const access_token = result ? result : auth.access_token;
      const res = await getAPI(
        `user/followState?f_ing_id=${auth.user?._id}&f_ed_id=${other?._id}`,
        access_token
      );
      const is_following = res.data.isFollowing;
      setIsfollowing(is_following);
    };
    try {
      fetch();
    } catch (err: any) {
      console.log(err.response.data);
    }
  }, [auth.access_token, auth.user, dispatch, other?._id]);

  if (!other) return <Loading />;
  return (
    <>
      <div className="user_info other_info">
        <div className="avatar">
          <img src={other.avatar} alt="img" />
        </div>
        <div className="info">
          <div className="user_name_and_role">
            <div className="role">{other.role}</div>
            <div>{other.name}</div>
          </div>
          <div className="follow_info">
            <div>
              <b>{other.follower_num}</b> followers
            </div>
            <div>
              <b>{other.following_num}</b> following
            </div>
          </div>
          <div>
            <span>email</span> {other.account}
          </div>
          <div>
            <span>Join Date</span>{" "}
            {new Date(other.createdAt).toDateString().slice(4)}
          </div>
        </div>
      </div>
      {auth.user &&
        (isFollowing ? (
          <div className="unfollow" onClick={handleUnfollow}>
            Followed
          </div>
        ) : (
          <div className="follow" onClick={handleFollow}>
            Follow
          </div>
        ))}
    </>
  );
};

export default OtherInfo;
