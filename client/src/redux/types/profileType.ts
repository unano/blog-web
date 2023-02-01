import { IUser } from '../../utils/TypeScript'

export const GET_OTHER_INFO = 'GET_OTHER_INFO'

export interface IGetBlogCategoryType {
  type: typeof GET_OTHER_INFO
  payload: IUser
}
