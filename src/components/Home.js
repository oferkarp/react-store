import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>Welcome to my Store</h1>
        <p className="mb-4">Explore our collection of products.</p>
        <Link to="/react-store" className="btn btn-primary">
          View Products
        </Link>
      </div>
    </div>
  );
}

export default Home;
