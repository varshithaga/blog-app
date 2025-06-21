import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('login/', { username, password });
      const { token, user_id, username: name } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('username', name);
      setAuth(true);
      navigate('/create');
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Left Side - Welcome Text */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(to bottom right, #00c6ff, #0072ff)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>👋 Welcome to BlogZone</h1>
        <p style={{ fontSize: '18px', maxWidth: '300px', textAlign: 'center' }}>
          Discover, write, and share insightful posts.
        </p>
      </div>

      {/* Right Side - Login Form */}
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
          <h2 style={{ color: '#333' }}>🔐 Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                fontSize: '16px',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            />

            {/* Password */}
            <div style={{ position: 'relative', marginBottom: '15px' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  paddingRight: '10px'
                }}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '13px',
                  color: '#007bff',
                  cursor: 'pointer',
                  userSelect: 'none',
                  background: '#fff',
                  padding: '0 4px'
                }}
              >
                {showPass ? 'Hide' : 'Show'}
              </span>
            </div>

            {/* Buttons */}
            <button type="submit" style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              Login
            </button>
            <br /><br />
            <Link to="/register">
              <button type="button" style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Sign Up
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
