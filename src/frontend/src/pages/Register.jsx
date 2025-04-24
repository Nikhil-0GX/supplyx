import React from 'react';

const Register = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
