

import { IBlog } from "../../utils/TypeScript";
import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import { ImageUpload } from "../../utils/ImageUpload";
import { getAPI, postAPI } from "../../utils/FetchData";

import {
  GET_HOME_BLOGS,
  IGetHomeBlogType,
  GET_BLOGS_CATEGORY_ID,
  IGetBlogCategoryType,
} from "../types/blogType";

export const createBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
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

      const res = await postAPI("blog", newBlog, token);
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
  (id: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogCategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(`blogs/${id}`);
      // dispatch({
      //   type: GET_HOME_BLOGS,
      //   payload: res.data,
      // });
      dispatch({ type: GET_BLOGS_CATEGORY_ID, payload: { ...res.data, id } });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };