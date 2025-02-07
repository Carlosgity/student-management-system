// /controllers/studentController.ts
import { Request, Response } from 'express';
import { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } from '../models/studentModel';

// Get all students
export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a student by ID
export const getStudent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const student = await getStudentById(id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new student
export const addStudent = async (req: Request, res: Response) => {
  try {
    const newStudent = await createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a student's information
export const modifyStudent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updatedStudent = await updateStudent(id, req.body);
    if (updatedStudent) {
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a student
export const removeStudent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteStudent(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
