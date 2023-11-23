import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BsCart4 } from 'react-icons/bs'
import '../App.css'

function Navbar({ categories, handleCategoryClick, searchproduct }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // State to track user's login status
  const [filterdProductname, setFilteredProductname] = useState('')
  const location = useLocation()

  const handleLogout = () => {
    // Perform logout action - Clear user session, reset state, etc.
    setIsLoggedIn(false) // Set the login status to false
  }

  const handleManualLogin = () => {
    setIsLoggedIn(true); // For demonstration purposes - manually set isLoggedIn to true
  };

  return (
    <>
      <nav className="navbar">
        <ul className="nav">
          <li className="nav">
            <Link to="/" className="nav-link" onClick={() => handleCategoryClick('')}>
              All Products
            </Link>
          </li>
          {categories.map((category, index) => (
            <li key={index} className="nav-item">
              <Link to="/" className="nav-link active" onClick={() => handleCategoryClick(category)}>
                {category}
              </Link>
            </li>
          ))}
          <li className="nav">
            <input
              value={filterdProductname}
              onChange={(e) => setFilteredProductname(e.target.value)}
              className="nav-input" // Apply the input style class
              placeholder="Search Product" // Optionally, add a placeholder
            />
          </li>
          <li className="nav">
            <Link
              to="/"
              className="btn btn-info" // Apply the modified styles for the info button
              onClick={() => searchproduct(filterdProductname)}
              style={{ borderRadius: '5px', padding: '8px 20px', fontSize: '16px' }}
            >
              Search
            </Link>
          </li>
          {/* <a className="nav-link active" href="http://localhost:3000/login">Login</a> */}
          {/* Other navigation items */}
          {/* Display login button if not logged in */}
          {!isLoggedIn && location.pathname !== '/login' && (
            <li className="nav-item">
              <Link className="btn btn-success" to="/login" onClick={handleManualLogin}>
                Login
              </Link>
            </li>
          )}

          {/* Display logout button if logged in */}
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="btn btn-danger"  to="/logout" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/cart">
              <BsCart4 style={{ fontSize: '2em', color: 'blue' }} />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
