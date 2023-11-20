import React from 'react';
import Card from 'react-bootstrap/Card';

function product({ product }) {
  return (
    <div className="col-sm-4">
      <Card className="card">
        <Card.Body>
          <Card.Title>name:{product.name}</Card.Title>
          <img
            className="card-img-top"
            src={"https://picsum.photos/268/180?random=" + product.id}
            alt="Card cap"
          />
          <Card.Text>product:{product.price}$</Card.Text>
          <Card.Text>category:{product.category}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default product;
