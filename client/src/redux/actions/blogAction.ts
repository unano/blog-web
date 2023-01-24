import { IBlog } from "../../utils/TypeScript";
import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import { ImageUpload } from "../../utils/ImageUpload";
import { getAPI, postAPI, putAPI, deleteAPI } from "../../utils/FetchData";
import {
  GET_HOME_BLOGS,
  IGetHomeBlogType,
  GET_BLOGS_CATEGORY_ID,
  IGetBlogCategoryType,
  GET_BLOGS_USER_ID,
  IGetBlogUserType,
  CREATE_BLOGS_USER_ID,
  ICreateBlogUserType,
  DELETE_BLOGS_USER_ID,
  IDeleteBlogUserType,
  UPDATE_BLOGS_USER_ID,
  IUpdateBlogUserType
} from "../types/blogType";
import { checkTokenExp } from "../../utils/checkTokenExp";

export const createBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType | ICreateBlogUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    let url = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (typeof blog.thumbnail !== "string") {
        const photo = await ImageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }
      const newBlog = { ...blog, thumbnail: url };

      const res = await postAPI("blog", newBlog, access_token);
      dispatch({
        type: CREATE_BLOGS_USER_ID,
        payload:res.data.blog
      })
      dispatch({
        type: ALERT,
        payload: { success: res.data.msg },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getHomeBlogs =
  () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogType>) => {
    let url = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("home/blogs");
      dispatch({
        type: GET_HOME_BLOGS,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getBlogsByCategoryId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogCategoryType>) => {
    try {
      let limit = 9;
      search = search ? search : "?page=1";
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(`blogs/category/${id}${search}&limit=${limit}`);

      dispatch({
        type: GET_BLOGS_CATEGORY_ID,
        payload: { ...res.data, id, search },
      });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getBlogsByUserId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogUserType>) => {
    try {
      let limit = 8;
      search = search ? search : "?page=1";
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(`blogs/user/${id}${search}&limit=${limit}`);

      dispatch({
        type: GET_BLOGS_USER_ID,
        payload: { ...res.data, id, search },
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const updateBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | IUpdateBlogUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    let url = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (typeof blog.thumbnail !== "string") {
        const photo = await ImageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }
      const newBlog = { ...blog, thumbnail: url };

      const res = await putAPI(`blog/${newBlog._id}`, newBlog, access_token);
      console.log(res.data)
      dispatch({
        type: UPDATE_BLOGS_USER_ID,
        payload: res.data.blog,
      });
      dispatch({
        type: ALERT,
        payload: { success: res.data.msg },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

  export const deleteBlog =
    (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType | IDeleteBlogUserType>) => {
      const result = await checkTokenExp(token, dispatch);
      const access_token = result ? result : token;
      try {
        dispatch({ type: ALERT, payload: { loading: true } });

        dispatch({
          type: DELETE_BLOGS_USER_ID,
          payload: blog
        })

        await deleteAPI(`blog/${blog._id}`, access_token);

        // dispatch({
        //   type: ALERT,
        //   payload: { success: res.data.msg },
        // });
        dispatch({ type: ALERT, payload: { loading: false } });

      } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
      }
    };