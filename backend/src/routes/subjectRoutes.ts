import express from 'express';
import { fetchAllSubjects } from '../controllers/subjectController';

const router = express.Router();

router.get('/subjects', fetchAllSubjects)

export default router;