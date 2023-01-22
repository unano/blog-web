

import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IProps {
    total: number
    callback: (num: number)=> void
}

const Pagination: React.FC<IProps> = ({ total, callback }) => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const newArr = [...Array(total)].map((_, i) => i + 1);
  const isActive = (index: number) => {
    if (index === page) return "choosed";
    return "";
  };
  const handlePagination = (num: number) => {
      navigate(`?page=${num}`);
      callback(num);
  };
    
  useEffect(() => {
    let page = Number(searchParams.get("page"));
      setPage(page === 0 ? 1: page);
    }, [searchParams]);

  return (
    <div className="pagination">
      {/* <div>Total page: {total}</div> */}
      <ul>
        {page > 1 && (
          <li>
            <span onClick={() => handlePagination(page - 1)}>&lt;</span>
          </li>
        )}
        {page !== 1 && <li className={`${isActive(1)}`} onClick={() => handlePagination(1)}>
          <span>{1}</span>
        </li>}
        {total > 4 && page > 3 && (
          <li
            className={`${isActive(page + 1)}`}
            // onClick={() => handlePagination(page + 1)}
          >
            <span>...</span>
          </li>
        )}
        {page > 2 && (
          <li
            className={`${isActive(page - 1)}`}
            onClick={() => handlePagination(page - 1)}
          >
            <span>{page - 1}</span>
          </li>
        )}
        <li
          className={`${isActive(page)}`}
          onClick={() => handlePagination(page)}
        >
          <span>{page}</span>
        </li>
        {page < total -1 && (
          <li
            className={`${isActive(page + 1)}`}
            onClick={() => handlePagination(page + 1)}
          >
            <span>{page + 1}</span>
          </li>
        )}
        {total > 4 && page < total - 2 && (
          <li
            className={`${isActive(page + 1)}`}
            // onClick={() => handlePagination(page + 1)}
          >
            <span>...</span>
          </li>
        )}
        {page !== total && <li
          className={`${isActive(total)}`}
          onClick={() => handlePagination(total)}
        >
          <span>{total}</span>
        </li>}
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
            <span onClick={() => handlePagination(page + 1)}>&gt;</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;