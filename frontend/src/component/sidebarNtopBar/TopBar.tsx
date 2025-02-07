import React from 'react'
import { useGetStudentCountQuery } from '../../store/api/utilityApi'

const TopBar = () => {

    const {data: studentCount, refetch: refetchStudentCount} = useGetStudentCountQuery()


  return (

    <div>

    <div className='top-nav'>
        <div className='page-logo'>
          <img src='logo.png' alt='' />
          <h2>Student Management System</h2> {/* Title of the page */}
        </div>

        <div className='nav-items'>
          <div className='class-option'>
            <label>Class</label>
            <select className='classes'>
              <option value="" disabled>-- Select an Item --</option>
              <option className='all-class'>All</option>
              <option className='class-1'>class 1</option>
              <option className='class-2'>class 2</option>
              <option className='class-3'>class 3</option>
            </select>
          </div>

          <div className='highest-evg'>
            <h3>Highest Average: </h3>
            <span>95</span>
          </div>

          <div className='student-list'>
            <h3>Student’s List: </h3>
            <span>{studentCount?.count || 0}</span>
          </div>
        </div>
    </div>

    </div>
  )
}

export default TopBar