import { Dispatch } from "react";
import { AUTH, IAuth, IAuthType} from "../types/authType";
import { IAlertType, ALERT } from "../types/alertType";
import { checkImage } from "../../utils/ImageUpload";
import { ImageUpload } from "../../utils/ImageUpload";
import { patchAPI } from "../../utils/FetchData";

export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;

    let url = "";
      try {
          dispatch({ type: ALERT, payload: { loading: true } });
          if (avatar) {
              const check = checkImage(avatar)
              if (check) {
                  return dispatch({type: ALERT, payload:{errors: check}})
              }

              // it should verify token first? 
              const photo = await ImageUpload(avatar)
              url = photo.url

              const res = await patchAPI('user', {
                  avatar: url ? url : auth.user.avatar,
                  name: name? name: auth.user.name
              }, auth.access_token)

              dispatch({
                  type: AUTH, payload: {
                      access_token: auth.access_token,
                      user: {
                          ...auth.user,
                          avatar: url ? url : auth.user.avatar,
                          name: name ? name : auth.user.name
                      }
                  }
              })

              dispatch({ type: ALERT, payload: { success: res.data.msg } });
          }
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };