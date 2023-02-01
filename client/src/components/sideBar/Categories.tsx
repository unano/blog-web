import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootStore, ICategory } from '../../utils/TypeScript'

const Categories = () => {
  const { categories } = useSelector((state: RootStore) => state)
  const [expanded, setExpanded] = useState(false)
  const [filteredCateg, setFilteredCateg] = useState<ICategory[] | null>(null)

  const handleFilter = (e: any) => {
    setFilteredCateg(
      categories.filter((categ) => categ.name.includes(e.target.value))
    )
  }
  const expand = () => {
    if (!filteredCateg) setFilteredCateg(categories)
    setExpanded(!expanded)
  }
  return (
    <div className={`home_categories ${expanded ? 'expanded' : ''}`}>
      <h2>Categories</h2>
      <div
        className="open_close"
        onClick={expand}
        onKeyUp={expand}
        role="button"
        tabIndex={0}
      >
        {expanded ? <BsChevronLeft /> : <BsChevronRight />}
      </div>
      <div className="category_search">
        <div className="search_icon">
          <CiSearch />
        </div>
        <input
          type="text"
          className="category_filter"
          onChange={handleFilter}
        />
      </div>
      <ul className="home_categories_list">
        {filteredCateg &&
          filteredCateg.map((category) => (
            <li key={category._id} className="home_category">
              <Link to={`/blogs/${category.name}`}>{category.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Categories
