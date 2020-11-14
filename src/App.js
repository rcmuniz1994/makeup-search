import { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import chunk from 'lodash.chunk';
import {
  Alert,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row
} from 'react-bootstrap';

import Title from './components/Title';
import SearchResult from './components/SearchResult';
import { hasSearchTextMinimalLength } from './utils/utils';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productType, setProductType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (hasSearchTextMinimalLength(productType)) {
      return
    }
    const url = selectedBrand
      ? `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}&brand=${selectedBrand}`
      : `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(products => {
        const brands = products.reduce((brands, product) => {
          if (!brands.includes(product.brand)) {
            brands = [...brands, product.brand];
          }

          return brands;
        }, []);
        const prods = chunk(products, 10);
        setBrands(brands);
        setProducts(prods);
        setFilteredProducts(prods[0] || []);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  },[productType, selectedBrand]);

  const handleChange = (event) => {
    setProductType(event.target.value);
  }

  const handleOnSelectBrand = (event) => {
    const brand = event;
    setSelectedBrand(brand);
    if (!brand) {
      setFilteredProducts(products[0]);

      return
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Title>
            Makeup Search
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup className="mt-3 mb-3">
            <FormControl
              value={productType}
              placeholder="Product type..."
              onChange={handleChange}
            />
            <InputGroup.Append>
            <InputGroup.Text>
              <SearchIcon />
            </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
        {hasSearchTextMinimalLength(productType) ? (
          <Row>
            <Col>
              <Alert variant="secondary">
                Please, insert the makeup type that you're looking for.
              </Alert>
            </Col>
          </Row>
        ) : (
          <SearchResult
            brands={brands}
            selectedBrand={selectedBrand}
            handleOnSelectBrand={handleOnSelectBrand}
            products={products}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            productType={productType}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            numberOfPages={products.length}
            loading={loading}
            error={error}
          />
        )}
      
    </Container>
  );
}

export default App;
