import { useState } from "react";
import { useGetCategoriesQuery } from "../../redux/api/categoryApi";
import { useGetCoursesQuery } from "../../redux/api/courseApi";
import CourseCard from "./CourseCard";
// Category type
interface Category {
  id: number;
  category: string;
  slug: string;
}

// Course type
interface Course {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  category_details: Category[];
}

const CourseSection = () => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery(null);
  const { data: courseData, isLoading: courseLoading } =
    useGetCoursesQuery(null);

  if (categoryLoading || courseLoading) return <p>Loading...</p>;

  const filteredCourses = selectedSlug
    ? courseData.data.filter((course: Course) =>
        course.category_details.some(
          (category) => category.slug === selectedSlug
        )
      )
    : courseData?.data;

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-10 scroll-smooth"
      id="course"
    >
      <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-6 h-max sticky top-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Course Categories
        </h1>
        <ul className="space-y-4">
          {categoryData?.data?.map((category: Category) => (
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
          {filteredCourses?.length > 0 ? (
            filteredCourses?.map((course: Course) => (
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
