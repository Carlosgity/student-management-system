// /routes/studentRoutes.ts
import express from 'express';
import { getStudents, getStudent, addStudent, modifyStudent, removeStudent } from '../controllers/studentController';

const router = express.Router();

router.get('/students', getStudents);              // GET all students
router.get('/students/:id', getStudent);           // GET a single student by ID
router.post('/students', addStudent);              // POST to create a new student
router.put('/students/:id', modifyStudent);        // PUT to update a student by ID
router.delete('/students/:id', removeStudent);     // DELETE a student by ID

export default router;
