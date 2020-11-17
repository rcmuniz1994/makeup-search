import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

const ProductsTable = (props) => {
  const { products } = props;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <td>Name</td>
          <td>Brand</td>
          <td>Price</td>
          <td>Type</td>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const {
            id,
            name,
            price,
            product_type: productType,
            brand,
          } = product;

          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{brand}</td>
              <td>{`$ ${price}`}</td>
              <td>{productType}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductsTable;
