import React, { useState } from 'react'
import "./StudentPage.css"
import { MdPerson3 } from "react-icons/md"; // Importing icons
import { PiStudent } from "react-icons/pi";
import { IoBook } from "react-icons/io5";
import { GrAchievement } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import AddStudentWidget from './AddStudentWidget';
import { useDeleteStudentMutation, useGetStudentsQuery, Student, useUpdateStudentMutation } from '../../store/api/studentApi';
import EditStudentWidget from './EditStudentWidget';
import { useGetStudentCountQuery } from '../../store/api/utilityApi';
import { useNavigate } from 'react-router-dom';
import TopBar from '../sidebarNtopBar/TopBar';
import SideBar from '../sidebarNtopBar/SideBar';

const StudentPage: React.FC = () => {

  const navigate = useNavigate(); // Hook for navigating to different routes

  const [ShowStudentWidget, setShowStudentWidget] = useState(false); // State to control the AddStudentWidget modal visibility

  const { data: studentsData = [], refetch } = useGetStudentsQuery(); // Fetching students data and a refetch function for refreshing data
  const {data: studentCount, refetch: refetchStudentCount } = useGetStudentCountQuery();  // Fetching student count and refetch function

  const [showEditWidget, setShowEditWidget] = useState(false); // State for EditStudentWidget modal visibility
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null); // Holds the currently selected student for editing

  const [deleteStudent] = useDeleteStudentMutation(); // Mutation to delete a student
  const [updateStudent] = useUpdateStudentMutation(); // Mutation to update a student

  const handleAddStudentClick = () => {
    setShowStudentWidget(true); // Opens the AddStudentWidget modal
  }

  // Renders the student image or a default icon if image is missing
  const renderStudentImage = (imageSrc: string | undefined) => {
    if (imageSrc) {
      return <img src={imageSrc} alt="Student" width="50" height="50" style={{ borderRadius: '50%' }} />;
    }
    return <MdPerson3 size={20} />;
  };

  // Function to delete a student, with error handling
  const handleDeleteStudentClick = async (id: number) => {
    try {
      await deleteStudent(id); // Attempt to delete the student
      refetch(); // Refresh the student list after deletion
      refetchStudentCount(); // Update count after deleting
    } catch (error) {
      console.error("Error deleting student:", error); // Log the error for debugging
      alert('Failed to delete student');
    }
  }

  // Opens the EditStudentWidget and sets the selected student
  const handleEditStudentClick = (student: Student) => {
    setShowEditWidget(true); // Show the edit widget
    setSelectedStudent(student); // Set the student to be edited
  }

  // Function to save the updated student details
  const handleSaveStudent = async (updatedStudent: Student) => {
    try {
      await updateStudent(updatedStudent); // Attempt to update the student
      refetch(); // Refresh the student list after update
      setShowEditWidget(false); // Close the edit widget after successful update
    } catch (error) {
      console.error("Error updating student:", error); // Log the error for debugging
      alert('Failed to update student');
    }
  };

  return (

    
    <div className='student-page'>
      <TopBar />


      <div className='student-sidebar-content'>

        <SideBar />

        <div className='student-body'>
          
          <div className='add-student'>
            <button onClick={handleAddStudentClick}>Add Student</button> {/* Button to open AddStudentWidget */}
          </div>

          <div className='student-table-container'>
            
            <div className='student-table'>
              <MdPerson3 />
              <h2>Name</h2>
              <h2>Age</h2>
              <h2>Parents Name</h2>
              <h2>Home Address</h2>
              <h2>Contact</h2>
            </div>

            <div className='student-row-table'>

            {/* Map over the students array to create a row for each student */}
              {studentsData.map((student, index) => (
                <div className='student-row' key={index}>
                  <div className='student-cell'>{renderStudentImage(student.student_img)}</div> {/* Displays student image */}
                  <div className='student-cell'>{student.student_name}</div> {/* Displays student name */}
                  <div className='student-cell'>{student.student_age}</div> {/* Displays student age */}
                  <div className='student-cell'>{student.s_parent_name}</div> {/* Displays parents' names */}
                  <div className='student-cell'>{student.student_address}</div> {/* Displays student address */}
                  <div className='student-cell'>{student.student_contact}</div> {/* Displays student contact */}

                  <div className='student-button-option'>
                    <button className='edit' onClick={() => handleEditStudentClick(student)}>Edit</button> {/* Edit button */}
                    <button className='remove' onClick={() => handleDeleteStudentClick(student.id!)}>Remove</button> {/* Remove button */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {ShowStudentWidget && (
        <div className='student-widget-overlay'>
          <AddStudentWidget
            onCancel={() => setShowStudentWidget(false)} // Closes AddStudentWidget on cancel
            onAddSuccess={() => {
              refetch(); // Refreshes student list on success
              setShowStudentWidget(false); // Closes AddStudentWidget
              refetchStudentCount(); // Refresh the student count on success
            }}
          />
        </div>
      )}

      {showEditWidget && selectedStudent && (
        <div className='student-widget-overlay'>
          <EditStudentWidget
            student={selectedStudent} // Passes selected student for editing
            onCancel={() => setShowEditWidget(false)} // Closes EditStudentWidget on cancel
            onSave={handleSaveStudent} // Saves updated student details
          />
        </div>
      )}
    </div>
  )
}

export default StudentPage
