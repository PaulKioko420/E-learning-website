import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Profile(){
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  useEffect(()=>{
    api.get('/courses').then(res => {
      const my = res.data.courses.filter(c => c.instructor?._id === user.id || (user.enrolledCourses || []).includes(c._id));
      setEnrollments(my);
    }).catch(console.error);
  },[user]);
  return (
    <div style={{ padding: 16 }}>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <h3>My Courses / Enrollments</h3>
      <ul>
        {enrollments.map(c => <li key={c._id}>{c.title}</li>)}
      </ul>
    </div>
  )
}
