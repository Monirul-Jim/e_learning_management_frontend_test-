const CourseTable = ({ course }) => {
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
        <button>Delete</button>
      </td>
    </tr>
  );
};

export default CourseTable;
