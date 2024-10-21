const StudentViewCourseCard = ({ order }) => {
  return (
    <div className="flex flex-col justify-between bg-white shadow-lg rounded-lg p-6 h-full">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {order?.course?.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {order?.course?.description.length > 100
            ? `${order?.course?.description.substring(0, 100)}...`
            : order?.course?.description}
        </p>
      </div>
      <div className="mt-auto">
        <a href={`/dashboard/see-class/${order?.course?.id}`}>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
            See Course
          </button>
        </a>
      </div>
    </div>
  );
};

export default StudentViewCourseCard;
