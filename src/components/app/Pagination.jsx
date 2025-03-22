import React from 'react';

const Pagination = ({ paginationData, setCurrentPage }) => {
    const { currentPage, totalPages } = paginationData;

    const handlePrev = () => setCurrentPage((pre) => ({ ...pre, page: Math.max(pre.page - 1, 1) }));
    const handleNext = () => setCurrentPage((pre) => ({ ...pre, page: Math.min(pre.page + 1, totalPages) }));

    return (
        <div>
            <div>
                <span>Page {currentPage} / {totalPages}</span>
                <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Pagination;