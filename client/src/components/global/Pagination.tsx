import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface IProps {
  total: number
  callback: (num: number) => void
}

const Pagination: React.FC<IProps> = ({ total, callback }) => {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(1)
  //const newArr = [...Array(total)].map((_, i) => i + 1);
  const isActive = (index: number) => {
    if (index === page) return 'choosed'
    return ''
  }
  const handlePagination = (num: number) => {
    navigate(`?page=${num}`)
    callback(num)
  }

  useEffect(() => {
    const page = Number(searchParams.get('page'))
    setPage(page === 0 ? 1 : page)
  }, [searchParams])

  return (
    <div className="pagination">
      {/* <div>Total page: {total}</div> */}
      <ul>
        {page > 1 && (
          <li>
            <span
              onClick={() => handlePagination(page - 1)}
              onKeyUp={() => handlePagination(page - 1)}
              role="button"
              tabIndex={0}
            >
              &lt;
            </span>
          </li>
        )}
        {page !== 1 && (
          <li className={`${isActive(1)}`}>
            <span
              onClick={() => handlePagination(1)}
              onKeyUp={() => handlePagination(1)}
              role="button"
              tabIndex={0}
            >
              {1}
            </span>
          </li>
        )}
        {total >= 4 && page > 3 && (
          <li
          // className={`${isActive(page + 1)}`}
          // onClick={() => handlePagination(page + 1)}
          >
            <span>...</span>
          </li>
        )}
        {page > 2 && (
          <li className={`${isActive(page - 1)}`}>
            <span
              onClick={() => handlePagination(page - 1)}
              onKeyUp={() => handlePagination(page - 1)}
              role="button"
              tabIndex={0}
            >
              {page - 1}
            </span>
          </li>
        )}
        <li className={`${isActive(page)}`}>
          <span
            onClick={() => handlePagination(page)}
            onKeyUp={() => handlePagination(page)}
            role="button"
            tabIndex={0}
          >
            {page}
          </span>
        </li>
        {page < total - 1 && (
          <li className={`${isActive(page + 1)}`}>
            <span
              onClick={() => handlePagination(page + 1)}
              onKeyUp={() => handlePagination(page + 1)}
              role="button"
              tabIndex={0}
            >
              {page + 1}
            </span>
          </li>
        )}
        {total >= 4 && page < total - 2 && (
          <li
          // className={`${isActive(page + 1)}`}
          // onClick={() => handlePagination(page + 1)}
          >
            <span>...</span>
          </li>
        )}
        {page !== total && (
          <li className={`${isActive(total)}`}>
            <span
              onClick={() => handlePagination(total)}
              onKeyUp={() => handlePagination(total)}
              role="button"
              tabIndex={0}
            >
              {total}
            </span>
          </li>
        )}
        {/* {newArr.map((num) => (
          <li
            key={num}
            className={`${isActive(num)}`}
            onClick={() => handlePagination(num)}
          >
            <span>{num}</span>
          </li>
        ))} */}
        {page < total && (
          <li>
            <span
              onClick={() => handlePagination(page + 1)}
              onKeyUp={() => handlePagination(page + 1)}
              role="button"
              tabIndex={0}
            >
              &gt;
            </span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Pagination
