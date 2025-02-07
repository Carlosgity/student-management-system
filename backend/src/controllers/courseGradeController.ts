//courseGradeController.ts
import { Request, Response } from 'express';

import { getCourseHeader, updateCourseHeader } from '../models/courseGradeModel';

import {
    getAllCourseGrades,
    getCourseGradesByStudentId,
    addCourseGrade,
    updateCourseGrade,
    deleteCourseGrade
} from '../models/courseGradeModel';

// TODO ---------------------------------------------------------------------------------------------------------------------------

export const fetchCourseHeader = async (req: Request, res: Response) => {
    try {
        const header = await getCourseHeader();  // Fetch the headers from your model
        res.status(200).json(header);  // Send the fetched headers
    } catch (error) {
        console.error("Error fetching course header:", error);
        res.status(500).json({ error: "Failed to fetch course header" });
    }
};

// Update course header data
export const modifyCourseHeader = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const updatedHeader = await updateCourseHeader(id, req.body);
        res.status(200).json(updatedHeader);
    } catch (error) {
        console.error("Error updating course header:", error);
        res.status(500).json({ error: "Failed to update course header" });
    }
};


// TODO ---------------------------------------------------------------------------------------------------------------------------

// Fetch all course grades
export const fetchAllCourseGrades = async (req: Request, res: Response) => {
    try {
        const grades = await getAllCourseGrades();
        res.status(200).json(grades);
    } catch (error) {
        console.error('Error fetching all course grades:', error);
        res.status(500).json({ error: 'Failed to fetch grades' });
    }
};

// Fetch course grades for a specific student
export const fetchCourseGradesByStudentId = async (req: Request, res: Response) => {
    const studentId = parseInt(req.params.studentId);
    try {
        const grades = await getCourseGradesByStudentId(studentId);
        res.json(grades);
    } catch (error) {
        console.error("Error fetching grades by student ID:", error);
        res.status(500).json({ error: "Failed to fetch grades" });
    }
};

// Add a new course grade
export const createCourseGrade = async (req: Request, res: Response) => {
    const studentId = parseInt(req.params.studentId);
    try {
        const newGrade = await addCourseGrade(studentId, req.body);
        res.status(201).json(newGrade);
    } catch (error) {
        console.error("Error adding course grade:", error);
        res.status(500).json({ error: "Failed to add grade" });
    }
};

// Update a course grade
export const modifyCourseGrade = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const updatedGrade = await updateCourseGrade(id, req.body);
        res.json(updatedGrade);
    } catch (error) {
        console.error("Error updating grade:", error);
        res.status(500).json({ error: "Failed to update grade" });
    }
};

// Delete a course grade
export const removeCourseGrade = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await deleteCourseGrade(id);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting grade:", error);
        res.status(500).json({ error: "Failed to delete grade" });
    }
};
