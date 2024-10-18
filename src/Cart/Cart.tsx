// import { useAppSelector, useAppDispatch } from "../redux/feature/hooks";
// import { removeFromCart } from "../redux/feature/cartSlice";
// import { RootState } from "../redux/feature/store";

// const Cart = () => {
//   const cartItems = useAppSelector((state: RootState) => state.cart.items);
//   const dispatch = useAppDispatch();

//   const handleRemoveItem = (id: number) => {
//     dispatch(removeFromCart(id));
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Title</th>
//               <th className="py-2 px-4 border-b">Price</th>
//               <th className="py-2 px-4 border-b">Quantity</th>
//               <th className="py-2 px-4 border-b">Total</th>
//               <th className="py-2 px-4 border-b">Remove</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item) => (
//               <tr key={item.id}>
//                 <td className="py-2 px-4 border-b">{item.title}</td>
//                 <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
//                 <td className="py-2 px-4 border-b">{item.quantity}</td>
//                 <td className="py-2 px-4 border-b">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   <button
//                     onClick={() => handleRemoveItem(item.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Cart;

import { useAppSelector, useAppDispatch } from "../redux/feature/hooks";
import { removeFromCart } from "../redux/feature/cartSlice";
import { RootState } from "../redux/feature/store";
const Cart = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container h-screen mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.title}</td>
                <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {/* Footer row for the total amount */}
            <tr>
              <td
                colSpan={3}
                className="py-2 px-4 text-right font-semibold border-b"
              >
                Total Amount:
              </td>
              <td className="py-2 px-4 font-semibold border-b">
                ${totalAmount.toFixed(2)}
              </td>
              <td className="border-b"></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
