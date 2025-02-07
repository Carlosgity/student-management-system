// studentGradeModel.ts
import pool from '../config/db';

export const getGradeBySubject = async (subjectId: number) => {
    const query = `
        SELECT 
            studb.id AS student_id,
            studb.student_name,
            studb.student_img,
            sub.subject,
            g.test1,
            g.test2,
            g.project,
            g.assignment_grade,
            g.final_exam,
            g.avg_grade
        FROM "studentBio" studb
        CROSS JOIN "subjects" sub  -- Ensure all subjects are included for each student
        LEFT JOIN "studentGrade" g 
            ON studb.id = g.student_id AND sub.id = g.subject_id
        WHERE sub.id = $1  -- Filter by the selected subject
    `;
    const { rows } = await pool.query(query, [subjectId]);

    return rows;
};



export const updateStudentGrade = async (
    studentId: number,
    subjectId: number,
    gradeData: {
      test1?: number | null;
      test2?: number | null;
      project?: number | null;
      assignment_grade?: number | null;
      final_exam?: number | null;
    }
  ) => {
    const avgGrade =
      (gradeData.test1 || 0) +
      (gradeData.test2 || 0) +
      (gradeData.project || 0) +
      (gradeData.assignment_grade || 0) +
      (gradeData.final_exam || 0) / 5;
  
      const query = `
      INSERT INTO "studentGrade" (student_id, subject_id, test1, test2, project, assignment_grade, final_exam)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (student_id, subject_id)
        DO UPDATE SET
        test1 = COALESCE($3, "studentGrade".test1),
        test2 = COALESCE($4, "studentGrade".test2),
        project = COALESCE($5, "studentGrade".project),
        assignment_grade = COALESCE($6, "studentGrade".assignment_grade),
        final_exam = COALESCE($7, "studentGrade".final_exam);
   `;
   
  
   const values = [
    studentId,
    subjectId,
    gradeData.test1 || null,
    gradeData.test2 || null,
    gradeData.project || null,
    gradeData.assignment_grade || null,
    gradeData.final_exam || null,
  ];
  
  
    console.log('Executing query:', query);
    console.log('With values:', values);
  
    await pool.query(query, values);
  };
  


// export const getGradeBySubject = async (subjectId: number) => {
//     const query = `
//         SELECT 
//             g.id,
//             studb.student_name,
//             studb.student_img,
//             sub.subject,
//             g.test1,
//             g.test2,
//             g.project,
//             g.assignment_grade,
//             g.final_exam,
//             g.avg_grade
//         FROM "studentGrade" g 
//         INNER JOIN "studentBio" studb ON g.student_id = studb.id  -- Assuming "student_id" is the correct field
//         INNER JOIN "subjects" sub ON sub.id = g.subject_id         -- Corrected join condition
//         WHERE g.subject_id = $1
//     `;
//     const { rows } = await pool.query(query, [subjectId]);

//     return rows;
// };