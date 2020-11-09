import ProductsTable from './ProductsTable';
import Filters from './Filters';
import { Col, Alert, Row, Pagination } from 'react-bootstrap';
import Loader from './Loader/Loader';

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
    error
  } = props;

  const next = () => {
    setPageIndex(pageIndex + 1);
    setFilteredProducts(products[pageIndex + 1]);
  }

  const previous = () => {
    setPageIndex(pageIndex - 1);
    setFilteredProducts(products[pageIndex - 1]);
  }

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

  if (products.length === 0 ) {
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
          <ProductsTable
            products={filteredProducts}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <span>{`${pageIndex+1} de ${numberOfPages}`}</span>
        </Col>
        <Col>
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
        </Col>
      </Row>
    </>
  );
}

export default SearchResult;
