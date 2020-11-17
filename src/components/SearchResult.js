import React from 'react';
import { Col, Alert, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import ProductsTable from './ProductsTable';
import Filters from './Filters';
import Loader from './Loader/Loader';
import Paginator from './Paginator';

const SearchResult = (props) => {
  const {
    brands,
    selectedBrand,
    handleOnSelectBrand,
    products,
    filteredProducts,
    setFilteredProducts,
    productType,
    numberOfPages,
    setPageIndex,
    pageIndex,
    loading,
    error,
  } = props;

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <Row>
        <Col>
          <Alert variant="danger">
            Erro aos buscar os dados. Por favor, recarregue a página e tenta novamente.
          </Alert>
        </Col>
      </Row>
    );
  }

  if (products.length === 0) {
    return (
      <Row>
        <Col>
          <Alert variant="secondary">
            {`No results for ${productType}.`}
          </Alert>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row>
        <Col lg="3">
          <Filters
            brands={brands}
            selectedBrand={selectedBrand}
            handleOnSelectBrand={handleOnSelectBrand}
          />
        </Col>
        <Col lg="9">
          <Paginator
            pageIndex={pageIndex}
            numberOfPages={numberOfPages}
            setPageIndex={setPageIndex}
            setFilteredProducts={setFilteredProducts}
            products={products}
          />
          <ProductsTable
            products={filteredProducts}
          />
        </Col>
      </Row>
    </>
  );
};

SearchResult.propTypes = {
  brands: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedBrand: PropTypes.string.isRequired,
  handleOnSelectBrand: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFilteredProducts: PropTypes.func.isRequired,
  productType: PropTypes.string.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  setPageIndex: PropTypes.func.isRequired,
  pageIndex: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default SearchResult;
