//courseGradeModel.ts

import pool from '../config/db';

// Define the CourseHeaders interface

interface CourseHeaders {
    test1: string;
    test2: string;
    project: string;
    assignment: string;
    final_exam: string;
  }
  


// TODO ---------------------------------------------------------------------------------------------------------------------------


// Fetch all course header data
export const getCourseHeader = async () => {
    const result = await pool.query('SELECT * FROM "CourseHeader"');
    return result.rows;
};

// Update course header data
export const updateCourseHeader = async (id: number, headerData: any) => {
    const { test1, test2, project, assignment, final_exam } = headerData;
    const result = await pool.query(
        `UPDATE "CourseHeader"
         SET test1 = $1, test2 = $2, project = $3, assignment = $4, final_exam = $5
         WHERE id = $6 RETURNING *`,
        [test1, test2, project, assignment, final_exam, id]
    );
    return result.rows[0];
};

// TODO ---------------------------------------------------------------------------------------------------------------------------

// Fetch all grades for all students
export const getAllCourseGrades = async () => {
    const result = await pool.query(`
        SELECT 
            studentCourseGrade.id,
            studentCourseGrade.student_id,
            studentBio.student_name,
            studentBio.student_img,
            studentCourseGrade.subject,
            studentCourseGrade.test1,
            studentCourseGrade.test2,
            studentCourseGrade.project,
            studentCourseGrade.assignment,
            studentCourseGrade.final_exam,
            studentCourseGrade.average
        FROM "studentCourseGrade"
        INNER JOIN "studentBio" ON studentCourseGrade.student_id = studentBio.id
        ORDER BY studentCourseGrade.subject;
    `);
    return result.rows;
};
  

// Fetch grades for a specific student
export const getCourseGradesByStudentId = async (studentId: number) => {
    const result = await pool.query(`SELECT * FROM "studentCourseGrade" WHERE student_id = $1`, [studentId]);
    return result.rows;
};

// Add a new grade for a student
export const addCourseGrade = async (studentId: number, gradeData: any) => {
    const { subject, test1, test2, project, assignment, final_exam, average } = gradeData;
    const result = await pool.query(
        `INSERT INTO "studentCourseGrade" (student_id, subject, test1, test2, project, assignment, final_exam, average)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [studentId, subject, test1, test2, project, assignment, final_exam, average]
    );
    return result.rows[0];
};

// Update a grade for a student
export const updateCourseGrade = async (id: number, gradeData: any) => {
    const { subject, test1, test2, project, assignment, final_exam, average } = gradeData;
    const result = await pool.query(
        `UPDATE "studentCourseGrade"
         SET subject = $1, test1 = $2, test2 = $3, project = $4, assignment = $5, final_exam = $6, average = $7
         WHERE id = $8 RETURNING *`,
        [subject, test1, test2, project, assignment, final_exam, average, id]
    );
    return result.rows[0];
};

// Delete a grade for a student
export const deleteCourseGrade = async (id: number) => {
    await pool.query(`DELETE FROM "studentCourseGrade" WHERE id = $1`, [id]);
};
