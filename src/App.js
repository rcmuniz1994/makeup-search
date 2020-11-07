import React from 'react';
import Container from 'react-bootstrap/Container';
import ProductsTable from './components/ProductsTable';
import './App.css';

function App() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
      .then(response => response.json())
      .then(products => setProducts(products));
  },[]);
  console.log(products);

  return (
    <Container>
      <ProductsTable products={products}/>
    </Container>
  );
}

export default App;
