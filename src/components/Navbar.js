import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsCart4 } from 'react-icons/bs'
import { jwtDecode } from 'jwt-decode' // Importing the named export directly without 'default'
import axios from 'axios'
import '../App.css'

function Navbar({ categories, handleCategoryClick, searchproduct }) {
  const [filterdProductname, setFilteredProductname] = useState('')
  const location = useLocation()
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [userid, setuserid] = useState('')
  const navigate = useNavigate();


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

  useEffect(() => {
    try {
      if (userid) {
        axios
          .get(`https://django-rest-framework-store.onrender.com/user/${userid}/`)
          .then((response) => {
            const fetchedUsername = response.data.username
            setUsername(fetchedUsername)
          })
          .catch((error) => {
            console.error('Error fetching username:', error)
          })
      }
    } catch (error) {
      console.error('Error in fetching username:', error)
    }
  }, [userid])

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    navigate('/');
    window.location.reload(); // Reload the page after logout
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
          {/* Display login button if not logged in */}
          {!token && location.pathname !== '/login' && (
            <li className="nav-item">
              <Link className="btn btn-success" to="/login">
                Login
              </Link>
            </li>
          )}
          {/* Display logout button if logged in */}
          {token && (
            <li className="nav-item">
              <Link className="btn btn-danger"  to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
          <div>
            {username ? (
              <p className="welcome-message">
                Welcome, <span className="username">{username}</span>!
              </p>
            ) : (
              <p className="welcome-message">Welcome, guest!</p>
            )}
          </div>{' '}
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
