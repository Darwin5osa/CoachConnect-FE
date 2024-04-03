import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import s from "./css/pagination.module.css";

const Pagination = ({
  tutorias,
  handlePageChange,
  currentPage,
  itemsPerPage,
}) => {
  const totalPages = Math.ceil(tutorias.length / itemsPerPage);
  const handleChange = (page) => {
    handlePageChange(page);
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
