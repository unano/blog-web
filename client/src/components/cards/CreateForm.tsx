
import React from "react";
import { useSelector } from "react-redux";
import { RootStore, IBlog, InputChange } from "../../utils/TypeScript";

interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

//question
const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const { categories } = useSelector((state: RootStore) => state);

  const handleChangeInput = (e: InputChange) => {
      const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };
    
    const handleChangeThumbnail = (e: InputChange) => {
        const target = e.target as HTMLInputElement
        const files = target.files
        if (files) {
            const file = files[0]
            setBlog({...blog, thumbnail: file})
        }
    };
  return (
    <form>
      <div className="form_group">
        <input
          type="text"
          name="title"
          value={blog.title}
          placeholder="title"
          onChange={handleChangeInput}
          maxLength={50}
        />
        <small>{blog.title.length}/50</small>
      </div>
      <div className="form_group">
        <label htmlFor="thumbnail">Upload File</label>
        <input
          type="file"
          accept="image/*"
          id="thumbnail"
          onChange={handleChangeThumbnail}
        />
      </div>
      <div className="form_group">
        <textarea
          value={blog.description}
          name="description"
          placeholder="description"
          onChange={handleChangeInput}
          maxLength={200}
        />
        <small> {blog.description.length}/200</small>
      </div>
      <div className="form_group">
        <select
          value={blog.category}
          name="category"
          onChange={handleChangeInput}
        >
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CreateForm;
