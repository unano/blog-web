import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOtherInfo } from "../../redux/actions/userAction";
import { RootStore, IUser } from "../../utils/TypeScript";
import Loading from "../global/Loading";
interface IProps {
  id: string;
}

const OtherInfo: React.FC<IProps> = ({ id }) => {
  const [other, setOther] = useState<IUser>();
  const { otherInfo } = useSelector((state: RootStore) => state);
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

  if (!other) return <Loading />;
  return (
    <div>
      <img src={other.avatar} alt="img" />
      <div>{other.role}</div>
      <div>{other.name}</div>
      <div>email : {other.account}</div>
      <div>Join Date: {new Date(other.createdAt).toDateString().slice(4)}</div>
    </div>
  );
};

export default OtherInfo;
