import React from 'react';
import Table from 'react-bootstrap/Table';

const ProductsTable = (props) => {
  const { products } = props;
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
          <td>Type</td>
        </tr>
      </thead>
      <tbody>
        {products.map(product => {
          const { id, name, price, product_type } = product;

          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{price}</td>
              <td>{product_type}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ProductsTable;