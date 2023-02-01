import { useState, useEffect } from 'react'
import { getAPI } from '../../utils/FetchData'
import { IBlog } from '../../utils/TypeScript'
import { useLocation } from 'react-router-dom'
import SearchCard from '../cards/SearchCard'

const Search = () => {
  const [search, setSearch] = useState('')
  const [blogs, setBlogs] = useState<IBlog[]>()

  const { pathname } = useLocation()

  useEffect(() => {
    const delayBounce = setTimeout(async () => {
      if (search.length < 2) return setBlogs([])
      try {
        const res = await getAPI(`search/blogs?title=${search}`)
        setBlogs(res.data)
      } catch (err) {
        console.log(err)
      }
    }, 400)

    return () => clearTimeout(delayBounce)

    //getAPI(`search/blogs?title=${search}`)
    //.then(res => console.log(res))
  }, [search])

  useEffect(() => {
    setSearch('')
    setBlogs([])
  }, [pathname])

  return (
    <div className="inputs">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter your search..."
      />
      {search.length >= 2 && (
        <div className="search_result">
          {blogs?.length ? (
            blogs.map((blog) => <SearchCard key={blog._id} blog={blog} />)
          ) : (
            <p>No Blogs</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
