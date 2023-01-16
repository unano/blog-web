import { IBlog } from "../../utils/TypeScript"
import { Dispatch } from "react"
import { ALERT, IAlertType } from "../types/alertType"
import { ImageUpload } from "../../utils/ImageUpload"
import { postAPI } from "../../utils/FetchData"

export const createBlog = (blog: IBlog, token: string) =>
    async (dispatch: Dispatch<IAlertType>) => {
        let url = ""
        try {
            dispatch({type:ALERT, payload:{loading: true}})
            if (typeof blog.thumbnail !== "string") {
              const photo = await ImageUpload(blog.thumbnail);
              url = photo.url;
            } else {
              url = blog.thumbnail;
            }
            const newBlog = { ...blog, thumbnail: url }

          const res = await postAPI('blog', newBlog, token)
            dispatch({
              type: ALERT,
              payload: { success: res.data.msg },
            });
        } catch (err:any) {
            dispatch({type: ALERT, payload:{errors: err.response.data.msg}})
    }
    
}