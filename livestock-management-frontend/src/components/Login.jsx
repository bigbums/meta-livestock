"use client"
import { useState } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/navigation';

const Login = () => {
    // kendrick louis
    // idowu shoubi
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // Make a POST request to your login API endpoint
      const response = await axios.post('http://your-laravel-backend-url/api/login', {
        email,
        password,
      });

      // Assuming successful login, you might want to save the token, etc.
      console.log('Login successful:', response.data);
      // Redirect user after login
      // router.push('/dashboard');  // Adjust this route according to your application
    } catch (error) {
      setErrorMessage('Invalid creadentials. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: 'blue', color: 'white' }}>
            Sign In
          </button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
