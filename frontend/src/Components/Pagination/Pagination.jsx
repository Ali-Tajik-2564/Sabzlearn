import React, { useEffect, useState } from "react";
import "./Pagination.css";
import { useParams, Link } from "react-router-dom";

export default function Pagination({
  pathname,
  items,
  itemCount,
  setShownCourses,
}) {
  const [pageCount, setPageCount] = useState(null);
  const { page } = useParams();

  useEffect(() => {
    let endIndex = itemCount * page;
    let startIndex = endIndex - itemCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    setShownCourses(paginatedItems);

    let pageNumber = Math.ceil(items.length / itemCount);
    setPageCount(pageNumber);
  }, [page, items]);
  return (
    <div class='courses-pagination'>
      <ul class='courses__pagination-list'>
        {Number(page) !== 1 && (
          <li class='courses__pagination-item'>
            <Link
              to={`${pathname}/${Number(page) - 1}`}
              class='courses__pagination-link'>
              <i class='fas fa-long-arrow-alt-right courses__pagination-icon'></i>
            </Link>
          </li>
        )}

        {Array(pageCount)
          .fill(0)
          .map((item, index) => (
            <li className='courses__pagination-item'>
              {index + 1 === Number(page) ? (
                <Link
                  to={`${pathname}/${index + 1}`}
                  class='courses__pagination-link courses__pagination-link--active'>
                  {index + 1}
                </Link>
              ) : (
                <Link
                  to={`${pathname}/${index + 1}`}
                  class='courses__pagination-link'>
                  {index + 1}
                </Link>
              )}
            </li>
          ))}

        {Number(page) !== pageCount && (
          <li class='courses__pagination-item'>
            <Link
              to={`${pathname}/${Number(page) + 1}`}
              class='courses__pagination-link'>
              <i class='fas fa-long-arrow-alt-left courses__pagination-icon'></i>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
