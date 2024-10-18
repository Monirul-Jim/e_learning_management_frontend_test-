// import { useState } from "react";
// import { useAppDispatch } from "../../redux/feature/hooks";
// import { addToCart } from "../../redux/feature/cartSlice";
// import { toast } from "react-toastify";

// const CourseCard = ({ course }) => {
//   const dispatch = useAppDispatch();
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleDescription = () => {
//     setIsExpanded(!isExpanded);
//   };
//   const handleAddCourse = () => {
//     try {
//       dispatch(addToCart(course));
//       toast.success("Added Successfully");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//       <img
//         src={course.image}
//         alt={course.title}
//         className="w-full h-48 object-cover"
//       />

//       <div className="p-4">
//         <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>

//         <p className="text-gray-600 mt-2">
//           {isExpanded
//             ? course.description
//             : `${course.description.substring(0, 100)}...`}
//         </p>

//         <button
//           onClick={toggleDescription}
//           className="text-blue-500 font-semibold mt-2 hover:underline focus:outline-none"
//         >
//           {isExpanded ? "Read Less" : "Read More"}
//         </button>

//         <div className="mt-4">
//           <span className="text-blue-500 font-bold text-lg">
//             ${course.price}
//           </span>
//         </div>
//         <div className="flex flex-wrap gap-2 mt-2">
//           {course.category_details?.map((category) => (
//             <span
//               key={category.id}
//               className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-lg"
//             >
//               {category.category}
//             </span>
//           ))}
//         </div>

//         <button
//           onClick={handleAddCourse}
//           className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/feature/hooks"; // Import useAppSelector
import { addToCart } from "../../redux/feature/cartSlice";
import { toast } from "react-toastify";

const CourseCard = ({ course }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items); // Get cart items from the Redux store
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddCourse = () => {
    const isCourseInCart = cartItems.some((item) => item.id === course.id);

    if (isCourseInCart) {
      toast.info(`'${course.title}' is already added to the cart`, {
        autoClose: 1000,
      });
    } else {
      try {
        dispatch(addToCart(course));
        toast.success(`'${course.title}' added to cart`, {
          autoClose: 1000,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>

        <p className="text-gray-600 mt-2">
          {isExpanded
            ? course.description
            : `${course.description.substring(0, 100)}...`}
        </p>

        <button
          onClick={toggleDescription}
          className="text-blue-500 font-semibold mt-2 hover:underline focus:outline-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>

        <div className="mt-4">
          <span className="text-blue-500 font-bold text-lg">
            ${course.price}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {course.category_details?.map((category) => (
            <span
              key={category.id}
              className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-lg"
            >
              {category.category}
            </span>
          ))}
        </div>

        <button
          onClick={handleAddCourse}
          className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
