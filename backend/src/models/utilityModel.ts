// src/models/utilityModel.ts

import pool from '../config/db'; // Import the pool for database access

// Function to get the total count of students
export const getStudentCount = async (): Promise<number> => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM "studentBio"'); // Query to count rows in studentBio
    return parseInt(result.rows[0].count, 10); // Parse the result to return an integer
  } catch (error) {
    console.error("Error fetching student count:", error); // Log any errors
    throw error; // Rethrow the error to be handled by the controller
  }
};
