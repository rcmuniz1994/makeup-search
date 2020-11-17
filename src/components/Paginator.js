import React from 'react';
import { Pagination } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaginatorContainer = styled.div`
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
    products,
  } = props;

  const next = () => {
    setPageIndex(pageIndex + 1);
    setFilteredProducts(products[pageIndex + 1]);
  };

  const previous = () => {
    setPageIndex(pageIndex - 1);
    setFilteredProducts(products[pageIndex - 1]);
  };

  return (
    <PaginatorContainer>
      <span className="mr-3">{`${pageIndex + 1} de ${numberOfPages}`}</span>
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
};

Paginator.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  setPageIndex: PropTypes.func.isRequired,
  setFilteredProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Paginator;
