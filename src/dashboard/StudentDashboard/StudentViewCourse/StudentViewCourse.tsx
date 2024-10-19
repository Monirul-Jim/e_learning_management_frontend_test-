import { useGetOrdersByEmailQuery } from "../../../redux/api/purchaseGetApi";
import { useAppSelector } from "../../../redux/feature/hooks";
import { RootState } from "../../../redux/feature/store";

const StudentViewCourse = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const {
    data: orders,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user.email);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching orders: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Your Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders && orders?.length > 0 ? (
          orders?.map((order) => (
            <div
              key={order.id}
              className="flex flex-col justify-between bg-white shadow-lg rounded-lg p-6 h-full"
            >
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
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                  See Course
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            No orders found for this user.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentViewCourse;
