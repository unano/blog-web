


import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import {
  CREATE_COMMENT,
  ICreateCommentType,
  GET_COMMENTS,
  IGetCommentType,
  REPLY_COMMENT,
  IReplyCommentType,
  UPDATE_COMMENT,
  IUpdateType,
  UPDATE_REPLY,
  DELETE_COMMENT,
  DELETE_REPLY,
  IDeleteType
} from "../types/commentTypes";
import { IComment } from "../../utils/TypeScript";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {
      //const res =
      await postAPI("comment", data, token);
      // dispatch({
      //   type: CREATE_COMMENT,
      //   payload: { ...res.data, user: data.user },
      // });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getComments =
  (id: string, num: number) =>
  async (dispatch: Dispatch<IAlertType | IGetCommentType>) => {
    try {
      let limit = 8;
      const res = await getAPI(
        `comments/blog/${id}?page=${num}&limit=${limit}`
      );
      dispatch({
        type: GET_COMMENTS,
        payload: {
          data: res.data.allComments,
          total: res.data.total,
        },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const replyComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IReplyCommentType>) => {
    try {
      //const res =
      await postAPI("reply_comment", data, token);
      // dispatch({
      //   type: REPLY_COMMENT,
      //   payload: { ...res.data, user: data.user, reply_user: data.reply_user },
      // });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const updateComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IUpdateType>) => {
    try {
      dispatch({
        type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
        payload: data,
      });
      console.log(data);
      const res = await patchAPI(
        `comment/${data._id}`,
        { data },
        token
      );
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteType>) => {
    try {
      dispatch({
        type: ALERT, payload: { loading: true }
      });

      const res = await deleteAPI(
        `comment/${data._id}`,
        token
      );
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
    