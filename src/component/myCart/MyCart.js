import axios from 'axios';
import { Button, Form, Table, } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Tạo một tệp CSS riêng

const MyCart = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productBuy, setProductBuy] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cartID = localStorage.getItem('cartID');
        axios.get(`http://localhost:9999/carts/${cartID}`).then((response) => {
            setProductBuy(response.data.data)
            setFilteredProducts(response.data.data[0]?.products);
        });
    }, [filteredProducts]);

    return (
        <div className="cart-container">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.discountPercentage}</td>
                            <td>{product.quantity}</td>
                            <td>{product.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MyCart;
