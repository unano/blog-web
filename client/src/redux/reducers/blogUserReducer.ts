import { IUser } from "../../utils/TypeScript";
import {
  IBlogsUser,
  GET_BLOGS_USER_ID,
  IBlogUserType,
  CREATE_BLOGS_USER_ID,
  DELETE_BLOGS_USER_ID,
  UPDATE_BLOGS_USER_ID
} from "../types/blogType";

const blogsUserReducer = (
  state: IBlogsUser[] = [],
  action: IBlogUserType
): IBlogsUser[] => {
  switch (action.type) {
    case GET_BLOGS_USER_ID:
      /* 如果state里面没有请求的用户博客数据,则向服务器请求该类并存储至state */
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload];
      } else {
        /*  如果请求的是同一个用户,则触发以下刷新, 如果是翻页的话,
                则将存储的该用户的存储数据换成新请求的那一页的数据  */
        return state.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      }
    case CREATE_BLOGS_USER_ID:
      /*   发布新的博客后,以下代码会更新本地redux store里面的数据(没有这个的话.创建完成后看不到刚创建的blog)   */
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? {
              ...item,
              blogs: [action.payload, ...item.blogs],
            }
          : item
      );
    case DELETE_BLOGS_USER_ID:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? {
              ...item,
            blogs: item.blogs.filter(blog => (
                blog._id !== action.payload._id
              ))
            }
          : item
      );
    
    case UPDATE_BLOGS_USER_ID:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? {
              ...item,
              blogs: item.blogs.map((blog) =>
                blog._id === action.payload._id ? action.payload : blog
              ),
            }
          : item
      );
    default:
      return state;
  }
};

export default blogsUserReducer;
