import React from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import './Pagination.css';

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {' '}
      {currentPage !== 1 && (
        <div className="pagination__number" onClick={() => paginate(1)}>
          First
        </div>
      )}
      {currentPage !== 1 && (
        <div
          className="pagination__number"
          onClick={() => paginate(currentPage - 1)}>
          <NavigateBeforeIcon />
        </div>
      )}
      {pageNumbers.map((number) => (
        <div
          className={
            currentPage === number
              ? 'pagination__numberActive'
              : 'pagination__number'
          }
          onClick={() => paginate(number)}
          key={number}>
          {number}
        </div>
      ))}
      {currentPage !== pageNumbers.length && (
        <div
          className="pagination__number"
          onClick={() => paginate(currentPage + 1)}>
          <NavigateNextIcon />
        </div>
      )}
      {currentPage !== pageNumbers.length && (
        <div className="pagination__number" onClick={() => paginate(2)}>
          Last
        </div>
      )}
    </div>
  );
}

export default Pagination;
