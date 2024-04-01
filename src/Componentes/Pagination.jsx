import s from "./css/pagination.module.css";
import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

const Pagination = ({ tutorias, handlePageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1200 ? 10 : 5
  );
  const totalPages = Math.ceil(tutorias.length / itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth > 1200 ? 10 : 5);
      setCurrentPage((prevPage) => Math.min(prevPage, totalPages - 1));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [totalPages]);

  const handleChange = (page) => {
    handlePageChange(page)
    setCurrentPage(page);
  };
  return (
    <>
      {tutorias.length > itemsPerPage && (
        <div className={s.pagination}>
          {[...Array(totalPages).keys()].map((page) => (
            <ScrollLink
              key={page}
              className={s.link}
              to="startList"
              offset={-100}
              smooth={true}
              duration={100}
            >
              <button
                onClick={() => handleChange(page)}
                className={`${currentPage === page ? s.active : ""} ${
                  s.btn_pagina
                }`}
              >
                {page + 1}
              </button>
            </ScrollLink>
          ))}
        </div>
      )}
    </>
  );
};

export default Pagination;
