import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../components/global/NotFound";
import { FormSubmit, RootStore, ICategory } from "../utils/TypeScript";
import { createCategory, updateCategory, deleteCategory } from "../redux/actions/categoryAction";
import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";

const Category = () => {
  const [name, setName] = useState("")
  const [edit, setEdit] = useState<ICategory | null>(null)

  const { auth, categories } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if(edit) setName(edit.name)
  },[edit])

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (!auth.access_token || !name) return

    if (edit) {
      if (edit.name === name) return;
      const data = { ...edit, name }
      dispatch(updateCategory(data, auth.access_token) as any);
    } else {
      dispatch(createCategory(name, auth.access_token) as any);
    }
    setName("")
    setEdit(null)
  };

  const handeleDelete = (id:string) => {
    if (!auth.access_token) return;
    dispatch(deleteCategory(id, auth.access_token) as any);
  }

  if (auth.user?.role !== "admin") return <NotFound />;
  return (
    <div className="categories">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <div>
          {edit && (
            <div className="categ_close" onClick={() => setEdit(null)}>
              <MdClose />
            </div>
          )}
          <input
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">{edit ? "update" : "create"}</button>
        </div>
      </form>
      <div>
        {categories.map((category) => (
          <div key={category._id} className="category">
            <p>{category.name}</p>
            <div>
              {
                <div
                  className="category_edit"
                  onClick={() => setEdit(category)}
                >
                  <RiEditLine />
                </div>
              }
              <div
                className="category_delete"
                onClick={() => handeleDelete(category._id)}
              >
                <RiDeleteBin2Line />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
