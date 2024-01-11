import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onChangePage, pageCount }) => {
  return (
    <div className={styles.pag}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
