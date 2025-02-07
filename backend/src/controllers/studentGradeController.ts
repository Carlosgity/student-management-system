// studentGradeController
import { Request, Response } from "express";

import { getGradeBySubject } from "../models/studentGradeModel";
import { updateStudentGrade } from '../models/studentGradeModel';

export const fetchAllStudentGradeBySubject = async (req: Request, res: Response) => {

    const { subjectId } = req.params

    try{
        const subjectIdNum = parseInt(subjectId, 10)
        
        const studentGrades = await getGradeBySubject(subjectIdNum);
        res.json(studentGrades)
    }catch (error) {
        console.error('Error fetching grades:', error);
        res.status(500).send('Server Error');
    }
}



export const updateGrade = async (req: Request, res: Response) => {
  const { studentId, subjectId } = req.params;
  const gradeData = req.body;

  try {
    await updateStudentGrade(Number(studentId), Number(subjectId), gradeData);
    res.status(200).json({ message: 'Grade updated successfully' });
  } catch (error) {
    console.error('Error updating grade:', error);
    res.status(500).json({ error: 'Failed to update grade' });
  }
};