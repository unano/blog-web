
import {
  CREATE_COMMENT,
  ICommentType,
  ICommentState,
  GET_COMMENTS,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLY,
  DELETE_COMMENT,
  DELETE_REPLY,
  UPDATE_COMMENT_THUMB,
  UPDATE_REPLY_THUMB,
} from "../types/commentTypes";

const initialState = {
  data: [],
  total: 1,
};

const commentReducer = (
  state: ICommentState = initialState,
  action: ICommentType
): ICommentState => {
  switch (action.type) {
    case CREATE_COMMENT:
      return { ...state, data: [action.payload, ...state.data] };
    case GET_COMMENTS:
      return action.payload;
    case REPLY_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                replyCM: [action.payload, ...(item.replyCM as [])],
              }
            : item
        ),
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case UPDATE_REPLY:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                replyCM: item.replyCM?.map((reply) =>
                  reply._id === action.payload._id ? action.payload : reply
                ),
              }
            : item
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.payload._id),
      };
    case DELETE_REPLY:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                replyCM: item.replyCM?.filter(
                  (reply) => reply._id !== action.payload._id
                ),
              }
            : item
        ),
      };
    case UPDATE_COMMENT_THUMB:
      let comment_thumb_count = action.payload.thumbed ? -1 : 1;
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.data._id
            ? { ...item, thumbs_count: item.thumbs_count + comment_thumb_count }
            : item
        ),
      };
    case UPDATE_REPLY_THUMB:
      let reply_thumb_count = action.payload.thumbed ? -1 : 1;
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.data.comment_root
            ? {
                ...item,
                replyCM: item.replyCM?.map((reply) =>
                  reply._id === action.payload.data._id
                    ? {
                        ...item,
                        thumbs_count: item.thumbs_count + reply_thumb_count,
                      }
                    : reply
                ),
              }
            : item
        ),
      };
    default:
      return state;
  }
};

export default commentReducer;