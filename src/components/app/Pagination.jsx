import { Button } from "@components";
import { useState, Fragment } from "react";
import {FaChevronRight,FaChevronLeft } from "react-icons/fa";
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
        <div className="flex flex-wrap justify-between items-center px-3 py-4 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            
          <p className="text-sm text-gray-700">
          Page <span className="font-medium">{currentPage}/{totalPages}</span> </p>
        </div>
            

            <div>
                {totalPages > 1 && (
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                         className="rounded-md  h-10 w-10 mx-2 "
                    >
                       <FaChevronLeft/>
                    </Button>
                )}


                {pagesToDisplay.map((num, index) => (
                    <Fragment key={index}>
                        {index > 0 && num !== pagesToDisplay[index - 1] + 1 && <span> ... </span>}
                        <Button key={index} onClick={() => handlePageChange(num)} 
                        disabled={currentPage === num} 
                    className="bg-transparent text-black hover:text-white w-10 h-10 ml-2">
                          {num}
                            
                        </Button>
                    </Fragment>
                ))}

                {totalPages > 1 && (
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="rounded-md w-10 h-10 mx-2"
                    >
                        <FaChevronRight/>
                    </Button>
                )}

            </div>
        </div>
    );
};

export default Pagination;
