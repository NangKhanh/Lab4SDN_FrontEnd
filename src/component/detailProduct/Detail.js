import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import './detail.css'

const ProductCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [comments, setComments] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData')).data;
  console.log("test" + userData._id);

  useEffect(() => {
    // Gửi yêu cầu GET đến URL cụ thể dựa trên `id`
    axios.get(`http://localhost:9999/products/${id}`)
      .then(response => setProducts(response.data.data[0]))
      .catch(error => console.error(error));
  }, [id]);
  useEffect(() => {
    // Gửi yêu cầu GET đến URL cụ thể dựa trên `id`
    axios.get(`http://localhost:9999/products/${id}/comment`)
      .then(response => setComments(response.data.data))
      .catch(error => console.error(error));
  }, [id]);
  const [formData, setFormData] = useState({
    user: userData._id,
    title: '',
    body: '',
    productid: `${id}`
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
      console.log(formData);
      const response = await axios.post(`http://localhost:9999/users/${userData._id}/comment`, formData);
      window.location.reload();
      // console.log(JSON.parse(localStorage.getItem('userData')));
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };
  return (
    <Container>
      <Row>
        <Col md={4}>
          {products.images && products.images.length > 0 && (
            <div>
              <img src={products.images[0].path} alt={products.name} style={{ maxWidth: '200px' }} />
            </div>
          )}
        </Col>

        <Col md={8}>
          <h2>{products.name}</h2>
          <p>{products.description}</p>
          <p>Price: ${products.price}</p>
          <p>Discount: {products.discountPercentage}%</p>
          <p>Stock: {products.stock}</p>
          <p>Brand: {products.brand}</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={handleSubmit} className="registration-form">
            {comments.map(comment => (
              <div className="comment-container comment-box">
                <form className="cmt-card">
                  <div className="cmt-footer">
                    <img src="https://facebookninja.vn/wp-content/uploads/2023/06/anh-dai-dien-mac-dinh-zalo.jpg"/>
                    <span>{comment.user.username}:</span>
                    <p className="comment-body">{comment.body}</p>
                  </div>
                </form>
              </div>


            ))}
            <Form.Group controlId="title">
              <Form.Label>Title: </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label>Body: </Form.Label>
              <Form.Control
                type="text"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Comment
            </Button>
          </Form>


        </Col>
      </Row>
    </Container>
  );
};



export default ProductCard;
