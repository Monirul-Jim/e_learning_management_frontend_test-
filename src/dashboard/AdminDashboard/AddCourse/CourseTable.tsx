import { toast } from "react-toastify";
import { useDeleteCourseMutation } from "../../../redux/api/courseApi";

const CourseTable = ({ course }) => {
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
  return (
    <tr key={course.id} className="border-b  hover:bg-gray-100">
      <td className="py-3 px-6">{course?.title}</td>
      <td className="py-3 px-6">{course?.description}</td>
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
