import React from 'react'
import { Student } from '../../store/api/studentApi';
import { useGetCourseGradesByStudentIdQuery } from '../../store/api/courseGradeApi';
import { MdPerson3 } from 'react-icons/md';

interface CourseGradeRowProps{
    student: Student;
}

const CourseGradeData: React.FC<CourseGradeRowProps> = ({student}) => {

    const { data: courseData = [], isLoading, isError } = useGetCourseGradesByStudentIdQuery(student.id);

     // Debugging output
//   console.log('CourseGradeData:', courseData);

// console.log(`Grades for ${student.student_name}:`, courseData);

    return (
        <>
          {courseData.map((data) => (
            <div key={data.id} className="course-grade-row">
              <h1>{data.subject}</h1>
              <h1>
                <MdPerson3 />
              </h1>
              <h1>{student.student_name}</h1>
              <h1>{data.test1}%</h1>
              <h1>{data.test2}%</h1>
              <h1>{data.project}%</h1>
              <h1>{data.assignment}%</h1>
              <h1>{data.final_exam}%</h1>
              <h1>{data.average}%</h1>
              <button>Edit</button>
            </div>
          ))}
        </>
      );
}

export default CourseGradeData