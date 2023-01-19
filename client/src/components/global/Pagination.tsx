

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
    if (index === page) return "active";
    return "";
  };
  const handlePagination = (num: number) => {
      navigate(`?page=${num}`);
      callback(num);
  };
    
    useEffect(() => {
      setPage(Number(searchParams.get("page")));
    }, [searchParams]);

  return (
    <div>
      <div>Total page: {total}</div>
      <ul>
        {page > 1 && (
          <li>
              <span onClick={() => handlePagination(page - 1)}>left</span>
          </li>
        )}
        {newArr.map((num) => (
          <li
            key={num}
            className={`${isActive(num)}`}
            onClick={() => handlePagination(num)}
          >
            <span>{num}</span>
          </li>
        ))}
        {page < total && (
          <li>
              <span onClick={() => handlePagination(page + 1)}>right</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;