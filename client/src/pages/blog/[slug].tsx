import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { IBlog, IParams } from '../../utils/TypeScript';
import { getAPI } from '../../utils/FetchData';
import Loading from '../../components/global/Loading';
import { showErrMsg } from '../../components/alert/Alert';
import DisplayBlog from '../../components/blog/DisplayBlog';

const DetailBlog = () => {
    const { slug }: IParams = useParams();
    let id = slug;
    const [blog, setBlog] = useState<IBlog>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (!id) return;
        setLoading(true)
        getAPI(`blog/${id}`)
            .then(res => {
                console.log(res)
                setBlog(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err.response.data);
                console.log(err);
                setError(err.response.data.msg)
                setLoading(false);
            })
        return  () => setBlog(undefined)  /* 没这个可能会报错: 
        cannot perform a React update on a momory unmounted coomponent */
    },[id])

    if (loading) return <Loading/>;
    return <div className='detail_blog'>
        {error && showErrMsg(error)}
        {blog && <DisplayBlog blog={blog} />}
    </div>;
}

export default DetailBlog