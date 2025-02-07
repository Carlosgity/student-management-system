import express from 'express';
import {fetchCourseHeader, modifyCourseHeader } from '../controllers/courseGradeController';



import {
    fetchAllCourseGrades,
    fetchCourseGradesByStudentId,
    createCourseGrade,
    modifyCourseGrade,
    removeCourseGrade
} from '../controllers/courseGradeController';

const router = express.Router();

router.get('/course-header', fetchCourseHeader);  // This should handle the GET request for course header
router.put('/course-header/:id', modifyCourseHeader);  // This should handle the PUT request to update the course header


router.get('/courseGrades', fetchAllCourseGrades); // GET all grades
router.get('/courseGrades/:studentId', fetchCourseGradesByStudentId);
router.post('/courseGrades/:studentId', createCourseGrade);
router.put('/courseGrades/:id', modifyCourseGrade);
router.delete('/courseGrades/:id', removeCourseGrade);

export default router;
