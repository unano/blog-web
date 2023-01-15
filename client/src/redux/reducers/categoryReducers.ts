import * as type from "../types/categoryType";
import { ICategory } from "../../utils/TypeScript";

const authReducer = (state: ICategory[] = [], action: type.ICategoryType): ICategory[] => {
    switch (action.type) {
      case type.CREATE_CATEGORY:
        return [action.payload, ...state];
      case type.GET_CATEGORIES:
        return action.payload;
      default:
        return state;
    }
};

export default authReducer;
