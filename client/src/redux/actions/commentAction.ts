


import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import {
  ICreateCommentType,
  GET_COMMENTS,
  IGetCommentType,
  IReplyCommentType,
  UPDATE_COMMENT,
  IUpdateType,
  UPDATE_REPLY,
  IDeleteType,
  IUpdateThumbType,
  UPDATE_COMMENT_THUMB,
  UPDATE_REPLY_THUMB
} from "../types/commentTypes";
import { IComment } from "../../utils/TypeScript";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import { checkTokenExp } from "../../utils/checkTokenExp";

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      //const res =
      await postAPI("comment", data, access_token);
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
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      //const res =
      await postAPI("reply_comment", data, access_token);
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
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({
        type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
        payload: data,
      });
      await patchAPI(
        `comment/${data._id}`,
        { data },
        access_token
      );
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({
        type: ALERT, payload: { loading: true }
      });

      await deleteAPI(
        `comment/${data._id}`,
        access_token
      );
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
    
export const handleCommentThumb =
  (data: IComment, user_id: string, thumbed: boolean, token: string) =>
  async (dispatch: Dispatch<IAlertType | IUpdateThumbType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({
        type: data.comment_root ? UPDATE_REPLY_THUMB : UPDATE_COMMENT_THUMB,
        payload: { data: data, thumbed: thumbed },
      });
      await postAPI(
        `comment/thumb/${data._id}`,
        { user_id: user_id, thumbed: thumbed },
        access_token
      );
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };