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
import { clearCart, removeFromCart } from "../redux/feature/cartSlice";
import { RootState } from "../redux/feature/store";
import { usePurchaseOrderMutation } from "../redux/api/paymentApi";
const Cart = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [purchaseOrder, { isLoading, isSuccess, isError }] =
    usePurchaseOrderMutation();

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePurchase = async () => {
    try {
      const userData = {
        email: user.email, // Replace with actual user email
        first_name: user.first_name, // Replace with actual user first name
        last_name: user.last_name, // Replace with actual user last name
      };

      const orderData = {
        userData,
        courses: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
      };

      const response = await purchaseOrder(orderData).unwrap();
      window.location.href = response.url;
      dispatch(clearCart());
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // const orderData = {
  //   line_items: cartItems.map((item) => ({
  //     price: item.price, // Ensure cart items have price_id from Stripe
  //     quantity: item.quantity,
  //   })),
  //   totalAmount,
  // };

  // const handlePurchase = async () => {
  //   try {
  //     const response = await purchaseOrder(orderData).unwrap();
  //     window.location.href = response.url;
  //     dispatch(clearCart());
  //   } catch (error) {
  //     console.error("Error creating checkout session:", error);
  //   }
  // };
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
              <td>
                <button
                  onClick={handlePurchase}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Purchase"}
                </button>
                {isSuccess && <p>Redirecting to payment...</p>}
                {isError && <p>Error processing payment. Try again.</p>}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
