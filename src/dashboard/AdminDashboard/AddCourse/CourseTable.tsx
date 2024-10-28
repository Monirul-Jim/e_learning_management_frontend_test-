import { toast } from "react-toastify";
import { useDeleteCourseMutation } from "../../../redux/api/courseApi";
import { useState } from "react";

const CourseTable = ({ course }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const handleCourseDelete = async (id: number) => {
    try {
      await deleteCourse(id).unwrap();
      toast.success("Successfully delete course");
    } catch (err) {
      console.error(err);
    }
  };
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <tr key={course.id} className="border-b  hover:bg-gray-100 ">
      <td className="py-3 px-6">{course?.title}</td>
      <td className="text-gray-600 mt-2">
        {isExpanded
          ? course.description
          : `${course.description.substring(0, 100)}...`}
        <button
          onClick={toggleDescription}
          className="text-blue-500 font-semibold mt-2 hover:underline focus:outline-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </td>

      <td className="py-3 px-6">${course?.price}</td>
      <td className="py-3 px-6">
        {course?.category_details?.map((category, index) => (
          <span key={category.id}>
            {category.category}
            {index < course.category_details.length - 1 && ", "}
          </span>
        ))}
      </td>
      <td>
        <button>
          <a href={`/dashboard/update-course/${course.id}`}>Update</a>
        </button>
      </td>
      <td>
        <button onClick={() => handleCourseDelete(course.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default CourseTable;
