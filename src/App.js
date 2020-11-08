import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ProductsTable from './components/ProductsTable';
import Title from './components/Title';
import SearchIcon from '@material-ui/icons/Search';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [productType, setProductType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`)
      .then(response => response.json())
      .then(products => {
        setProducts(products);
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

  return (
    <Container>
      <Title>
        Makeup Search
      </Title>
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
      <ProductsTable
        products={products}
        loading={loading}
        error={error}
      />
    </Container>
  );
}

export default App;
