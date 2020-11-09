import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Title from './components/Title';
import SearchIcon from '@material-ui/icons/Search';
import './App.css';
import { Row, Col, Alert } from 'react-bootstrap';
import SearchResult from './components/SearchResult';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productType, setProductType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`)
      .then(response => response.json())
      .then(products => {
        const brands = products.map(product => product.brand);
        setBrands(brands);
        setProducts(products);
        setFilteredProducts(products);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  },[setProducts, setLoading, productType]);

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
      <Row>
        {productType.length < 2 ? (
          <Col>
            <Alert variant="secondary">
              Please, insert the makeup type that you're looking for.
            </Alert>
          </Col>
        ) : (
          <SearchResult
            brands={brands}
            selectedBrand={selectedBrand}
            handleOnSelectBrand={handleOnSelectBrand}
            products={filteredProducts}
            productType={productType}
            loading={loading}
            error={error}
          />
        )}
      </Row>
    </Container>
  );
}

export default App;
