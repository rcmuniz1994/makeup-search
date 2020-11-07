import React from 'react';
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
    <div className="App">
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
