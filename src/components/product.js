import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Product({ product }) {
  return (
    <div className="col-md-4 mb-4">
      <Card className="h-100">
        <img
          className="card-img-top"
          src={`https://picsum.photos/268/180?random=${product.id}`}
          alt={`Product ${product.name}`}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Price: ${parseFloat(product.price).toFixed(2)}</Card.Text>
          <Card.Text>Stock: {product.stock}</Card.Text>
          <Card.Text>Category: {product.category}</Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
