import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stars from './Stars';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Registering:', { name, email, password });

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log('Response from backend:', data);
      if (response.ok) {
        alert('Registration successful!');
        navigate('/');
      } else if (response.status === 500 && data.message.includes('E11000')) {
        alert('User with this email already exists.');
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed.');
    }
  };

  return (
    <div className="container">
      <Stars />
      <h1>User Based Tuning</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Register</button>
        <div className="signup-link">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
