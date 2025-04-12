import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeProduct, updateTempQuantity, applyTempUpdates } from "../../features/shoppingcart/cartSlice";

const Cart = () => {
  const { items: cartItems, tempItems, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateTempQuantity({ id, quantity }));
  };

  const handleApplyUpdates = (id) => {
    dispatch(applyTempUpdates({ id }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <>
      <div className="cart-page-container">
        {cartItems.length > 0 ? (
          <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt="product" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Price: {item.price}</p>
                  <div className="div">
                    <input
                      type="number"
                      min="1"
                      value={
                        tempItems.find((tempItem) => tempItem.id === item.id)
                          ? tempItems.find((tempItem) => tempItem.id === item.id).quantity
                          : item.quantity
                      }
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    />
                    <button onClick={() => handleApplyUpdates(item.id)}>Update</button>
                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total: {totalPrice}</h3>
              <button className="backtohome" onClick={() => navigate("/")}>
                Back to Shopping
              </button>
              <button className="BuyNow" onClick={() => navigate("/")}>
                Buy Now
              </button>
            </div>
          </div>
        ) : (
          "cart is empty"
        )}
      </div>
    </>
  );
};

export default Cart;
