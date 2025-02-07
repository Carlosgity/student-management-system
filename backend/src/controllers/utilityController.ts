// src/controllers/utilityController.ts

import { Request, Response } from 'express';
import { getStudentCount } from '../models/utilityModel'; // Import the count function

export const fetchStudentCount = async (req: Request, res: Response) => {
  try {
    const count = await getStudentCount(); // Call the utility function
    res.json({ count }); // Send the count in JSON format
  } catch (error) {
    console.error("Error in fetchStudentCount:", error); // Log any errors
    res.status(500).json({ error: "Failed to fetch student count" }); // Send an error response if it fails
  }
};
