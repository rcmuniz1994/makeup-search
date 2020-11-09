import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Title from './components/Title';
import SearchIcon from '@material-ui/icons/Search';
import './App.css';
import { Row, Col, Alert } from 'react-bootstrap';
import SearchResult from './components/SearchResult';
import chunk from 'lodash.chunk';

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
    if (productType.length < 2) {
      return
    }
    setLoading(true);
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`)
      .then(response => response.json())
      .then(products => {
        const brands = products.map(product => product.brand);
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
  },[productType]);

  const handleChange = (event) => {
    setProductType(event.target.value);
  }

  const handleOnSelectBrand = (event) => {
    const brand = event;
    setSelectedBrand(brand);
    if (!brand) {
      setFilteredProducts(products);

      return
    }
    const filteredProducts = products.filter(product => product.brand === brand);
    setFilteredProducts(filteredProducts);
  }

  console.log("products: ", filteredProducts);

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
        {productType.length < 2 ? (
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
