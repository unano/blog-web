

import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { postAPI, getAPI } from "../../utils/FetchData";
import { CREATE_CATEGORY, ICategoryType, GET_CATEGORIES } from "../types/categoryType";

export const createCategory =
  (name: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      });

      const res = await postAPI("category", { name }, token);
      dispatch({
        type: CREATE_CATEGORY,
        payload: res.data.newCategory,
      });

      dispatch({
        type: ALERT,
        payload: { loading: false },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getCategories =
  () => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      });

        console.log("fsdf")
      const res = await getAPI("category");
      console.log(res);
      dispatch({
          type: GET_CATEGORIES,
          payload: res.data.categories
      })

      dispatch({
        type: ALERT,
        payload: { loading: false },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
