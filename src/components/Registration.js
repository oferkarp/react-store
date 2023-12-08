import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate() 

  useEffect(() => {
    let errorTimer, successTimer;

    // Clear error message after 5 seconds
    if (error) {
      errorTimer = setTimeout(() => {
        setError('');
      }, 5000);
    }

    // Clear success message after 5 seconds
    if (successMessage) {
      successTimer = setTimeout(() => {
        setSuccessMessage('');
        navigate('/login');
      }, 5000);
    }

    // Clear timers when component unmounts or when messages change
    return () => {
      clearTimeout(errorTimer);
      clearTimeout(successTimer);
    };
  }, [error, successMessage, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://django-rest-framework-store.onrender.com/register/', {
        username,
        password,
        age,
        city,
      });

      setSuccessMessage('Registration successful!'); // Set success message

    } catch (error) {
      if (error.response && error.response.data) {
        // Extract error messages from the response data
        const errorMessage = Object.values(error.response.data).join(' ');
        setError(errorMessage);
      } else {
        setError('Something went wrong. Please try again.'); // Generic error message
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Registration</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
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
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age:
              </label>
              <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
