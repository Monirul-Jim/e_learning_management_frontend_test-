// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
// }

// interface Order {
//   id: string;
//   course: Course;
// }

// interface StudentViewCourseCardProps {
//   order: Order;
// }
// const StudentViewCourseCard = ({ order }: StudentViewCourseCardProps) => {
//   return (
//     <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto transform transition-all hover:scale-105 hover:shadow-xl">
//       {/* Image Section */}
//       <div className="relative h-48">
//         <img
//           src={order.course.image}
//           alt="Course Image"
//           className="w-full h-full object-cover rounded-t-lg"
//         />
//         <div className="absolute top-0 left-0 p-2 bg-gradient-to-t from-black via-transparent to-transparent w-full h-full"></div>
//       </div>

//       {/* Course Title and Description */}
//       <div className="p-4">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-2">
//           {order?.course?.title}
//         </h3>
//         <p className="text-gray-600 text-sm">
//           {order?.course?.description.length > 100
//             ? `${order?.course?.description.substring(0, 100)}...`
//             : order?.course?.description}
//         </p>
//       </div>

//       {/* Action Button */}
//       <div className="p-4 mt-auto bg-gray-50 rounded-b-lg">
//         <a href={`/dashboard/see-class/${order?.course?.id}`}>
//           <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
//             See Course
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default StudentViewCourseCard;
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, ArrowRight, Eye } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';

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

interface StudentViewCourseCardProps {
  order: Order;
  viewMode?: 'grid' | 'list';
}

export function StudentViewCourseCard({ order, viewMode = 'grid' }: StudentViewCourseCardProps) {
  const truncateDescription = (text: string, length: number = 100) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden group">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              {/* Image Section */}
              <div className="relative sm:w-64 h-48 sm:h-auto overflow-hidden">
                <img
                  src={order.course.image}
                  alt={order.course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div className="p-4 bg-primary/90 rounded-full">
                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                  </div>
                </motion.div>

                {/* Progress Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary/90 text-primary-foreground">
                    In Progress
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-3 line-clamp-2">
                      {order.course.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {order.course.description}
                    </p>

                    {/* Course Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>4.5 hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>12 lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>Progress: 60%</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-muted/20 rounded-full h-2 mr-4">
                      <div className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 group shrink-0"
                    >
                      <a href={`/dashboard/see-class/${order.course.id}`} className="flex items-center gap-2">
                        Continue
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden group h-full">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={order.course.image}
              alt={order.course.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
            
            {/* Play Button Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <div className="p-3 bg-primary/90 rounded-full">
                <Play className="h-6 w-6 text-primary-foreground ml-0.5" />
              </div>
            </motion.div>

            {/* Progress Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary/90 text-primary-foreground text-xs">
                60% Complete
              </Badge>
            </div>

            {/* Course Duration */}
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs">
                <Clock className="h-3 w-3 text-primary" />
                <span className="text-foreground">4.5 hours</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-3 line-clamp-2">
                {order.course.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {truncateDescription(order.course.description)}
              </p>

              {/* Course Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  <span>12 lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>Last viewed 2 days ago</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary font-medium">60%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  ></motion.div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              asChild
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 group"
            >
              <a href={`/dashboard/see-class/${order.course.id}`} className="flex items-center justify-center gap-2">
                Continue Learning
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}