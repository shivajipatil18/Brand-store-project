import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity, removeProductFromCart } from "../../redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeProductFromCart(id));
  };

  return (
    <div className="container mx-auto py-12 md:px-16 lg:px-24">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4 p-4 border-b">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500">${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-gray-500">${item.totalPrice.toFixed(2)}</p>
                <button
                  className="ml-4 px-2 py-1 bg-red-600 text-white rounded"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-semibold">Total Quantity: {totalQuantity}</h3>
            <h3 className="text-xl font-semibold">Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <h2 className="text-2xl font-bold mb-6">Your cart is empty</h2>
          <p>Add some products to your cart.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;