import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../App.css'; // Import your CSS file


function Navbar({ categories, handleCategoryClick, searchproduct }) {
  const [filterdProductname, setFilteredProductname] = useState('')
  const location = useLocation()

  return (
    <>
      <nav className="navbar">
        <ul className="nav">
          <li className="nav">
            <Link to="/" className="nav-link" onClick={() => handleCategoryClick('')}>
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id} className="nav-item">
              <Link to="/" className="nav-link active" onClick={() => handleCategoryClick(category)}>
                {category}
              </Link>
            </li>
          ))
          }
          <li className="nav">
            <input value={filterdProductname} onChange={(e) => setFilteredProductname(e.target.value)} />
          </li>
          <li className="nav">
            <Link to="/" className="btn btn-info" onClick={() => searchproduct(filterdProductname)}>
              Search
            </Link>
          </li>
          {/* <a className="nav-link active" href="http://localhost:3000/login">Login</a> */}
          {location.pathname === '/login' ? null : (
            <li className="nav-item">
              <Link className="btn btn-success" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}



export default Navbar
