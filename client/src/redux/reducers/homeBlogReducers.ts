
import {
  GET_HOME_BLOGS,
  IGetHomeBlogType,
  IHomeBlogs,
} from "../types/blogType";

const homeBlogsReducer = (
  state: IHomeBlogs[] = [],
  action: IGetHomeBlogType
): IHomeBlogs[] => {
  switch (action.type) {
    case GET_HOME_BLOGS:
      return action.payload;
    default:
      return state;
  }
};

export default homeBlogsReducer;
