import React, { useState } from 'react'
import TopBar from '../sidebarNtopBar/TopBar'
import SideBar from '../sidebarNtopBar/SideBar'
import { MdPerson3 } from 'react-icons/md'
import "./CourseGrade.css"
import EditHeaderWidget from './EditHeaderWidget'
import { CourseHeader, useGetCourseGradesByStudentIdQuery, useGetCourseHeaderQuery, useUpdateCourseHeaderMutation } from '../../store/api/courseGradeApi';
import { useGetGradesBySubjectQuery, useGetSubjectsQuery, useUpdateGradeMutation } from '../../store/api/studentBySubjectApi'
import EditGrade from './EditGrade'


const CourseGrade = () => {

  const { data: headers, isLoading, error, refetch: refetchHeaders } = useGetCourseHeaderQuery('');
  
  const { data: subjects, isLoading: subjectsLoading, error: subjectsError, refetch: refetchSubjects } = useGetSubjectsQuery();

  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  
  const {data: studentGrades, isLoading: gradesLoading, error: gradesError, refetch: refetchGrade }  = useGetGradesBySubjectQuery(selectedSubjectId);

  // prefill student grade when edit widget shows up
  const [selectedStudentGrade, setSelectedStudentGrade] = useState<any | null>(null);

  // console.log(studentGrades)

  // console.log(subjects?.subject); // Check if subjects are being fetched properly 

  //  
  const [ updateCourseHeader ] =  useUpdateCourseHeaderMutation();
  
  const [showEditWidget, setShowEditWidget] = useState(false);
  const [getHeader, setGetHeader] = useState<CourseHeader | null>(null);

  const [showEditGradeWidget, setShowEditGradeWidget] = useState(false);

  const [updateGrade] = useUpdateGradeMutation(); // Use the mutation



  const handleEditHeader = () => {
    setShowEditWidget(true);
    setGetHeader(headers?.[0] || null); // Safely assign headers?.[0], which could be undefined
  };

  
  const handleSaveHeader = async (updatedHeader: Partial<CourseHeader>) => {
    try {
      if (getHeader) {
        await updateCourseHeader({
          id: getHeader.id,
          headerData: updatedHeader,
        }).unwrap();
  
        alert("Header updated successfully!");
  
        // Automatically re-fetch the headers
        refetchHeaders(); // Call the RTK Query re-fetch function
        setShowEditWidget(false); // Close the widget after saving
      } else {
        console.error("No header selected for update.");
      }
    } catch (error) {
      console.error("Error updating header:", error);
      alert("Failed to update header.");
    }
  };
  
   // Handle subject click
   const handleSubjectClick = (subjectId: number) => {
    setSelectedSubjectId(subjectId);
  };

  const handleEditGrade = (grade: any) => {
    setShowEditGradeWidget(true);
    setGetHeader(headers?.[0] || null)
    setSelectedStudentGrade(grade); // Set the grade for the selected student
  }

  const handleSaveGrade = async (updatedGrade: any) => {
    if (selectedStudentGrade) {
      try {
        await updateGrade({
          studentId: selectedStudentGrade.student_id,
          subjectId: selectedSubjectId!,
          gradeData: updatedGrade,
        }).unwrap();
        console.log("Grade updated successfully");
        setShowEditGradeWidget(false); // Close the widget

        // Re-fetch grades to update the displayed list
        refetchGrade();
      } catch (error) {
        console.error("Error updating grade:", error);
        alert("Failed to update grade");
      }
    }
  };
  
  
  return (
    <div className='course-grade-component'>

        <TopBar />

        <div className='course-grade-body'>

            <SideBar />

            <div className='course-grade-content'>
           
               <div className='subject-name'>
                  {subjects?.map((subject) => (
                    <button key={subject.id} onClick={() => handleSubjectClick(subject.id)}>{subject.subject}</button>
                  ))}
                </div> 

                <div className='course-grade-table'>
                    <h1>Subject</h1>
                    <h1>Student Name</h1>
                    <h1>Picture</h1>
                    <h1>{headers?.[0]?.test1}</h1>
                    <h1>{headers?.[0]?.test2}</h1>
                    <h1>{headers?.[0]?.project}</h1>
                    <h1>{headers?.[0]?.assignment}</h1>
                    <h1>{headers?.[0]?.final_exam}</h1>
                    <h1>Average</h1>
                    <button onClick={handleEditHeader}>Edit</button>

                </div>


              {selectedSubjectId && studentGrades && studentGrades.length > 0 && (
                <div className='student-data'>   
                  {studentGrades.map((grade) => {
                    return (
                      <div key={grade.student_id} className='student-data-row'>
                        <h2>{grade.subject}</h2>
                        <h2>{grade.student_name}</h2>
                        <img src={grade.student_img || "N/A"} alt={grade.student_name} />
                        <h2>{grade.test1 || "N/A"}</h2>
                        <h2>{grade.test2 || "N/A"}</h2>
                        <h2>{grade.project || "N/A"}</h2>
                        <h2>{grade.assignment_grade || "N/A"}</h2>
                        <h2>{grade.final_exam || "N/A"}</h2>
                        <h2>{grade.avg_grade || "N/A"}</h2>
                        <button className='' onClick={() => handleEditGrade(grade)}>Edit</button>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>


            {showEditWidget  &&(
              <div className='header-overlay-widget'>
                <EditHeaderWidget 
                   onCancel={() => setShowEditWidget(false)}
                   onSave={handleSaveHeader}
                   headerData={getHeader || {}} // Pass the header data
                   />
              </div>
            )}

            {showEditGradeWidget && (
              <div className='edit-grade-overlay'>
                <EditGrade 
                  onCancel={() => setShowEditGradeWidget(false)}
                  headerNames={getHeader || {}}
                  grade={selectedStudentGrade} // Pass the selected student's grade
                  onSave={handleSaveGrade}
                />
              </div>
            )}


        </div>
        
    </div>
  )
}

export default CourseGrade


