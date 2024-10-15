import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [user, setUser] = useState({
    email:"",
    password:"",
    role:"employee"
  })

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/admin/add-user', { user })
      .then((response) => {
        setUser({
          email:"",
          password:""    
        })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="user email"
            value={user.email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='role'>Role:</label>
          <select value={user.role} onChange={handleChange} name='role' id='role'>
            <option>
              Admin
            </option>
            <option>
              Manager
            </option>
            <option>
              Lead
            </option>
            <option>
              employee
            </option>
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default CreateUser;
