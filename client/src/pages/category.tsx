import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../components/global/NotFound";
import { FormSubmit, RootStore } from "../utils/TypeScript";
import { createCategory } from "../redux/actions/categoryAction";
import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";

const Category = () => {
  const [name, setName] = useState("");

  const { auth, categories } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!auth.access_token || !name) return;

    dispatch(createCategory(name, auth.access_token) as any);
    setName("");
  };
  if (auth.user?.role !== "admin") return <NotFound />;
  return (
    <div className="categories">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <div>
          <input
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Create</button>
        </div>
      </form>
      <div>
        {categories.map((category) => (
          <div key={category._id} className='category'>
            <p>{category.name}</p>
            <div>
              <p>
                <RiDeleteBin2Line />
              </p>
              <p><RiEditLine/></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
