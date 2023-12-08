import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="text-center">
        <h1>Welcome to my Store</h1>
        <p className="mb-4">Explore our collection of products.</p>
        <Link to="/react-store" className="btn btn-primary">
          View Store
        </Link>
      </div>
    </div>
  );
}

export default Home;
