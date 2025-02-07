import React, { useState } from 'react'
import "./EditGrade.css"
import { CourseHeader } from '../../store/api/courseGradeApi';


interface EditGradeProps{
    onCancel: () => void;
    headerNames: Partial<CourseHeader> | null;
    grade: {
        student_name: string;
        subject: string;
        test1?: number;
        test2?: number;
        project?: number;
        assignment_grade?: number;
        final_exam?: number;
    } | null;
    onSave: (updatedGrade: any) => void; // Callback to handle saving
}

const EditGrade: React.FC<EditGradeProps> = ({ onCancel, headerNames, grade, onSave }) => {
    const [test1, setTest1] = useState<number | undefined>(grade?.test1 ?? undefined);
    const [test2, setTest2] = useState<number | undefined>(grade?.test2 ?? undefined);
    const [project, setProject] = useState<number | undefined>(grade?.project ?? undefined);
    const [assignment_grade, setAssignmentGrade] = useState<number | undefined>(grade?.assignment_grade ?? undefined);
    const [final_exam, setFinalExam] = useState<number | undefined>(grade?.final_exam ?? undefined);
    
    const handleSave = () => {
        // Pass updated grades back to the parent component
        onSave({
          test1: test1 ?? null,
          test2: test2 ?? null,
          project: project ?? null,
          assignment_grade: assignment_grade ?? null,
          final_exam: final_exam ?? null,
        });
      };

  return (
    <div className='edit-grade-widget'>

              
              <h1 className='edit-grade-widget-header'>Edit Course Grade</h1>
              <h2 className='h2-span-parent'>Student Name: <span>{grade?.student_name}</span></h2>
              <h2 className='h2-span-parent'>Subject Name: <span>{grade?.subject}</span></h2>

              <div className='edit-grade-widget-items'>

                  <div className=''>
                    <h1>{headerNames?.test1}</h1>
                    <input 
                    type="number" 
                    className=''  
                    onChange={(e) => setTest1(parseFloat(e.target.value))}
                    value={test1}/>
                  </div>

                  <div className=''>
                    <h1>{headerNames?.test2}</h1>
                    <input 
                    type="number" 
                    className=''
                    onChange={(e) => setTest2(parseFloat(e.target.value))}
                    value={test2}
                    />
                  </div>

                  <div className=''>
                    <h1>{headerNames?.project}</h1>
                    <input 
                        type="number" 
                        className=''
                        onChange={(e) => setProject(parseFloat(e.target.value))}
                        value={project}
                        />
                  </div>

                  <div className=''>
                    <h1>{headerNames?.assignment}</h1>
                    <input 
                        type="number" 
                        className=''
                        onChange={(e) => setAssignmentGrade(parseFloat(e.target.value))}
                        value={assignment_grade}
                        />
                  </div>

                  <div className=''>
                    <h1>{headerNames?.final_exam}</h1>
                    <input 
                        type="number" 
                        className=''
                        onChange={(e) => setFinalExam(parseFloat(e.target.value))}
                        value={final_exam}
                        />
                  </div>
              </div>

                <div className='edit-grade-widget-items-buttons'>
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={handleSave}>Update</button>
                </div>

              </div>
  )
}

export default EditGrade