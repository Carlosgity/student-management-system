import React, { useEffect, useState } from 'react'
import "./EditStudentWidget.css"
import { MdPerson3 } from "react-icons/md";

interface Student {
    id: number;
    student_name: string;
    student_age: number;
    s_parent_name: string;
    student_address: string;
    student_contact: string;
    student_img: string;
  }

interface EditStudentWidgetProps{
    onCancel: () => void;
    student: Student;          // The student data to edit
    onSave: (updatedStudent: Student) => void;
}


const EditStudentWidget: React.FC<EditStudentWidgetProps> = ({student, onCancel, onSave}) => {
    
  const [studName, setStudName] = useState(student.student_name);
  const [studAge, setStudAge] = useState(student.student_age);
  const [studMothersName, setStudMothersName] = useState("");
  const [studFathersName, setStudFathersName] = useState("");
  const [studAddress, setStudAddress] = useState(student.student_address);
  const [studContact, setStudContact] = useState(student.student_contact);
  const [studPicture, setStudPicture] = useState<File | null>(null);


  // Set initial values when the component loads
  useEffect(() => {
    const [motherName, fatherName] = student.s_parent_name.split(', ').map(name => name.trim());
    setStudMothersName(motherName || '');
    setStudFathersName(fatherName || '');
  }, [student]);


  const handleSave = () => {
    const updatedParentName = `${studMothersName}, ${studFathersName}`;
    onSave({
      ...student,
      student_name: studName,
      student_age: studAge,
      student_address: studAddress,
      student_contact: studContact,
      student_img: studPicture ? URL.createObjectURL(studPicture) : student.student_img,
      s_parent_name: updatedParentName
    });
  };

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

  return (
    <div className='edit-student-widget'>

      <div className='stud-name'>
        {/* <label>Enter Your Name</label> */}
        <input type='text' placeholder='Name' value={studName} onChange={(e) => setStudName(e.target.value)}/>
      </div>

      <div className='stud-dob'>
        {/* <label>Enter Your DOB</label> */}
        <input type='date' placeholder='DOB' onChange={handleDateChange}/>
      </div>

      <div className='stud-parent-name'>

        <div className='stud-mother-name'>
          {/* <label>Enter Mother's Name</label> */}
          <input type='text' placeholder='Mother Name' value={studMothersName} onChange={(e) => setStudMothersName(e.target.value)}/>
        </div>

        <div className='stud-father-name'>
          {/* <label>Enter father's Name</label> */}
          <input type='text' placeholder='father Name' value={studFathersName} onChange={(e) => setStudFathersName(e.target.value)}/>
        </div>

      </div>

      <div className='stud-address'>
        {/* <label>Address</label> */}
        <input type='text' placeholder='Enter Address' value={studAddress} onChange={(e) => setStudAddress(e.target.value)}/>
      </div>

      <div className='stud-contact'>
        {/* <label>Contact</label> */}
        <input type='text' placeholder='Enter Contact Number' value={studContact} onChange={(e) => setStudContact(e.target.value)}/>
      </div>

      <div className="image-preview-container">
        { /* Hidden file input for image upload */}
        <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange}/>

        {/* Clickable text that triggers the file input */}
        <label htmlFor="fileInput" className="upload-text">Click here to upload a picture</label>

        {/* Display the uploaded image */}
         {/* Display the uploaded image or fallback icon */}
         <div className="image-preview">
          {studPicture ? (
            <img src={URL.createObjectURL(studPicture)} alt="Student" width="100" />
          ) : (
            <MdPerson3 size={100} /> // Default icon if no picture uploaded
          )}
        </div>
    </div>
    
      <div className='widget-button'>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>


    </div>
  )
}

export default EditStudentWidget