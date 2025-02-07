// studentGradeRoutes.ts

import express from 'express';
import { updateGrade } from '../controllers/studentGradeController';

import { fetchAllStudentGradeBySubject } from '../controllers/studentGradeController';

const router = express.Router();

router.get('/student-grade/:subjectId', fetchAllStudentGradeBySubject)

router.put('/student-grade/:studentId/:subjectId', updateGrade);

export default router;