
import { IGetBlogCategoryType, IBlogsCategory,GET_BLOGS_CATEGORY_ID  } from "../types/blogType";

const blogsCategoryReducer =
    (state: IBlogsCategory[] = [],
        action: IGetBlogCategoryType):IBlogsCategory[] =>
    {
        switch (action.type) {
            case GET_BLOGS_CATEGORY_ID:
                return [...state, action.payload]
            default:
                return state;
    }
        
  };

export default blogsCategoryReducer;
