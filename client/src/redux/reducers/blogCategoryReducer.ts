import {
  IGetBlogCategoryType,
  IBlogsCategory,
  GET_BLOGS_CATEGORY_ID,
} from '../types/blogType'

const blogsCategoryReducer = (
  state: IBlogsCategory[] = [],
  action: IGetBlogCategoryType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_CATEGORY_ID:
      /* 如果state里面没有请求的类,则向服务器请求该类并存储至state */
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload]
      } else {
        /*  如果请求的是同一个类型的博客,则触发以下刷新, 如果是翻页的话,
                则将存储的相同类型的博客换成新请求的那一页的数据  */
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        )
      }
    default:
      return state
  }
}

export default blogsCategoryReducer
