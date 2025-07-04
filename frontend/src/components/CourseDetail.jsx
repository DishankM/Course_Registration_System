import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrationForm from './RegistrationForm';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(res => {
        setCourse(res.data.data || res.data); // ✅ updated line
      })
      .catch(() => navigate('/courses'));
  }, [id, navigate]);

  if (!course) return <p>Loading course details...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <button className="text-blue-600 mb-4" onClick={() => navigate('/courses')}>← Back</button>
      <img src={course.banner} className="w-full max-h-60 object-cover mb-4" alt="Course banner" />
      <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Price:</strong> {course.price}</p>
      <p className="mt-4">{course.description}</p>
      <h3 className="text-lg mt-4">Syllabus</h3>
      <ul className="list-disc pl-6">
        {Array.isArray(course.syllabus) && course.syllabus.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {!showForm ? (
        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => setShowForm(true)}>
          Register Now
        </button>
      ) : (
        <RegistrationForm courseId={course.id} onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
}
