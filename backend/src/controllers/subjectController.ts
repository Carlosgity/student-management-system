// subjectController.ts
import { Request, Response } from 'express'

import { getALlSubjects } from '../models/subjectModel'

export const fetchAllSubjects = async (req: Request, res: Response) => {
    try {
        const subjects = await getALlSubjects();
        res.status(200).json(subjects);
    }catch (error) {
        console.error('Error fetching all subjects:', error)
        res.status(500).json({ error: 'Failed to fetch subjects' })
    }
}

