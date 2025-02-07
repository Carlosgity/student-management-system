// /routes/gradeRoutes.ts
import express from 'express';
import { fetchAllGrades, fetchGradesByStudentId, createGrade, modifyGrade, removeGrade } from '../controllers/gradeController';

const router = express.Router();

// Route to get all grades
router.get('/grades', fetchAllGrades);

// Route to get grades for a specific student
router.get('/grades/:studentId', fetchGradesByStudentId);

// Route to add grades for a student
router.post('/grades/:studentId', createGrade);

// Route to update grades for a student
router.put('/grades/:studentId', modifyGrade);

// Route to delete grades for a student
router.delete('/grades/:studentId', removeGrade);

export default router;
