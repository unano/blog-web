import { IUser } from "../../utils/TypeScript";
import { GET_OTHER_INFO, IGetBlogCategoryType } from "../types/profileType";

const otherInfoReducer = (
    state: IUser[] = [],
    action: IGetBlogCategoryType
): IUser[] => {
    switch (action.type) {
        case GET_OTHER_INFO:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default otherInfoReducer;