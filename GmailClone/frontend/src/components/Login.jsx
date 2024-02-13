// credit: Used from authenticated book example

import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.css';

/**
 * Emoji picker example
 *
 * @return {object} JSX
 */
function Login() {
  const [user, setUser] = React.useState({password: ''});
  const history = useNavigate();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3010/v0/Login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        history('/');
      })
      .catch((err) => {
        alert('Incorrect Username or Password, please try again');
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='login'>Login</div>
      <br></br>
      <input
        type='text'
        aria-label='Username'
        className='username'
        name='username'
        placeholder='Username'
        onChange={handleInputChange}
      />
      <br></br>
      <br></br>
      <input
        type='text'
        aria-label='Password'
        className='password'
        name='password'
        placeholder='Password'
        onChange={handleInputChange}
      />
      <br></br>
      <br></br>
      <input type='checkbox' name='' id='RememberMe' />
      <label htmlFor='RememberMe'>Remember Me</label>
      <br></br>
      <br></br>

      <input type='submit' aria-label='Submit Login' value='Submit' />
    </form>
  );
}

export default Login;
