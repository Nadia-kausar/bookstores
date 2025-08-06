import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import '../styles/AuthForm.css'; // ✅ Import CSS here

const SignupPage = () => {
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
      const res = await axios.post('http://localhost:8000/api/signup/', formData);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setMessage('Signup failed. Try another username.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input name="username" onChange={handleChange} value={formData.username} placeholder="Username" required />
        <input name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Password" required />
        <button type="submit">Signup</button>
        <p>{message}</p>
        <button type="button" className="switch-btn" onClick={() => navigate('/login')}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
