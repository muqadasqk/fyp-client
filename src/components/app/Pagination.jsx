import { Button } from "@components";
import { useState, Fragment } from "react";

const Pagination = ({ data, set }) => {
    const { page, totalPages } = data;
    const [currentPage, setCurrentPage] = useState(page || 1);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        set(newPage);
        setCurrentPage(newPage);
    };

    const getPageNumbers = () => {
        if (totalPages <= 2) return Array.from({ length: totalPages }, (_, i) => i + 1);

        const pages = new Set([1, totalPages]);

        if (currentPage > 2) pages.add(currentPage - 1);
        pages.add(currentPage);
        if (currentPage < totalPages - 1) pages.add(currentPage + 1);

        return Array.from(pages).sort((a, b) => a - b);
    };

    const pagesToDisplay = getPageNumbers();

    return (
        <Fragment>
            <span>Page {currentPage} / {totalPages}</span>

            {totalPages > 1 && (
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    Prev
                </Button>
            )}

            {pagesToDisplay.map((num, index) => (
                <Fragment key={index}>
                    {index > 0 && num !== pagesToDisplay[index - 1] + 1 && <span> ... </span>}
                    <Button key={index} onClick={() => handlePageChange(num)} disabled={currentPage === num}>
                        {num}
                    </Button>
                </Fragment>
            ))}

            {totalPages > 1 && (
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    Next
                </Button>
            )}
        </Fragment>
    );
};

export default Pagination;
