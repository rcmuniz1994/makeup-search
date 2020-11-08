import React from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import ProductsTable from './components/ProductsTable';
import './App.css';

function App() {
  const [products, setProducts] = React.useState([]);
  const [productType, setProductType] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`)
      .then(response => response.json())
      .then(products => {
        setProducts(products);
        setLoading(false);
      });
  },[setProducts, setLoading, productType]);

  const handleChange = (event) => {
    setProductType(event.target.value);
  }

  return (
    <Container>
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
      />
    </Container>
  );
}

export default App;
