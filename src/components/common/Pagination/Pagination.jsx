import classes from './Pagination.module.scss';

export const Pagination = ({ currentPage, pages, onPageChanged, portionSize }) => {
  // Вычисляем текущую порцию
  const portionNumber = Math.ceil(currentPage / portionSize);
  const startIndex = (portionNumber - 1) * portionSize;
  const paginatedPages = pages.slice(startIndex, startIndex + portionSize);

  return (
    <div className={classes.pagination}>
      {/* Кнопка назад */}
      {startIndex > 0 && (
        <button onClick={() => onPageChanged(startIndex)}>{'<'}</button>
      )}

      {/* Список страниц */}
      {paginatedPages.map((p) => (
        <span
          key={p}
          className={currentPage === p ? classes.selectedPage : ''}
          onClick={() => onPageChanged(p)}
        >
          {p}
        </span>
      ))}

      {/* Кнопка вперед */}
      {startIndex + portionSize < pages.length && (
        <button onClick={() => onPageChanged(startIndex + portionSize + 1)}>{'>'}</button>
      )}
    </div>
  );
};
