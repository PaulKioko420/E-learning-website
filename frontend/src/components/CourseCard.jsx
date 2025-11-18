import React from 'react'
import { Link } from 'react-router-dom'

export default function CourseCard({ course }){
  return (
    <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 6 }}>
      <img src={course.thumbnailUrl || 'https://via.placeholder.com/300x150'} alt="thumb" style={{ width: '100%', maxHeight: 150, objectFit: 'cover' }} />
      <h3><Link to={`/courses/${course._id}`}>{course.title}</Link></h3>
      <p>{course.description?.substring(0, 120)}...</p>
    </div>
  )
}
