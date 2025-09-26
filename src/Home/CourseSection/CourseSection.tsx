import { motion } from 'framer-motion';
import { useState } from 'react';
import { BookOpen } from "lucide-react";
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { CourseCard } from "./CourseCard";
import { useGetCategoriesQuery } from "../../redux/api/categoryApi";
import { useGetCoursesQuery } from "../../redux/api/courseApi";

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
  duration?: string;
  rating?: number;
  category_details: Category[];
}

export function CourseSection() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const { data: categoryData, isLoading: categoryLoading } = useGetCategoriesQuery(null);
  const { data: courseData, isLoading: courseLoading } = useGetCoursesQuery(null);

  if (categoryLoading || courseLoading) return <p>Loading...</p>;

  const filteredCourses: Course[] | undefined = selectedSlug
    ? courseData?.data?.filter((course: Course) =>
        course.category_details.some(category => category.slug === selectedSlug)
      )
    : courseData?.data;

  return (
    <section id="courses" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Courses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover world-class courses taught by industry experts. From beginner to advanced, 
            we have something for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Course Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant={selectedSlug === null ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedSlug(null)}
                  >
                    All Courses
                  </Button>
                  {categoryData?.data?.map((category: Category) => (
                    <Button
                      key={category.id}
                      variant={selectedSlug === category.slug ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedSlug(category.slug)}
                    >
                      {category.category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-semibold">
                {selectedSlug 
                  ? `${categoryData?.data?.find((cat:Category) => cat.slug === selectedSlug)?.category} Courses`
                  : 'All Available Courses'
                }
              </h3>
              <p className="text-muted-foreground mt-2">
                {filteredCourses?.length} course{filteredCourses?.length !== 1 ? 's' : ''} available
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses && filteredCourses.length > 0 ? (
                filteredCourses.map((course: Course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground">Try selecting a different category.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// const CourseSection = () => {
//   const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

//   const { data: categoryData, isLoading: categoryLoading } =
//     useGetCategoriesQuery(null);
//   const { data: courseData, isLoading: courseLoading } =
//     useGetCoursesQuery(null);

//   if (categoryLoading || courseLoading) return <p>Loading...</p>;

//   const filteredCourses = selectedSlug
//     ? courseData.data.filter((course: Course) =>
//         course.category_details.some(
//           (category) => category.slug === selectedSlug
//         )
//       )
//     : courseData?.data;

//   return (
//     <div
//       className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-10 scroll-smooth"
//       id="course"
//     >
//       <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-6 h-max sticky top-8">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Course Categories
//         </h1>
//         <ul className="space-y-4">
//           {categoryData?.data?.map((category: Category) => (
//             <li key={category.id}>
//               <button
//                 className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md shadow-sm hover:bg-blue-200 transition duration-200"
//                 onClick={() => setSelectedSlug(category.slug)}
//               >
//                 {category.category}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="lg:col-span-3 bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Available Courses
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredCourses?.length > 0 ? (
//             filteredCourses?.map((course: Course) => (
//               <CourseCard key={course.id} course={course} />
//             ))
//           ) : (
//             <p>No courses available for this category.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseSection;
