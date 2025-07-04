import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();

        // If backend sends: { success: true, data: [...] }
        setCourses(Array.isArray(data) ? data : data.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (!Array.isArray(courses)) return <p>Error loading courses.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-lg shadow-md p-4 w-full relative items-center justify-center hover:shadow-gray-500">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-40 w-full object-cover rounded"
          />
          <h2 className="text-xl font-bold mt-2">{course.title}</h2>
          <p className="text-gray-600">{course.description}</p>
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
