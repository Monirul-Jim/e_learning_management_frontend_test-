import { motion } from 'framer-motion';
import { BookOpen, Search, Grid, List } from 'lucide-react';
import { useState } from 'react';

import { StudentViewCourseCard } from './StudentViewCourseCard';
import { useGetOrdersByEmailQuery } from "../../../redux/api/purchaseGetApi";
import { useAppSelector } from "../../../redux/feature/hooks";
import { type RootState } from "../../../redux/feature/store";
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';

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



export function StudentViewCourse() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
const filteredOrders: Order[] = (orders ?? []).filter(
  (order: Order) =>
    order.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.course.description.toLowerCase().includes(searchTerm.toLowerCase())
);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <BookOpen className="h-12 w-12 text-primary mb-4" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Loading Your Courses</h2>
            <p className="text-muted-foreground">Please wait while we fetch your learning materials...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-transparent to-destructive/10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="max-w-md mx-auto bg-card/50 backdrop-blur-sm border-destructive/20">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">⚠️</div>
                <h2 className="text-2xl font-semibold text-destructive mb-4">Error Loading Courses</h2>
                <p className="text-muted-foreground mb-6">
                  We encountered an issue while fetching your courses. Please try refreshing the page.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  Refresh Page
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                My Learning Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Continue your learning journey • {filteredOrders.length} course{filteredOrders.length !== 1 ? 's' : ''} enrolled
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Courses', value: orders?.length || 0, icon: '📚', color: 'from-blue-500 to-blue-600' },
              { label: 'Hours Learned', value: '24+', icon: '⏱️', color: 'from-green-500 to-green-600' },
              { label: 'Certificates', value: '3', icon: '🏆', color: 'from-purple-500 to-purple-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg text-white text-xl`}>
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {filteredOrders.length} results
                  </Badge>
                  
                  <div className="flex rounded-lg bg-muted/20 p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="h-8 w-8 p-0"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Courses Grid */}
        {filteredOrders.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}
          >
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StudentViewCourseCard order={order} viewMode={viewMode} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-16"
          >
            <Card className="max-w-md mx-auto bg-card/30 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm 
                    ? `No courses match "${searchTerm}". Try a different search term.`
                    : "You haven't enrolled in any courses yet. Start your learning journey today!"
                  }
                </p>
                {!searchTerm && (
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <a href="/courses">Browse Courses</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
// import StudentViewCourseCard from "./StudentViewCourseCard";
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

// const StudentViewCourse = () => {
//   const user = useAppSelector((state: RootState) => state.auth.user);
//   const {
//     data: orders,
//     error,
//     isLoading,
//   } = useGetOrdersByEmailQuery(user?.email);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching orders</div>;
//   }

//   return (
//     <div className="container mx-auto py-6">
//       <h1 className="text-2xl font-bold mb-6">Your Courses</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {orders && orders?.length > 0 ? (
//           orders?.map((order: Order) => (
//             <StudentViewCourseCard key={order.id} order={order} />
//           ))
//         ) : (
//           <div className="col-span-3 text-center text-gray-500">
//             No orders found for this user.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentViewCourse;
