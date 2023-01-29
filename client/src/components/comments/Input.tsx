import React , { useState, useRef, useEffect} from 'react'
import { IComment } from '../../utils/TypeScript'
import LiteQuill from "../editor/LiteQuill"

interface IProps{
  callback: (body: string) => void
  edit?: IComment
  setEdit?:(edit?: IComment) => void
}
const Input:React.FC<IProps> = ({callback, edit, setEdit}) => {
    const [body, setBody] = useState('');
    const divRef = useRef<HTMLDivElement>(null);
    const handleSubmit = () => {
        const div = divRef.current;
        const text = (div?.innerText as string)
      if (!text.trim()) {
        if (setEdit) return setEdit(undefined);
        return;
      }

        callback(body)
        setBody('')
    }
  
  useEffect(() => {
    if(edit) setBody(edit.content)
  },[edit])

    return (
      <div className='make_comment'>
        <LiteQuill body={body} setBody={setBody} />
        <div
          ref={divRef}
          dangerouslySetInnerHTML={{
            __html: body,
          }}
          style={{ display: "none" }}
        ></div>
        <button onClick={handleSubmit}>{edit ? "Update" : "Send"}</button>
      </div>
    );
}

export default Input