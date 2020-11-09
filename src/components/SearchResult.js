import ProductsTable from './ProductsTable';
import Filters from './Filters';
import { Col, Alert } from 'react-bootstrap';
import Loader from './Loader/Loader';

const SearchResult = (props) => {
  const {
    brands,
    selectedBrand,
    handleOnSelectBrand,
    products,
    productType,
    loading,
    error
  } = props;

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Erro aos buscar os dados. Por favor, recarregue a página e tenta novamente.
      </Alert>
    );
  }

  if (products.length === 0 ) {
    return (
      <Col>
        <Alert variant="secondary">
          {`No results for ${productType}.`}
        </Alert>
      </Col>
    );
  }
  
  return (
    <>
      <Col lg="3">
        <Filters
          brands={brands}
          selectedBrand={selectedBrand}
          handleOnSelectBrand={handleOnSelectBrand}
        />
      </Col>
      <Col lg="9">
        <ProductsTable
          products={products}
        />
      </Col>
    </>
  );
}

export default SearchResult;
