

import { IBlog } from "../../utils/TypeScript";

export const GET_HOME_BLOGS = "GET_HOME_BLOGS";
export const GET_BLOGS_CATEGORY_ID = "GET_BLOGS_CATEGORY_ID";
export const GET_BLOGS_USER_ID = "GET_BLOGS_USER_ID";
export const CREATE_BLOGS_USER_ID = "CREATE_BLOGS_USER_ID";
export const DELETE_BLOGS_USER_ID = "DELETE_BLOGS_USER_ID";
export const UPDATE_BLOGS_USER_ID = "UPDATE_BLOGS_USER_ID";
export const THUMB_BLOG_UP = "THUMB_BLOG_UP";
export const THUMB_BLOG_DOWN = "THUMB_BLOG_DOWN";

export interface IHomeBlogs {
  _id: string;
  name: string;
  count: number;
  blogs: IBlog[];
}

export interface IGetHomeBlogType {
  type: typeof GET_HOME_BLOGS;
  payload: IHomeBlogs[];
}

export interface IBlogsCategory {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}

export interface IGetBlogCategoryType {
  type: typeof GET_BLOGS_CATEGORY_ID;
  payload: IBlogsCategory;
}

export interface IBlogsUser {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}

export interface IGetBlogUserType {
  type: typeof GET_BLOGS_USER_ID;
  payload: IBlogsUser;
}

export interface ICreateBlogUserType {
  type: typeof CREATE_BLOGS_USER_ID;
  payload: IBlog;
}

export interface IDeleteBlogUserType {
  type: typeof DELETE_BLOGS_USER_ID;
  payload: IBlog;
}

export interface IUpdateBlogUserType {
  type: typeof UPDATE_BLOGS_USER_ID;
  payload: IBlog;
}

export interface IThumbBlogType {
  type: typeof THUMB_BLOG_UP | typeof THUMB_BLOG_DOWN;
  payload: string
}

export type IBlogUserType =
  | IGetBlogUserType
  | ICreateBlogUserType
  | IDeleteBlogUserType
  | IUpdateBlogUserType