import React from 'react';
import { Link } from 'react-router-dom';

function MyFooter() {
  return (
    <footer className="bg-light py-4">
      <div className="container text-center">
        <ul className="list-inline mb-4">
          <li className="list-inline-item mx-2">
            <Link to="/Home" className="text-muted" aria-label="Go to Home">
              Home
            </Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link to="/register" className="text-muted" aria-label="Go to Register">
              Register
            </Link>
          </li>
        </ul>
        <p className="text-muted mb-0">© 2023 Company</p>
      </div>
    </footer>
  );
}

export default MyFooter;
