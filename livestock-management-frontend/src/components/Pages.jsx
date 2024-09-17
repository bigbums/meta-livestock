
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Send registration data to Laravel backend
      const response = await axios.post('http://localhost:8080/api/register', {
        firstname,
        lastname,
        username,
        email,
        password,
      });

      // On success, redirect or show a message
      console.log('Registration successful:', response.data);
      setSuccessMessage('User registered successfully!');
      // router.push('/login'); // Redirect to login page
    } catch (error) {
    //   setErrorMessage('Error registering user, please try again.');'
        console.error('Registration error:', error.response ? error.response.data : error.message);
        setErrorMessage(error.response ? error.response.data.message : 'An unexpected error occurred.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px' }}>
        <h2 style={{marginBottom:'1rem'}}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
            />
          </div>

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

          <div style={{ marginBottom: '1rem' }}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: 'blue', color: 'white' }}>
            Register
          </button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
