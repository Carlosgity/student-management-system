// subjectModel.ts
import pool from "../config/db";

export const getALlSubjects = async () => {
    const query = 'SELECT * FROM "subjects"';
    const { rows } = await pool.query(query)
    return rows
}