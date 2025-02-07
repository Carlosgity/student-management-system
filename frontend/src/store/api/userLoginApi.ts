// Import necessary modules and functions from Redux Toolkit Query for creating API endpoints
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define an interface for the UserLogin data structure
interface UserLogin {
  id?: number; // Make `id` optional because it may not be included in the login request
  username: string; // Username field, required for the login request
  password: string; // Password field, required for the login request
}

// Create the API slice using createApi, which is used to define endpoints and their configurations
export const userLoginApi = createApi({
  // Specify a unique key for this API slice in the Redux store
  reducerPath: 'userLoginApi',
  
  // Configure the base query to set up the base URL and request configurations
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // The base URL for all API requests in this slice
  }),

  // Define endpoints within this API slice
  endpoints: (builder) => ({
    // Define a mutation endpoint called `login` for the login request
    login: builder.mutation<UserLogin, Partial<UserLogin>>({
      // Specify the query configuration for the mutation
      query: (user) => ({
        url: '/login', // Endpoint path that will be appended to the base URL
        method: 'POST', // HTTP method for the request; POST is used for sending data to the server
        body: {
          username: user.username, // Set the username in the request body
          password: user.password, // Set the password in the request body
        },
      }),
    }),
  }),
});

// Export the auto-generated hook for the `login` mutation
export const { useLoginMutation } = userLoginApi;
// This hook, `useLoginMutation`, can be used in components to call the login mutation and handle its state
