import React, { useState } from "react";
import axios from "axios";
import { PiUserCircleFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function RegForm() {
  // State to hold registration form data (name, dateOfBirth, email, password)
  const [regData, setRegData] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
    password: "",
  });

  // useNavigate hook to programmatically navigate to other routes (like login page after successful registration)
  let navigate = useNavigate();

  // Function to handle changes in form input fields and update state
  const handleChange = (e) =>
    setRegData({ ...regData, [e.target.name]: e.target.value });

  // Function to handle form submission (register user)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send registration data to the backend API using axios
      const response = await axios.post(
        `${process.env.FORM_API_URL}/new-user`,
        regData
      );

      // Store the token and user data in localStorage after successful registration
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Show success alert to the user
      alert("Registered Successfully");

      // Redirect to the login page after successful registration
      navigate("/login");
    } catch (error) {
      // Handle any errors (e.g., if the user already exists)
      alert("Registration failed, please try again");
    }
  };

  return (
    <div className="container-fluid page">
      <form
        className="RegForm d-flex align-items-center flex-column"
        onSubmit={handleSubmit} // Trigger handleSubmit when the form is submitted
      >
        {/* Header for the registration form */}
        <div className="formHead">
          <p>New User</p>
        </div>

        {/* User icon to represent the registration form */}
        <div className="">
          <PiUserCircleFill className="icon" />
        </div>

        {/* Input field for user name */}
        <div className="inputFeild d-flex align-items-center">
          <label htmlFor="name">
            <FaUser /> {/* User icon */}
          </label>
          <input
            name="name" // Name field is linked to 'name' in regData state
            onChange={handleChange} // Update the state when the user types
            placeholder="Name"
            required
          />
        </div>

        {/* Input field for date of birth */}
        <div className="date">
          <label htmlFor="dateOfBirth">
            <MdDateRange /> {/* Date icon */}
          </label>
          <input
            name="dateOfBirth"
            type="date" // Date picker input
            onChange={handleChange} // Update the state on change
            required
          />
        </div>

        {/* Input field for email */}
        <div className="inputFeild">
          <label htmlFor="email">
            <HiOutlineMail /> {/* Email icon */}
          </label>
          <input
            name="email"
            onChange={handleChange} // Update the state on change
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
            name="password"
            type="password" // Password input
            onChange={handleChange} // Update the state on change
            placeholder="Password"
            required
          />
        </div>

        {/* Register button to submit the form */}
        <button className="RegBtn btn btn-info" type="submit">
          Register
        </button>

        {/* Link to the login page for already registered users */}
        <p className="text-light">
          Already Registered? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
}
export default RegForm;
