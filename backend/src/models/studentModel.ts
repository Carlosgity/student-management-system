// /models/studentModel.ts
import pool from '../config/db';

interface Student {
  id?: number;
  student_img: string;
  student_name: string;
  student_age: number;
  s_parent_name: string;
  student_address: string;
  student_contact: string;
}

// Get all students
export const getAllStudents = async (): Promise<Student[]> => {
  const result = await pool.query('SELECT * FROM "studentBio"');
  return result.rows;
};

// Get a student by ID
export const getStudentById = async (id: number): Promise<Student | null> => {
  const result = await pool.query('SELECT * FROM "studentBio" WHERE id = $1', [id]);
  return result.rows[0] || null;
};

// Create a new student
export const createStudent = async (student: Student): Promise<Student> => {
  const result = await pool.query(
    `INSERT INTO "studentBio" (student_img, student_name, student_age, s_parent_name, student_address, student_contact) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [student.student_img, student.student_name, student.student_age, student.s_parent_name, student.student_address, student.student_contact]
  );
  return result.rows[0];
};

// Update a student's information
export const updateStudent = async (id: number, student: Student): Promise<Student | null> => {
  const result = await pool.query(
    `UPDATE "studentBio" SET 
      student_img = $1, student_name = $2, student_age = $3, s_parent_name = $4, 
      student_address = $5, student_contact = $6 
     WHERE id = $7 RETURNING *`,
    [student.student_img, student.student_name, student.student_age, student.s_parent_name, student.student_address, student.student_contact, id]
  );
  return result.rows[0] || null;
};

// Delete a student
export const deleteStudent = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM "studentBio" WHERE id = $1', [id]);
};
