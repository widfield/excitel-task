import React from "react";
import styled from "styled-components";

const PaginationButton = styled.button`
  padding: 6px 10px;
  border: 0.5px solid black;
  background: #fff;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background: lightgrey;
  }
  margin-right: 3px;
`;

const Pagination = ({ pages = 0, setPage }) => {
  const items = Array.from({ length: pages }, (_, index) => (
    <PaginationButton key={index} onClick={() => setPage(index + 1)}>
      {index + 1}
    </PaginationButton>
  ));
  return items;
};

export default Pagination;
