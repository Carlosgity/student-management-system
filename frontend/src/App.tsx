import React from 'react';
import LoginPage from './component/LoginPage';
import { Provider } from'react-redux' 
import './App.css';
import { store } from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentPage from './component/forStudentPage/StudentPage';
import { MdPerson3 } from "react-icons/md";
import GradePage from './component/forGrade/GradePage';
import CourseGrade from './component/forCourseGradePage/CourseGrade';


// const students = [
//   {
//     studentPic: < MdPerson3 />, 
//     firstName: 'Rohan',
//     lastName: 'Brown',
//     age: 11,
//     parent1: 'Albert Brown',
//     parent2: 'Stacy Brown',
//     homeAddress: 'Gulpy Bay',
//     contact: '876-345-9632',
//   },
//   {
//     studentPic: < MdPerson3 />,
//     firstName: 'Ella',
//     lastName: 'Smith',
//     age: 10,
//     parent1: 'John Smith',
//     parent2: 'Emma Smith',
//     homeAddress: 'Gulpy Bay',
//     contact: '876-345-9632',
//   },
//   // Add more student data as needed
// ];

// const grades = [
//   {
//     studentName: "Rohan Brown",
//     mathematics: 95,
//     science: 88,
//     english: 92,
//     socialStudies: 85,
//     physicalEducation: 90,
//     religiousEducation: 90,
//     average: 90,

//   },
//   {
//     studentName: "Rohan Brown",
//     mathematics: 95,
//     science: 88,
//     english: 92,
//     socialStudies: 85,
//     physicalEducation: 90,
//     religiousEducation: 90,
//     average: 90,

//   },
//   {
//     studentName: "Rohan Brown",
//     mathematics: 95,
//     science: 88,
//     english: 92,
//     socialStudies: 85,
//     physicalEducation: 90,
//     religiousEducation: 90,
//     average: 90,

//   }
// ]

const courseGradeData = [

  {
    subject: "Mathematics",
    "picture": < MdPerson3 />,
    name: "Rohan Brown",
    test1: 89,
    test2: 92,
    project: 94,
    assignment: 93,
    final: 90,
    average: 91
  },

  {
    subject: "Mathematics",
    "picture": < MdPerson3 />,
    name: "Errol Green",
    test1: 79,
    test2: 92,
    project: 94,
    assignment: 93,
    final: 98,
    average: 96
  }
]

const courseGradeHeader = [
  "Subject",
  "picture",
  "Name",
  "Test 1",
  "Test 2",
  "Project",
  "Assignment",
  "Final",
  "Average"
]

function App() {
  return (
    <Provider store={store}>

      <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/studentpage" element={<StudentPage/>} /> 
              <Route path="/gradepage" element={<GradePage />} />

              <Route path='/coursegrade' element={<CourseGrade/>} />
            </Routes>
          </Router>
      </div>
    </Provider> 
  );
}

export default App;
