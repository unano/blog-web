import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IProps {
  body: string;
  setBody: (value: string) => void;
}

const LiteQuill: React.FC<IProps> = ({ body, setBody }) => {
  const modules = { toolbar: { container } };

  const handleChange = (e: any) => {
    setBody(e);
  };

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      placeholder="Write something..."
      onChange={handleChange}
      value={body}
    />
  );
};

let container = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
];
export default LiteQuill;
