import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('register/', form);
      alert('User registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Error: ' + JSON.stringify(err.response.data));
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Left Gradient Panel */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(to bottom right, #8E2DE2, #4A00E0)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>👤 Join BlogZone</h1>
        <p style={{ fontSize: '18px', maxWidth: '300px', textAlign: 'center' }}>
          Create your account to start writing and exploring blogs!
        </p>
      </div>

      {/* Right Signup Form */}
      <div style={{
        flex: 1,
        backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          width: '90%',
          maxWidth: '400px',
          padding: '30px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#333' }}>📝 Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <button type="submit" style={submitButtonStyle}>
              Register
            </button>
            <br /><br />
            <Link to="/login">
              <button type="button" style={secondaryButtonStyle}>
                Already have an account? Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

// 🔧 Reusable styles
const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const submitButtonStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const secondaryButtonStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '14px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default Signup;
