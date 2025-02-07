import React from 'react'
import { GrAchievement } from 'react-icons/gr'
import { IoIosSettings } from 'react-icons/io'
import { IoBook } from 'react-icons/io5'
import { MdPerson3 } from 'react-icons/md'
import { PiStudent } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import "./SideBar.css"


const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className='sidebar'>
          <div className='sidebar-top'>
            <MdPerson3 className='teacher-img' />
            <h3>Welcome, <span>Teacher</span></h3>
          </div>

          <div className='sidebar-items'>
            <div>
              <PiStudent />
              <h3 onClick={() => navigate('/studentpage')}>Student</h3>
            </div>
            <div onClick={() => navigate('/coursegrade')}>
              {/* <GrAchievement /> */}
              <h3>Grades</h3>
            </div>
            <div>
              <IoBook />
              <h3>Subject</h3>
            </div>
            <div>
              <IoIosSettings />
              <h3>Customize</h3>
            </div>
          </div>
        </div>
  )
}

export default SideBar