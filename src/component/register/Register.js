import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './Register.css'; // Import file CSS tùy chỉnh
import { Link, useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post('http://localhost:9999/users', formData);
      console.log('Kết quả từ API:', response.data);
      alert('Register Successfully!!');
      navigate('/')

    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="registration-form">
      <h1>Đăng kí</h1>
      <Form.Group controlId="username">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </Form.Group>

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

      <Link to="/" variant="body2">
          Bạn đã có tài khoản? Đăng nhập
        </Link>

      <Button variant="primary" type="submit">
        Đăng ký
      </Button>
    </Form>
  );
}

export default Register;
