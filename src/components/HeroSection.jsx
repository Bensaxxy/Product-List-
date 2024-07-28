import React, { useState, useEffect } from "react";
import cart from "/icon-add-to-cart.svg";
import minus from "/icon-increment-quantity.svg";
import plus from "/icon-decrement-quantity.svg";
import Cart from "./Cart";
import Confimation from "./Confimation";
import Notification from "./Notification";
import items from "./ItemsData";

const HeroSection = () => {
  const [cartItems, setCartItems] = useState({});
  const [quantities, setQuantities] = useState({
    waffle: 0,
    cremeBrulee: 0,
    macaron: 0,
    tiramisu: 0,
    baklava: 0,
    pie: 0,
    cake: 0,
    brownie: 0,
    pannaCotta: 0,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {
    let timeout;
    if (notification.visible) {
      timeout = setTimeout(() => {
        setNotification({ visible: false, message: "" });
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [notification]);

  const addItemToCart = (itemId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: (prevCartItems[itemId] || 0) + 1,
    }));
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = { ...prevCartItems };
      delete updatedCart[itemId];
      return updatedCart;
    });
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: 0,
    }));
  };

  const handleAddToCart = (itemId) => {
    addItemToCart(itemId);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));
    const item = items.find((item) => item.id === itemId);
    setNotification({
      visible: true,
      message: `${item.name} has been added.`,
    });
  };

  const handleIncrement = (itemId) => {
    addItemToCart(itemId);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(prevQuantities[itemId] - 1, 0);
      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      };
    });

    setCartItems((prevCartItems) => {
      if (prevCartItems[itemId] === 1) {
        const updatedCart = { ...prevCartItems };
        delete updatedCart[itemId];
        return updatedCart;
      } else {
        return {
          ...prevCartItems,
          [itemId]: prevCartItems[itemId] - 1,
        };
      }
    });
  };

  const getCartTotal = () => {
    const prices = {
      waffle: 6.5,
      cremeBrulee: 7.0,
      macaron: 8.0,
      tiramisu: 5.5,
      baklava: 4.0,
      pie: 5.0,
      cake: 4.5,
      brownie: 5.5,
      pannaCotta: 6.5,
    };
    return Object.keys(cartItems)
      .reduce((total, itemId) => {
        return total + (cartItems[itemId] * prices[itemId] || 0);
      }, 0)
      .toFixed(2);
  };

  const getOrderedItems = () => {
    const prices = {
      waffle: 6.5,
      cremeBrulee: 7.0,
      macaron: 8.0,
      tiramisu: 5.5,
      baklava: 4.0,
      pie: 5.0,
      cake: 4.5,
      brownie: 5.5,
      pannaCotta: 6.5,
    };

    return Object.entries(cartItems).map(([itemId, quantity]) => {
      const item = items.find((item) => item.id === itemId);
      return {
        id: itemId,
        name: item.name,
        image: item.bgImages.mobile, // Use the appropriate image for confirmation
        quantity,
        price: prices[itemId],
      };
    });
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleStartNewOrder = () => {
    setCartItems({});
    setQuantities({
      waffle: 0,
      cremeBrulee: 0,
      macaron: 0,
      tiramisu: 0,
      baklava: 0,
      pie: 0,
      cake: 0,
      brownie: 0,
      pannaCotta: 0,
    });
    setShowConfirmation(false);
  };

  const handleCloseNotification = () => {
    setNotification({ visible: false, message: "" });
  };

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold">Desserts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:col-span-3">
          {items.map((item) => (
            <div key={item.id}>
              <div
                className={`relative min-h-[250px] w-full rounded-lg bg-cover bg-center ${
                  cartItems[item.id] ? "border-2 border-primary" : ""
                }`}
                style={{
                  backgroundImage: `url('${item.bgImages.mobile}')`,
                }}
              >
                {quantities[item.id] === 0 ? (
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="flex items-center gap-2 absolute -bottom-5 left-1/2 -translate-x-1/2 hover:text-primary duration-300 font-semibold bg-white rounded-full border border-rose3 hover:border-primary px-2 py-3 w-full max-w-[180px] justify-center"
                  >
                    <img src={cart} className="w-[18px]" alt="Add to cart" />
                    Add to Cart
                  </button>
                ) : (
                  <div className="absolute px-1 py-1 justify-between -bottom-5 left-1/2 -translate-x-1/2 w-full max-w-[180px] bg-primary rounded-full flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="hover:text-primary duration-300 font-semibold px-3 py-2"
                    >
                      <img
                        src={plus}
                        className="border rounded-full w-5 h-5 border-rose4 p-1 hover:bg-white/20 duration-300"
                      />
                    </button>
                    <span className="font-semibold text-white px-4 py-2">
                      {quantities[item.id]}
                    </span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="hover:text-primary duration-300 font-semibold px-3 py-2"
                    >
                      <img
                        src={minus}
                        className="border rounded-full w-5 h-5 border-rose4 p-1 hover:bg-white/20 duration-300"
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-10">
                <p className="font-medium text-rose4 text-sm md:text-md">
                  {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                </p>
                <p className="font-bold text-black">{item.name}</p>
                <p className="font-semibold text-primary">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <Cart
          cartItems={cartItems}
          removeItemFromCart={removeItemFromCart}
          getCartTotal={getCartTotal}
          handleConfirmOrder={handleConfirmOrder}
        />
      </div>
      {showConfirmation && (
        <Confimation
          orderedItems={getOrderedItems()}
          totalCost={getCartTotal()}
          onClose={handleCloseConfirmation}
          onStartNewOrder={handleStartNewOrder}
        />
      )}
      {notification.visible && (
        <Notification
          message={notification.message}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default HeroSection;
