// src/routes/utilityRoutes.ts

import express from 'express';
import { fetchStudentCount } from '../controllers/utilityController'; // Import the controller

const router = express.Router();

// Define the route to get the student count
router.get('/student-count', fetchStudentCount);

export default router;
