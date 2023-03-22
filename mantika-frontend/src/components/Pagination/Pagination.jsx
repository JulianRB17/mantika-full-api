import React from 'react';
import _ from 'lodash';

export default function Pagination(props) {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li key={page} className="pagination__list">
              <button
                className={
                  page === currentPage
                    ? 'pagination__element pagination__active'
                    : 'pagination__element'
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
