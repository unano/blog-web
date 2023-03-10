import { IComment } from '../../utils/TypeScript'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const REPLY_COMMENT = 'REPLY_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPDATE_REPLY = 'UPDATE_REPLY'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_REPLY = 'DELETE_REPLY'
export const UPDATE_REPLY_THUMB = 'UPDATE_REPLY_THUMB'
export const UPDATE_COMMENT_THUMB = 'UPDATE_COMMENT_THUMB'

export interface ICommentState {
  data: IComment[]
  total: number
}
export interface ICreateCommentType {
  type: typeof CREATE_COMMENT
  payload: IComment
}

export interface IGetCommentType {
  type: typeof GET_COMMENTS
  payload: ICommentState
}

export interface IReplyCommentType {
  type: typeof REPLY_COMMENT
  payload: IComment
}

export interface IUpdateType {
  type: typeof UPDATE_COMMENT | typeof UPDATE_REPLY
  payload: IComment
}

export interface IDeleteType {
  type: typeof DELETE_COMMENT | typeof DELETE_REPLY
  payload: IComment
}

export interface IUpdateThumbType {
  type: typeof UPDATE_COMMENT_THUMB | typeof UPDATE_REPLY_THUMB
  payload: {
    data: IComment
    thumbed: boolean
  }
}

export type ICommentType =
  | ICreateCommentType
  | IGetCommentType
  | IReplyCommentType
  | IUpdateType
  | IDeleteType
  | IUpdateThumbType
