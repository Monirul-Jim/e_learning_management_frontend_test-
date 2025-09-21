import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/feature/hooks";
import { addToCart, type CartItem } from "../../redux/feature/cartSlice";
import { toast } from "react-toastify";
import { type RootState } from "../../redux/feature/store";

import { motion } from 'framer-motion';
import { Clock, Star, ShoppingCart, Play } from "lucide-react";
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

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

// CourseCard props
interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state: RootState) => state.auth.user);

  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle description
  const toggleDescription = () => setIsExpanded(!isExpanded);

  // Map Course to CartItem
  const mapCourseToCartItem = (course: Course): CartItem => ({
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price,
    image: course.image,
    quantity: 1,
  });

  // Add to cart handler
  const handleAddCourse = () => {
    if (!user) {
      toast.info("Please login to add courses to cart.", { autoClose: 1000 });
      return;
    }

    const cartItem = mapCourseToCartItem(course);
    const isCourseInCart = cartItems.some((item) => item.id === course.id);

    if (isCourseInCart) {
      toast.info(`'${course.title}' is already in your cart`, { autoClose: 1000 });
    } else {
      dispatch(addToCart(cartItem));
      toast.success(`'${course.title}' added to cart`, { autoClose: 1000 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden group">
        {/* Course Image */}
        <div className="relative overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              {course.category_details[0]?.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <motion.div 
              className="bg-card/90 backdrop-blur-sm p-2 rounded-full border border-border/50"
              whileHover={{ scale: 1.1 }}
            >
              <Play size={16} className="text-primary" />
            </motion.div>
          </div>
        </div>

        {/* Course Header */}
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {course.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {isExpanded ? course.description : `${course.description.substring(0, 100)}...`}
            <button
              onClick={toggleDescription}
              className="text-primary font-medium ml-2 hover:underline"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          </CardDescription>
        </CardHeader>

        {/* Course Stats */}
        <CardContent className="pb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {course.rating && (
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              )}
              {course.duration && (
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${course.price}</span>
          </div>
        </CardContent>

        {/* Add to Cart */}
        <CardFooter className="pt-3">
          <Button
            onClick={handleAddCourse}
            className="w-full group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
          >
            <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            {user ? "Add to Cart" : "Login to Add"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
