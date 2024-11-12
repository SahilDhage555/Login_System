import React, { useState } from "react";
import axios from "axios";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { FaUser } from "react-icons/fa"; // User icon for the form
import { Link, useNavigate } from "react-router-dom";

function LogForm() {
  // State to store form input (email and password)
  const [formData, setFormData] = useState({ email: "", password: "" });

  // useNavigate hook to programmatically navigate to other routes (like dashboard)
  const navigate = useNavigate();

  // Function to handle input field changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Function to handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    try {
      // Send login credentials to the backend API using axios
      const response = await axios.post(
        `${process.env.FORM_API_URL}/login`,
        formData
      );

      // Store the token and user data in localStorage after successful login
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to the dashboard page upon successful login
      navigate("/dashboard");
    } catch (error) {
      // Show alert if login fails (invalid credentials)
      alert("Invalid Credentials");

      // Reset form fields in case of error
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column login-form">
      {/* Display user icon */}
      <div className="LogIcon text-center text-info">
        <FaUser />
      </div>

      {/* Login form heading */}
      <h2 className="text-center">Login</h2>

      {/* Input field for email */}
      <div className="inputFeild">
        <label htmlFor="email">
          <HiOutlineMail /> {/* Email icon */}
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange} // Update state on change
          placeholder="Email"
          required
        />
      </div>

      {/* Input field for password */}
      <div className="inputFeild">
        <label htmlFor="password">
          <RiLockPasswordLine /> {/* Password icon */}
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange} // Update state on change
          placeholder="Password"
          required
        />
      </div>

      {/* Submit button to submit the form */}
      <button className="btn btn-primary" type="submit">
        Login
      </button>

      {/* Link to the registration page for new users */}
      <Link className="text-center" to={"/register"}>
        New User
      </Link>
    </form>
  );
}

export default LogForm;
