export default function CourseCard({ course, onViewDetails }) {
  return (
    <div className=" rounded-b-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden ">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 ">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{course.title}</h2>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{course.description}</p>

        <div className="text-sm text-gray-500 mb-2">
          <p><strong>Instructor:</strong> {course.instructor}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-bold">{course.price}</span>
          <button
            onClick={() => onViewDetails(course.id)}
            className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
