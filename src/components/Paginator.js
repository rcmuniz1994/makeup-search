import React from 'react';
import { Pagination } from 'react-bootstrap';
import styled from 'styled-components';

const PaginatorContainer = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Paginator = (props) => {
  const {
    pageIndex,
    numberOfPages,
    setPageIndex,
    setFilteredProducts,
    products
  } = props;

  const next = () => {
    setPageIndex(pageIndex + 1);
    setFilteredProducts(products[pageIndex + 1]);
  }

  const previous = () => {
    setPageIndex(pageIndex - 1);
    setFilteredProducts(products[pageIndex - 1]);
  }

  return (
    <PaginatorContainer>
        <span className="mr-3">{`${pageIndex+1} de ${numberOfPages}`}</span>
        <Pagination>
          <Pagination.Prev
            onClick={previous}
            disabled={pageIndex === 0}
        />
        <Pagination.Next
          onClick={next}
          disabled={pageIndex === numberOfPages - 1}
        />
        </Pagination>
    </PaginatorContainer>
  );
}

export default Paginator;