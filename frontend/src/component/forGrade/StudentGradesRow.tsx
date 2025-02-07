// src/components/StudentGradeRow.tsx
import React from 'react';
import { MdPerson3 } from 'react-icons/md';
import { useGetGradesByStudentIdQuery } from '../../store/api/gradeApi';
import { Student } from '../../store/api/studentApi';

interface StudentGradeRowProps {
  student: Student;
}

const StudentGradeRow: React.FC<StudentGradeRowProps> = ({ student }) => {
  // Fetch grade data for the specific student
  const { data: gradeData } = useGetGradesByStudentIdQuery(student.id);

  return (
    <div className="grades-row">
      <MdPerson3 />
      <h2>{student.student_name}</h2>
      <h2>{gradeData?.mathematics ?? 'N/A'}%</h2>
      <h2>{gradeData?.english_language ?? 'N/A'}%</h2>
      <h2>{gradeData?.science ?? 'N/A'}%</h2>
      <h2>{gradeData?.social_studies ?? 'N/A'}%</h2>
      <h2>{gradeData?.physical_education ?? 'N/A'}%</h2>
      <h2>{gradeData?.religious_education ?? 'N/A'}%</h2>
      <h2>{gradeData?.average ?? 'N/A'}%</h2>
      
      <div className="grade-edit-button">
        <button className="">Edit</button>
      </div>
  </div>
  );
};

export default StudentGradeRow;
