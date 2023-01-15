import { IUser } from "../../utils/TypeScript";
import { ICategory } from "../../utils/TypeScript";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";

export interface ICreateCategory {
  type: typeof CREATE_CATEGORY;
  payload: ICategory;
}

export interface IGetCategory {
  type: typeof GET_CATEGORIES;
  payload: ICategory[];
}

export type ICategoryType =
    | ICreateCategory
    | IGetCategory;