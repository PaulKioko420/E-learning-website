import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import CourseCard from '../components/CourseCard'

export default function Courses(){
  const [courses, setCourses] = useState([]);
  useEffect(()=>{
    api.get('/courses').then(res => setCourses(res.data.courses)).catch(console.error);
  },[]);
  return (
    <div style={{ padding: 16 }}>
      <h2>All Courses</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {courses.map(c => <CourseCard key={c._id} course={c} />)}
      </div>
    </div>
  )
}
