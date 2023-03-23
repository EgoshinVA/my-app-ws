import React, { useState } from 'react';
import classes from './Paginator.module.css';

let Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let items = [];
  for (let i = 1; i <= pagesCount; i++) {
    items.push(i);
  }
  let portionCount = Math.ceil(pagesCount / props.portionSize);
  const [portionNumber, setPortionNumber] = useState(
    Math.floor(props.currentPage / props.portionSize) + 1
  );
  let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
  let rightPortionPageNumber = portionNumber * props.portionSize;
  return (
    <div className={classes.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}

      {items
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => (
          <span
            className={
              (props.currentPage === p && classes.selected_page) ||
              classes.pageNumber
            }
            onClick={(e) => {
              props.onPageChanged(p);
            }}
          >
            {p}
          </span>
        ))}

      {portionNumber < portionCount && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
