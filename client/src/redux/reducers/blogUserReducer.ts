import {
  IGetBlogUserType,
  IBlogsUser,
  GET_BLOGS_USER_ID,
} from "../types/blogType";

const blogsUserReducer = (
  state: IBlogsUser[] = [],
  action: IGetBlogUserType
): IBlogsUser[] => {
  switch (action.type) {
    case GET_BLOGS_USER_ID:
      /* 如果state里面没有请求的用户博客数据,则向服务器请求该类并存储至state */
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload];
      } else {
        /*  如果请求的是同一个用户,则触发以下刷新, 如果是翻页的话,
                则将存储的该用户的存储数据换成新请求的那一页的数据  */
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );
      }
    default:
      return state;
  }
};

export default blogsUserReducer;
