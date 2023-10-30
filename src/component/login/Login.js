import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './Login.css'; 
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9999/users/login', formData);
      const userData = response.data;
      console.log('Kết quả từ API:', response.data);
      localStorage.setItem('userData', JSON.stringify(userData));
      alert('Login Successfully!!');
      navigate('/products')
      const cart = localStorage.getItem('cartID');
      localStorage.setItem('cartID', cart);
      console.log(JSON.parse(localStorage.getItem('userData')));


    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="registration-form">
        <h1>Đăng nhập</h1>
        <Form.Group controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Link to="/register" variant="body2">
          Bạn chưa có tài khoản? Đăng ký
        </Link>

        <Button variant="primary" type="submit">
          Đăng Nhập
        </Button>
      </Form>
    </div>
  );
}

export default Login;
