import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowGoBackFill } from "react-icons/ri";  // Import icons

function UserDash() {
  const [users, setUsers] = useState([]);  
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch user data from backend API on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.FORM_API_URL}/usres`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className='userDash'>
      <h1>User Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
              <td>{user.email}</td>
              <td>{user.normalPassword}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className='btn btn-dark' to={'/login'}><RiArrowGoBackFill /> Back</Link>
    </div>
  );
}

export default UserDash;
