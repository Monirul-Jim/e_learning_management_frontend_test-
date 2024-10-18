// import { useGetCategoriesQuery } from "../../redux/api/categoryApi";
// import { useGetCoursesQuery } from "../../redux/api/courseApi";
// import CourseCard from "./CourseCard";

// const CourseSection = () => {
//   const {
//     data: categoryData,
//     isLoading: categoryLoading,
//     error: categoryError,
//   } = useGetCategoriesQuery(null);
//   const {
//     data: courseData,
//     isLoading: courseLoading,
//     error: courseError,
//   } = useGetCoursesQuery(null);

//   if (categoryLoading || courseLoading)
//     return <p className="text-center text-blue-500">Loading...</p>;
//   if (categoryError || courseError)
//     return <p className="text-center text-red-500">Error loading data</p>;

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-10">
//       {/* 25% Section - Menu (Categories) */}
//       <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-6 h-max sticky top-8">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Course Categories
//         </h1>
//         <ul className="space-y-4">
//           {categoryData?.data?.map((category) => (
//             <li
//               key={category.id}
//               className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md shadow-sm hover:bg-blue-200 transition duration-200"
//             >
//               {category.category}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* 75% Section - Main Content (Course Cards) */}
//       <div className="lg:col-span-3 bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Available Courses
//         </h1>

//         {/* Card Grid for Courses */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courseData?.data?.map((course) => (
//             <CourseCard key={course.id} course={course} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CourseSection;

import { useState } from "react";
import { useGetCategoriesQuery } from "../../redux/api/categoryApi";
import { useGetCoursesQuery } from "../../redux/api/courseApi";
import CourseCard from "./CourseCard";

const CourseSection = () => {
  const [selectedSlug, setSelectedSlug] = useState(null);
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery(null);
  const { data: courseData, isLoading: courseLoading } =
    useGetCoursesQuery(null);

  if (categoryLoading || courseLoading) return <p>Loading...</p>;

  const filteredCourses = selectedSlug
    ? courseData.data.filter((course) =>
        course.category_details.some(
          (category) => category.slug === selectedSlug
        )
      )
    : courseData.data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-10">
      <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-6 h-max sticky top-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Course Categories
        </h1>
        <ul className="space-y-4">
          {categoryData.data.map((category) => (
            <li key={category.id}>
              <button
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md shadow-sm hover:bg-blue-200 transition duration-200"
                onClick={() => setSelectedSlug(category.slug)}
              >
                {category.category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-3 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Available Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <p>No courses available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
