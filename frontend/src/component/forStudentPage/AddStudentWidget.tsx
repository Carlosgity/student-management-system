import React, { useState } from 'react'
import "./AddStudentWidget.css"
import { useAddStudentMutation } from '../../store/api/studentApi';
import { MdPerson3 } from "react-icons/md";
import { Navigate } from 'react-router-dom';

interface AddStudentWidgetProps{
  onCancel: () => void;
  onAddSuccess: () => void; // New prop for handling success
}

const AddStudentWidget: React.FC<AddStudentWidgetProps> = ( {onCancel, onAddSuccess}) => {


  const [addStudent] = useAddStudentMutation()

  const [studName, setStudName] = useState("");
  const [studAge, setStudAge] = useState<number | undefined>();
  const [studMothersName, setStudMothersName] = useState("");
  const [studFathersName, setStudFathersName] = useState("");
  const [studAddress, setStudAddress] = useState("");
  const [studContact, setStudContact] = useState("");
  const [studPicture, setStudPicture] = useState<File | null>(null);
  

  // Function to calculate age from DOB
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthDate = new Date(e.target.value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    setStudAge(age);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStudPicture(e.target.files[0]); // Store the selected file
    }
  };

  const handleAddStudent = async () => {
  // Step 1: Map local state variables to API properties
    // We are creating a new object called `addStudent` which aligns with the 
    // expected structure of the `Student` interface in `studentApi`.
    const newStudent = {
      student_name: studName,            // Map `studName` state to `student_name` property for the API
      student_age: studAge,              // Map `studAge` state to `student_age` property for the API
      s_parent_name: `${studMothersName}, ${studFathersName}`,  // Combine `studMothersName` and `studFathersName` into a single `s_parent_name` string for the API
      student_address: studAddress,      // Map `studAddress` state to `student_address` property for the API
      student_contact: studContact,      // Map `studContact` state to `student_contact` property for the API
      student_img: studPicture ? URL.createObjectURL(studPicture) : "", // Use empty string if no picture is uploaded
  };

    // Step 2: Try to call the `addStudent` mutation function with `formattedStudent`
    try {
      const result = await addStudent(newStudent); // Execute the mutation to send `formattedStudent` data to the backend API
      console.log('Student added successfully:', result); // Log success message and result if mutation is successful
      onAddSuccess();// Trigger success callback to refresh
    } catch (error) {
      console.error('Failed to add student:', error); // Log an error message if the mutation fails
      alert('Failed to add tenant. Please try again.');
    }

    
  }

  return (
    <div className='add-student-widget'>

      <div className='stud-name form-item'>
        <label>Enter Your Name</label>
        <input type='text' placeholder='Name' onChange={(e) => setStudName(e.target.value)}/>
      </div>

      <div className='stud-dob form-item'>
        <label>Enter Your DOB</label>
        <input type='date' placeholder='DOB' onChange={handleDateChange}/>
      </div>

        <div className='stud-mother-name form-item'>
          <label>Enter Mother's Name</label>
          <input type='text' placeholder='Mother Name' onChange={(e) => setStudMothersName(e.target.value)}/>
        </div>

        <div className='stud-father-name form-item'>
          <label>Enter father's Name</label>
          <input type='text' placeholder='father Name' onChange={(e) => setStudFathersName(e.target.value)}/>
        </div>


      <div className='stud-address form-item'>
        <label>Address</label>
        <input type='text' placeholder='Enter Address' onChange={(e) => setStudAddress(e.target.value)}/>
      </div>

      <div className='stud-contact form-item'>
        <label>Contact</label>
        <input type='text' placeholder='Enter Contact Number' onChange={(e) => setStudContact(e.target.value)}/>
      </div>

      <div className="image-upload">
        { /* Hidden file input for image upload */}
        <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange}/>

        {/* Clickable text that triggers the file input */}
        <label htmlFor="fileInput" className="upload-text">Click here to upload a picture</label>

        {/* Display the uploaded image */}
         {/* Display the uploaded image or fallback icon */}
         <div className="add-image-preview">
          {studPicture ? (
            <img src={URL.createObjectURL(studPicture)} alt="Student" width="100" />
          ) : (
            <MdPerson3 size={100} /> // Default icon if no picture uploaded
          )}
        </div>
    </div>
    
      <div className='widget-button'>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleAddStudent}>Add Student</button>
      </div>


    </div>
  )
}

export default AddStudentWidget