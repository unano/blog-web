import React, { useEffect, useRef, useCallback } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { useDispatch } from 'react-redux'
import { checkImage, imageUpload } from '../../utils/ImageUpload'
import { ALERT } from '../../redux/types/alertType'

interface IProps {
  setBody: (value: string) => void
  body: string
}

const Quill: React.FC<IProps> = ({ setBody, body }) => {
  const dispatch = useDispatch()
  const quillRef = useRef<ReactQuill>(null)
  const modules = { toolbar: { container } }
  //const [changed, setChanged] = useState(false)

  const handleChange = (e: any) => {
    setBody(e)
  }

  const handleChangeImage = useCallback(() => {
    //question
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.click()
    input.onchange = async () => {
      const files = input.files
      if (!files)
        return dispatch({
          type: ALERT,
          payload: { errors: 'File does not esxists' },
        })

      const file = files[0]
      const check = checkImage(file)
      if (check) return dispatch({ type: ALERT, payload: { errors: check } })

      dispatch({ type: ALERT, payload: { loading: true } })
      const photo = await imageUpload(file)
      const quill = quillRef.current
      const range = quill?.getEditor().getSelection()?.index
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
      }
      dispatch({ type: ALERT, payload: { loading: false } })
    }
  }, [dispatch]) //dispatch 不要写
  useEffect(() => {
    const quill = quillRef.current
    if (!quill) return
    //question
    const toolbar = quill.getEditor().getModule('toolbar')
    toolbar.addHandler('image', handleChangeImage)
  }, [handleChangeImage])

  // useEffect(() => {
  //   if (body && changed === false) setChanged(true)
  // }, [body])

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      placeholder="Write something..."
      onChange={handleChange}
      ref={quillRef}
      defaultValue={body}
      //key={body ? 'notLoadedYet' : 'loaded'}
      //value={body} //problem
    />
  )
}

const container = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean', 'link', 'image', 'video'], // remove formatting button
]
export default Quill
