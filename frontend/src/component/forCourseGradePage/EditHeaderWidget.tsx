import React, { useState } from 'react'
import "./CourseGrade.css"
import { CourseHeader } from '../../store/api/courseGradeApi';

interface EditStudentWidgetProps{
  onCancel: () => void;
  onSave: (updatedHeader: Partial<CourseHeader>) => void; // Callback for save action
  headerData: Partial<CourseHeader>; // Header data to pre-fill the inputs
}

const EditHeaderWidget: React.FC<EditStudentWidgetProps> = ({onCancel, onSave, headerData}) => {

  const [test1, setTest1] = useState(headerData.test1 || "");
  const [test2, setTest2] = useState(headerData.test2 || "");
  const [project, setProject] = useState(headerData.project || "");
  const [assignment, setAssignment] = useState(headerData.assignment || "");
  const [finalExam, setFinalExam] = useState(headerData.final_exam || "");

  const handleSave = () => {

    
    const headerObjectUpdated = {
      test1,
      test2,
      project,
      assignment,
      final_exam: finalExam
    }

    console.log("Save button clicked. Updated header:", headerObjectUpdated);
    onSave(headerObjectUpdated);
  }
  
  return (
    <div className='course_header_subject'>
            <input type='text' value={test1} onChange={(e) => setTest1(e.target.value)} className='test1'/>
            <input type='text' value={test2} className='test1' onChange={(e) => setTest2(e.target.value)}/>
            <input type='text' value={project} className='project' onChange={(e) => setProject(e.target.value)}/>
            <input type='text' value={assignment} className='assignment' onChange={(e) => setAssignment(e.target.value)}/>
            <input type='text' value={finalExam} className='final_exam' onChange={(e) => setFinalExam(e.target.value)}/>
            <div className='btn'>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={handleSave}>Save</button>
        </div>
    </div>
  )
}

export default EditHeaderWidget