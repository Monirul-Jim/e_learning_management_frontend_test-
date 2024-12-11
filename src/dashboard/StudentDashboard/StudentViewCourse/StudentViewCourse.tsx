import { useGetOrdersByEmailQuery } from "../../../redux/api/purchaseGetApi";
import { useAppSelector } from "../../../redux/feature/hooks";
import { RootState } from "../../../redux/feature/store";
import StudentViewCourseCard from "./StudentViewCourseCard";
interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Order {
  id: string;
  course: Course;
}

const StudentViewCourse = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const {
    data: orders,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching orders</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Your Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders && orders?.length > 0 ? (
          orders?.map((order: Order) => (
            <StudentViewCourseCard key={order.id} order={order} />
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
