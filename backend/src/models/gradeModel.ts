// /models/gradeModel.ts
import pool from '../config/db';

// Fetch all grades for all students
export const getAllGrades = async () => {
    const result = await pool.query(`
        SELECT * FROM "studentGrade"
    `);
    return result.rows;
};

// Fetch grades for a specific student by their ID
export const getGradesByStudentId = async (studentId: number) => {
    const result = await pool.query(`
        SELECT * FROM "studentGrade" WHERE student_id = $1
    `, [studentId]);
    return result.rows[0];
};

// Add new grades for a student
export const addGrade = async (studentId: number, grades: any) => {
    const { mathematics, science, english_language, social_studies, physical_education, religious_education, average } = grades;
    const result = await pool.query(`
        INSERT INTO "studentGrade" 
        (student_id, mathematics, science, english_language, social_studies, physical_education, religious_education, average)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `, [studentId, mathematics, science, english_language, social_studies, physical_education, religious_education, average]);
    return result.rows[0];
};

// Update grades for a student
export const updateGrade = async (studentId: number, grades: any) => {
    const { mathematics, science, english_language, social_studies, physical_education, religious_education, average } = grades;
    const result = await pool.query(`
        UPDATE "studentGrade" 
        SET mathematics = $1, science = $2, english_language = $3, social_studies = $4, physical_education = $5, religious_education = $6, average = $7
        WHERE student_id = $8 RETURNING *
    `, [mathematics, science, english_language, social_studies, physical_education, religious_education, average, studentId]);
    return result.rows[0];
};

// Delete grades for a student
export const deleteGradeByStudentId = async (studentId: number) => {
    await pool.query(`DELETE FROM "studentGrade" WHERE student_id = $1`, [studentId]);
};
