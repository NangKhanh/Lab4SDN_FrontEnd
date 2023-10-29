import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './ProductTable.css'; 
import { Link } from 'react-router-dom';

function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9999/products')
      .then(response => setProducts(response.data.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <div className="button-container">
        <Link to="/addproduct">
          <button className="add-product-button">Add Product</button>
        </Link>
        <button className="my-cart-button">My Cart</button>
      </div>
      <Table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Discount Percentage</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.discountPercentage}</td>
              <td>{product.stock}</td>
              <td>{product.brand}</td>
              <td>
                <img src={product.thumbnail} alt={product.name} style={{ maxWidth: '100px' }} />
              </td>
              <td><Link to={`/product/${product._id}`}>
                  <button >View detail</button><br />
                </Link><br />
                <button>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductTable;
