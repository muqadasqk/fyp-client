import clsx from "clsx";
import { useState, Fragment } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Pagination = ({ data, set, onSort }) => {
    const { page, totalPages, totalItems } = data;
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
        <div className="w-full flex flex-row justify-between items-center gap-y-2 gap-x-4 sm:px-4 sm:py-3 mt-5">

            <div className="hidden sm:flex flex-row items-center text-primary gap-x-2">
                <span>
                    Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                </span>
            </div>

            <div className={clsx("flex justify-center items-center", { hidden: totalPages <= 1 })}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="w-8 h-8 mx-1 flex items-center justify-center rounded-full disabled:opacity-40"
                >
                    <FaChevronLeft />
                </button>

                {pagesToDisplay.map((num, index) => (
                    <Fragment key={index}>
                        {index > 0 && num !== pagesToDisplay[index - 1] + 1 && (
                            <span className="mx-1">...</span>
                        )}
                        <button
                            onClick={() => handlePageChange(num)}
                            disabled={currentPage === num}
                            className={clsx(
                                "w-8 h-8 mx-1 rounded-full flex items-center justify-center",
                                { "bg-theme": currentPage == num }
                            )}
                        >
                            {num}
                        </button>
                    </Fragment>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="w-8 h-8 mx-1 flex items-center justify-center rounded-full disabled:opacity-40"
                >
                    <FaChevronRight />
                </button>
            </div>

            <div>
                <select
                    className="border border-primary rounded-md bg-primary px-2 py-1 focus:outline-none focus:ring"
                    onChange={(e) => onSort(e.target.value)}
                    defaultValue={10}
                >
                    {/* <option key={totalItems} value={totalItems}>All - {totalItems}</option> */}
                    {[1, 10, 20, 50, 100, 500, 1000].map((range) => (
                        <option key={range} value={range}>{range}/page</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Pagination;
