import React from 'react';
import Container from 'react-bootstrap/Container';
import ProductsTable from './components/ProductsTable';
import './App.css';

function App() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
      .then(response => response.json())
      .then(products => {
        setProducts(products);
        setLoading(false);
      });
  },[setProducts, setLoading]);

  return (
    <Container>
      <ProductsTable
        products={products}
        loading={loading}
      />
    </Container>
  );
}

export default App;
