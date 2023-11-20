import React from 'react'
import { Link } from 'react-router-dom'

function MyFooter() {
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted" aria-label="Go to Home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link px-2 text-muted" aria-label="Go to Login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link px-2 text-muted" aria-label="Go to Register">
              Register
            </Link>
          </li>
          <li className="nav-item"></li>
          <Link className="nav-link" to="/add_product">
            Add Product
          </Link>
        </ul>
        <p className="text-center text-muted">© 2023 Company ©</p>
      </footer>
    </div>
  )
}

export default MyFooter
