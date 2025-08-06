import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import '../styles/AuthForm.css'; // ✅ Import CSS here

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login/', formData);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setMessage('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="username" onChange={handleChange} value={formData.username} placeholder="Username" required />
        <input name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Password" required />
        <button type="submit">Login</button>
        <p>{message}</p>
        <button type="button" className="switch-btn" onClick={() => navigate('/signup')}>
          Don't have an account? Signup
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
