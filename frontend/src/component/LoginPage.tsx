// Import necessary modules from React
import React, { useState } from 'react';
// Import CSS for styling
import "./LoginPage.css";
// Import the useLoginMutation hook from the Redux store's API slice
import { useLoginMutation } from '../store/api/userLoginApi';
import { useNavigate } from 'react-router-dom'; // Import navigate for redirection


// Define the functional component LoginPage
const LoginPage = () => {

  // Define state variables for username and password with initial values as empty strings
  const [username, setUsername] = useState(''); // State to hold the username input
  const [password, setPassword] = useState(''); // State to hold the password input
  const [errorMessage, setErrorMessage] = useState(''); // State to hold

  const navigate = useNavigate(); // Initialize navigate function for redirection

  // Use the useLoginMutation hook to get the `login` function and its status flags
  // `login` is the function to trigger the mutation, while `isLoading`, `error`, and `data` are mutation states
  const [login, { isLoading, error, data }] = useLoginMutation();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior (i.e., page reload)
    try {
      // Call the login mutation with the username and password and wait for it to complete
      const result = await login({ username, password }).unwrap();
      console.log('Login successful:', result); // Log the result if login is successful
      // Additional actions can go here (e.g., redirecting or storing user info)
      if (result) {
        navigate('/studentpage'); // Adjust this path to match your route configuration
      }
    } catch (error) {
      console.error('Login failed:', error); // Log any errors that occur during login
      // Handle the login error here (e.g., display an error message to the user)

      // Check if `error` is an object and has a `status` property
        if (typeof error === 'object' && error !== null && 'status' in error) {
          const status = (error as { status: number }).status; // Assert type to access `status`
          
          if (status === 401) {
            setErrorMessage('Invalid username or password. Please try again.');
          } else {
            setErrorMessage('An unexpected error occurred. Please try again later.');
          }
        } else {
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
    }
  };

  // Render the component JSX
  return (
    <div className="login-page">
      {/* Container for the login section */}
      <div className='login-section'>
        {/* Header section for the logo and title */}
        <div className='login-heading'>
          <img src='logo.png' alt=''/> {/* Logo image */}
          <h2>Student Management System</h2> {/* Title for the application */}
        </div>

        {/* Login form with onSubmit handler set to handleSubmit */}
        <form className='login' onSubmit={handleSubmit}>
          {/* Input field for the username */}
          <div className='username'>
            {/* Username input with an onChange handler to update the username state */}
            <input 
              type='text' 
              className='form-control'  
              id='username' 
              placeholder='Enter username'
              onChange={(e) => setUsername(e.target.value)} // Update username state on change
            />
          </div>
          
          {/* Input field for the password */}
          <div className='password'>
            {/* Password input with an onChange handler to update the password state */}
            <input 
              type='password' 
              className='form-control' 
              id='password' 
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
            />
          </div>

            {/* Display error message if login fails */}
            {errorMessage && (
            <p className='error-message'>{errorMessage}</p> // Display error message
          )}

          {/* Button section for login and signup actions */}
          <div className='buttons'>
            <button type='button' className='Sign-up'>Sign-up</button> {/* Sign-up button, does not submit the form */}
            <button type='submit' className='Login'>Login</button> {/* Login button, submits the form */}
          </div>
          
        </form>

        {/* Link or text for "Forgot Password" */}
        <h2 className='forget-password'>Forget Password?</h2>


      </div>
      
      {/* Background image on the right side */}
      <div>
        <img alt='' src='teacher.jpeg' className='background-img'/> {/* Background image */}
      </div>
    </div>
  );
};

// Export the LoginPage component for use in other parts of the application
export default LoginPage;
