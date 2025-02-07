// src/components/GradePage.tsx
import React from 'react';
import './GradePage.css';
import TopBar from '../sidebarNtopBar/TopBar';
import SideBar from '../sidebarNtopBar/SideBar';
import { MdPerson, MdPerson3 } from 'react-icons/md';
import { useGetStudentsQuery } from '../../store/api/studentApi';
import StudentGradeRow from "./StudentGradesRow";
import GradeAverage from './GradeAverage';

const GradePage: React.FC = () => {
  const { data: students = [] } = useGetStudentsQuery();

  return (
    <div className="grade-component">

      <TopBar />
      <div className="grade-body">

        <SideBar />

        <div className="grade-content">

            {/* Header row for the grades table */}
            <div className="grade-table">
              <MdPerson3 />
              <h1>Name</h1>
              <h1>Mathematics</h1>
              <h1>English</h1>
              <h1>Science</h1>
              <h1>Social Studies</h1>
              <h1>Physical Education</h1>
              <h1>Religious Education</h1>
              <h1>Average</h1>
            </div>

            {/* Use StudentGradeRow for each student */}
            {students.map((student) => (
              <StudentGradeRow key={student.id} student={student} />
              
            ))}

          </div>

          <GradeAverage />
        </div>
      </div>
    
  );
};

export default GradePage;
