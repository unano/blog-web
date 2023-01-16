import React, { useEffect, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useDispatch } from "react-redux";
import { checkImage, ImageUpload } from "../../utils/ImageUpload";
import { ALERT } from "../../redux/types/alertType";
import { Alert } from "../alert/Alert";
import { getLeadingCommentRanges } from "typescript";

interface IProps {
  setBody: (value: string) => void;
}

const Quill: React.FC<IProps> = ({ setBody }) => {
  const dispatch = useDispatch();
  const quillRef = useRef<ReactQuill>(null);
  const modules = { toolbar: { container } };

  const handleChange = (e: any) => {
    setBody(e);
  };

    const handleChangeImage = useCallback(() => {
      //question
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = async () => {
      const files = input.files;
      if (!files)
        return dispatch({
          type: ALERT,
          payload: { errors: "File does not esxists" },
        });

      const file = files[0];
      const check = checkImage(file);
      if (check) return dispatch({ type: ALERT, payload: { errors: check } });

      dispatch({ type: ALERT, payload: { laoding: true } });
      const photo = await ImageUpload(file);
      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
      }
      dispatch({ type: ALERT, payload: { laoding: false } });
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    //question
    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);
  return (
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write something..."
        onChange={handleChange}
        ref={quillRef}
      />
  );
};

let container = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean", "link", "image", "video"], // remove formatting button
];
export default Quill;
