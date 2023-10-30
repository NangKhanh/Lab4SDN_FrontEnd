import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './ProductTable.css';
import { Link, useNavigate } from 'react-router-dom';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useState(0);

  const btnClickListCart = () => {
    navigate('/mycart')
  }

  const addToCart = async (product) => {
    console.log("product");
    console.log(product);
    const cartID = localStorage.getItem('cartID');
    setCart(cart + 1);
    axios.put(`http://localhost:9999/carts/add/${cartID}`, { products: product }).then((response) => {
    });
  }


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
        <button className="my-cart-button" onClick={btnClickListCart}>My Cart</button>
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
            <th>Image</th>
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
                {product.images && product.images.length > 0 && (
                  <img src={product.images[0].path} alt={product.name} style={{ maxWidth: '200px' }} />
                )}
              </td>
              <td><Link to={`/product/${product._id}`}>
                <button >View detail</button><br />
              </Link><br />
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductTable;
