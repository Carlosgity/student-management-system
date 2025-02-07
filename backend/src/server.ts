//Server.ts

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the CORS package
import pool from './config/db';
import loginRoutes from './routes/loginRoutes';
import studentRoutes from './routes/studentRoutes';
import utilityRoutes from './routes/utilityRoutes'; // Import the utility routes
import gradeRoutes from './routes/gradeRoutes';
import courseGradeRoutes from './routes/courseGradeRoutes'; // Fixed import
import studentGradeRoutes from './routes/studentGradeRoutes'
import subjectRoutes from './routes/subjectRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Add this line to enable CORS
app.use(express.json()); // Allows parsing JSON request bodies

// Use the login routes 
app.use('/api', loginRoutes); // Set up login route

// Use the student routes
app.use('/api', studentRoutes);
// Register utility routes at /api path
app.use('/api', utilityRoutes); 

app.use('/api', gradeRoutes);  //

app.use('/api', courseGradeRoutes);

// Set up course grade routes for headers

app.use('/api/course-header', courseGradeRoutes);

app.use('/api', studentGradeRoutes)
app.use('/api', subjectRoutes)




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  pool.connect().then(() => console.log('Connected to the database'));
});
