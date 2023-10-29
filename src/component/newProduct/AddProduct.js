import React, { useState } from 'react';
import axios from 'axios';
import './NewProduct.css'; 
import {useNavigate } from 'react-router-dom';


function AddProductForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    stock: 0,
    brand: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'image') {
      const imageFiles = Array.from(files);
      setProduct({ ...product, [name]: imageFiles });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Thêm các tệp hình ảnh đã chọn vào FormData
    product.image.forEach((imageFile, index) => {
      formData.append('image', imageFile, `image-${index}`);
    });
  
    // Thêm các trường dữ liệu khác vào FormData
    for (const key in product) {
      if (key !== 'image') {
        formData.append(key, product[key]);
      }
    }
  
    axios.post('http://localhost:9999/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        navigate('/products')
      })
      .catch(error => {
        // Xử lý lỗi
      });
  };
  

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-column">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={product.name}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="discountPercentage"
            placeholder="Discount Percentage"
            value={product.discountPercentage}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-column">
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={product.brand}
            onChange={handleInputChange}
          />

          <input
            type="file"
            name="image"
            placeholder="image"
            value={product.thumbnail}
            multiple
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className='add-button'>Submit</button>
      </form>
    </div>
  );
}

export default AddProductForm;
