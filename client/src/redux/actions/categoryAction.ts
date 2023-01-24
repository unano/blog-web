
import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import {
  CREATE_CATEGORY,
  ICategoryType,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from "../types/categoryType";
import { ICategory } from "../../utils/TypeScript";
import { checkTokenExp } from "../../utils/checkTokenExp";

export const createCategory =
  (name: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      });

      const res = await postAPI("category", { name }, access_token);
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

      const res = await getAPI("category");
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data.categories,
      });

      dispatch({
        type: ALERT,
        payload: { loading: false },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const updateCategory =
  (data: ICategory, token: string) =>
    async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      // dispatch({
      //   type: ALERT,
      //   payload: { loading: true },
      // });

      await patchAPI(
        `category/${data._id}`,
        { name: data.name },
        access_token
      );
      dispatch({
        type: UPDATE_CATEGORY,
        payload: data,
      });

      // dispatch({
      //   type: ALERT,
      //   payload: { loading: false },
      // });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const deleteCategory =
  (id: string, token: string) =>
    async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result: token
    try {
      dispatch({ type: DELETE_CATEGORY, payload: id });
      await deleteAPI(`category/${id}`, access_token);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
