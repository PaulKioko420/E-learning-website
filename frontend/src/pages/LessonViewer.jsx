import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useParams } from 'react-router-dom'

export default function LessonViewer(){
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  useEffect(()=>{
    api.get(`/courses/${courseId}`).then(res => {
      const c = res.data.course;
      const l = c.lessons.find(x => x._id === lessonId);
      setLesson(l);
    }).catch(console.error);
  },[courseId, lessonId]);

  if (!lesson) return <div>Loading...</div>;
  return (
    <div style={{ padding: 16 }}>
      <h3>{lesson.title}</h3>
      {lesson.videoUrl && (
        <video controls style={{ width: '100%' }} src={lesson.videoUrl}></video>
      )}
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
    </div>
  )
}
