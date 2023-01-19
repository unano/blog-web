import { Dispatch } from "react";
import { AUTH, IAuth, IAuthType } from "../types/authType";
import { IAlertType, ALERT } from "../types/alertType";
import { checkImage } from "../../utils/ImageUpload";
import { ImageUpload } from "../../utils/ImageUpload";
import { patchAPI, getAPI } from "../../utils/FetchData";
import { checkPassword } from "../../utils/Valid";
import { GET_OTHER_INFO, IGetBlogCategoryType } from "../types/profileType";
  
export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;

    let url = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (avatar) {
        const check = checkImage(avatar);
        if (check) {
          return dispatch({ type: ALERT, payload: { errors: check } });
        }

        // it should verify token first?
        const photo = await ImageUpload(avatar);
        url = photo.url;

        const res = await patchAPI(
          "user",
          {
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name,
          },
          auth.access_token
        );

        dispatch({
          type: AUTH,
          payload: {
            access_token: auth.access_token,
            user: {
              ...auth.user,
              avatar: url ? url : auth.user.avatar,
              name: name ? name : auth.user.name,
            },
          },
        });

        dispatch({ type: ALERT, payload: { success: res.data.msg } });
      }
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const resetPassword =
  (password: string, cf_password: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    const msg = checkPassword(password, cf_password);
    if (msg) return dispatch({ type: ALERT, payload: { errors: msg } });

    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await patchAPI("reset_password", { password }, token);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getOtherInfo =
  (id: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogCategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await getAPI(`user/${id}`);
      dispatch({
        type: GET_OTHER_INFO,
        payload: res.data
      })
      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (err: any) {
    }
  };
