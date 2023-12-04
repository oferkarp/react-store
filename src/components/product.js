import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../App.css';

function Product({ product }) {
  const storedToken = localStorage.getItem('token');

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch('https://django-rest-framework-store.onrender.com/cart_items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers like authentication tokens here
        },
        body: JSON.stringify({ product: productId }), // Change to send product ID as 'product'
      });

      if (response.ok) {
        // Handle success
        console.log('Product added to cart successfully!');
      } else {
        // Handle errors
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  console.log('Product:', product);

  return (
    <div className="col-md-4 mb-4">
    <Card className="h-100">
      <img className="card-img-top circular-image" src={`https://django-rest-framework-store.onrender.com${product.image}`} alt={`Product ${product.name}`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text><strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}</Card.Text>
        <Card.Text><strong>Stock:</strong> {product.stock}</Card.Text>
        <Card.Text><strong>Description:</strong>{product.description}</Card.Text>
        {storedToken && (
          <Button variant="primary" onClick={() => handleAddToCart(product.id)}>
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  </div>
  );
}

export default Product;
