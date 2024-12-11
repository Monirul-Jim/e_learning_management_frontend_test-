const StudentViewCourseCard = ({ order }) => {
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto transform transition-all hover:scale-105 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={order.course.image}
          alt="Course Image"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute top-0 left-0 p-2 bg-gradient-to-t from-black via-transparent to-transparent w-full h-full"></div>
      </div>

      {/* Course Title and Description */}
      <div className="p-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {order?.course?.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {order?.course?.description.length > 100
            ? `${order?.course?.description.substring(0, 100)}...`
            : order?.course?.description}
        </p>
      </div>

      {/* Action Button */}
      <div className="p-4 mt-auto bg-gray-50 rounded-b-lg">
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
