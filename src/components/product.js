import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from 'jwt-decode' 
import '../App.css';

function Product({ product }) {
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState('')
  const [userid, setuserid] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setuserid(decodedToken.user_id)
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [token])

  const handleAddToCart = async (productId, userId) => {
    try {
      const authToken = localStorage.getItem('token'); // Retrieve the authentication token from local storage
  
      const response = await fetch('https://django-rest-framework-store.onrender.com/cart_items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include the token in the request headers
        },
        body: JSON.stringify({ product: productId, user: userId }), // Include both product and user ID
      });
  
      if (response.ok) {
        alert('Product added to cart!');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error adding product to cart');
    }
  };  

  return (
    <div className="col-md-4 mb-4">
      <Card className="h-100">
        <img
          className="card-img-top circular-image"
          src={`https://django-rest-framework-store.onrender.com${product.image}`}
          alt={`Product ${product.name}`}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text><strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}</Card.Text>
          <Card.Text><strong>Stock:</strong> {product.stock}</Card.Text>
          <Card.Text><strong>Description:</strong>{product.description}</Card.Text>
          {storedToken && (
            <Button variant="primary" onClick={() => handleAddToCart(product.id, userid)}>
              Add to Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
