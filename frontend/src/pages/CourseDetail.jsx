import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function CourseDetail(){
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useAuth();
  useEffect(()=>{
    api.get(`/courses/${id}`).then(res => setCourse(res.data.course)).catch(console.error);
  },[id]);

  if (!course) return <div>Loading...</div>;
  return (
    <div style={{ padding: 16 }}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Instructor: {course.instructor?.name}</p>
      <h3>Lessons</h3>
      <ul>
        {course.lessons.map(l => (
          <li key={l._id}>{l.title} {l.videoUrl ? '(video)' : ''}</li>
        ))}
      </ul>
      {!user && <p><a href="/login">Login</a> to mark progress and enroll.</p>}
    </div>
  )
}
