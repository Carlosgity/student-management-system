// /controllers/gradeController.ts
import { Request, Response } from 'express';
import { getAllGrades, getGradesByStudentId, addGrade, updateGrade, deleteGradeByStudentId } from '../models/gradeModel';

// Get all grades
export const fetchAllGrades = async (req: Request, res: Response): Promise<void> => {
    try {
        const grades = await getAllGrades();
        res.json(grades);
    } catch (error) {
        console.error("Error fetching all grades:", error);
        res.status(500).json({ error: "Failed to fetch grades" });
    }
};

// Get grades for a specific student
export const fetchGradesByStudentId = async (req: Request, res: Response): Promise<void> => {
    const studentId = parseInt(req.params.studentId);
    if (isNaN(studentId)) {
        res.status(400).json({ error: "Invalid student ID" });
        return;
    }

    try {
        const grades = await getGradesByStudentId(studentId);
        if (!grades) {
            res.status(404).json({ error: "Grades not found" });
            return;
        }
        res.json(grades);
    } catch (error) {
        console.error("Error fetching grades for student:", error);
        res.status(500).json({ error: "Failed to fetch grades" });
    }
};

// Add new grades for a student
export const createGrade = async (req: Request, res: Response): Promise<void> => {
    const studentId = parseInt(req.params.studentId);
    if (isNaN(studentId)) {
        res.status(400).json({ error: "Invalid student ID" });
        return;
    }

    const grades = req.body;
    try {
        const newGrade = await addGrade(studentId, grades);
        res.status(201).json(newGrade);
    } catch (error) {
        console.error("Error adding grades:", error);
        res.status(500).json({ error: "Failed to add grades" });
    }
};

// Update grades for a student
export const modifyGrade = async (req: Request, res: Response): Promise<void> => {
    const studentId = parseInt(req.params.studentId);
    if (isNaN(studentId)) {
        res.status(400).json({ error: "Invalid student ID" });
        return;
    }

    const grades = req.body;
    try {
        const updatedGrade = await updateGrade(studentId, grades);
        if (!updatedGrade) {
            res.status(404).json({ error: "Grades not found" });
            return;
        }
        res.json(updatedGrade);
    } catch (error) {
        console.error("Error updating grades:", error);
        res.status(500).json({ error: "Failed to update grades" });
    }
};

// Delete grades for a student
export const removeGrade = async (req: Request, res: Response): Promise<void> => {
    const studentId = parseInt(req.params.studentId);
    if (isNaN(studentId)) {
        res.status(400).json({ error: "Invalid student ID" });
        return;
    }

    try {
        await deleteGradeByStudentId(studentId);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting grades:", error);
        res.status(500).json({ error: "Failed to delete grades" });
    }
};
