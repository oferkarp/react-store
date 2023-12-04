import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate() // Use navigate from React Router

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('https://django-rest-framework-store.onrender.com/token/', {
        username,
        password,
      })

      const { access } = response.data
      localStorage.setItem('token', access) // Save the token to local storage

      // Handle the response accordingly (e.g., save authentication token)
      console.log('Login successful!', response.data)

      // Redirect to the main page after successful login
      navigate('/') // Replace '/' with the desired route
      window.location.reload() // Reload the page after logout

      // Optionally, redirect or update state to reflect login success
    } catch (error) {
      // Handle login failure (e.g., display error message)
      setError('Invalid username or password')
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
