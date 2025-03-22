import React from 'react';

const Pagination = ({ paginationData, setCurrentPage }) => {
    const { currentPage, totalPages } = paginationData;

    const handlePrev = () => setCurrentPage((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));
    const handleNext = () => setCurrentPage((prev) => ({ ...prev, page: Math.min(prev.page + 1, totalPages) }));

    const generatePageNumbers = () => {
        const pages = [];
        const visiblePages = 5;

        if (totalPages <= 10) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        for (let i = 1; i <= visiblePages; i++) {
            pages.push(i);
        }

        if (currentPage > visiblePages + 1) {
            pages.push('...');
        }

        if (currentPage > visiblePages && currentPage < totalPages - visiblePages + 1) {
            pages.push(currentPage);
        }

        if (currentPage < totalPages - visiblePages) {
            pages.push('...');
        }

        for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div>
            <div>
                <span>Page {currentPage} / {totalPages}</span>
                <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                {generatePageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && setCurrentPage((prev) => ({ ...prev, page }))}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Pagination;
