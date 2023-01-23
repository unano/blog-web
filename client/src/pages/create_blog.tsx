
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore, IBlog, IUser } from "../utils/TypeScript";
import { ValidCreateBlog, shallowRqual } from "../utils/Valid";
import { ImageUpload } from "../utils/ImageUpload";
import NotFound from "../components/global/NotFound";
import CardHoriz from "../components/cards/CardHoriz";
import CreateForm from "../components/cards/CreateForm";
import ReactQuill from "../components/editor/ReactQuill";
import { ALERT } from "../redux/types/alertType";
import { createBlog, updateBlog } from "../redux/actions/blogAction";
import { getAPI } from "../utils/FetchData";

interface IProps {
  id?: string;
}

const CreateBlog: React.FC<IProps> = ({ id }) => {
  const initState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };

  const [blog, setBlog] = useState<IBlog>(initState);
  const [body, setBody] = useState("");
  const [text, setText] = useState("");
  const divRef = useRef<HTMLDivElement>(null);
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const [oldData, setOldData] = useState<IBlog>(initState);

  useEffect(() => {
    if (!id) return;
    getAPI(`blog/${id}`)
      .then((res) => {
        console.log(res);
        setBlog(res.data);
        setBody(res.data.content);
        setOldData(res.data);
      })
      .catch((err) => console.log(err));

    return () => {
      setBlog(initState);
      setBody("");
      setOldData(initState);
    };
  }, [id]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const content = div?.innerText as string;
    setText(content);
  }, [body]);

  const handleSubmit = async () => {
    let url = "";
    if (!auth.access_token) return;
    const check = ValidCreateBlog({ ...blog, content: text });
    if (check.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });

    let newData = { ...blog, content: body };
    if (id) {
      const result = shallowRqual(newData, oldData);
      if ((blog.user as IUser)._id !== auth.user?._id)
        return dispatch({
          type: ALERT,
          payload: { errors: "Invalid Authentication" },
        });
      if (result)
        return dispatch({
          type: ALERT,
          payload: { errors: "The data does not change" },
        });
      dispatch(updateBlog(newData, auth.access_token) as any);
    } else dispatch(createBlog(newData, auth.access_token) as any);
  };

  if (!auth.access_token) return <NotFound />;

  return (
    <div className="create_blog">
      <div className="create_blog_up">
        <div className="create_blog_up_update">
          <h2>New Blog</h2>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        <div className="create_blog_up_right">
          <h5>Preview</h5>
          <CardHoriz blog={blog} />
        </div>
      </div>
      <div className="create_blog_down">
        <ReactQuill setBody={setBody} body={body} />
        <div
          ref={divRef}
          dangerouslySetInnerHTML={{
            __html: body,
          }}
          style={{ display: "none" }}
        />
        <div className="create_post">
          <small>{text.length}</small>
          <button onClick={handleSubmit}>
            {id ? "Update Post" : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;