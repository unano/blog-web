
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../../components/global/NotFound";
import { RootStore, IBlog } from "../../utils/TypeScript";
import { getBlogsByCategoryId } from "../../redux/actions/blogAction";
import CardVert from "../../components/cards/CardVert";

const BlogsByCategory = () => {
  const { categories, blogsCategory } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [categoryId, setCategoryId] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>();
  // const [total, setTotal] = useState(0);

  useEffect(() => {
    const category = categories.find((item) => item.name === slug);
    if (category) setCategoryId(category._id);
  }, [slug, categories]);

  useEffect(() => {
    if (!categoryId) return;

    /* 点进一个新的标签后,执行if发送请求,之后会再次进入else中存储至redux和blogs,
    之后再次进入相同标签后就不会重新请求,因为已经存储于redux.点进其他标签时执行和
    上述一样的操作,redux中会存储新的标签数据 */
    if (blogsCategory.every(item => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId) as any);
    } else {
      const data = blogsCategory.find(item => item.id === categoryId)
      if (!data) return;
      setBlogs(data.blogs);
      // setTotal(data.total);

    }

  }, [categoryId, blogsCategory]);

  if (!blogs) return <NotFound />;
  return (
    <div className="blogs_catetgory">
      {/* <span className="catetgory_name">{slug}</span> */}
      <div className="card_verts">
        {blogs.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsByCategory;