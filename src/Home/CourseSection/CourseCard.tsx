import { useState } from "react";
const CourseCard = ({ course }) => {
  // State to manage expanded description
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded); // Toggle the state on button click
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Course Image */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        {/* Course Title */}
        <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>

        {/* Course Description */}
        <p className="text-gray-600 mt-2">
          {isExpanded
            ? course.description
            : `${course.description.substring(0, 100)}...`}
        </p>

        {/* Toggle Button */}
        <button
          onClick={toggleDescription}
          className="text-blue-500 font-semibold mt-2 hover:underline focus:outline-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>

        {/* Course Price */}
        <div className="mt-4">
          <span className="text-blue-500 font-bold text-lg">
            ${course.price}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
