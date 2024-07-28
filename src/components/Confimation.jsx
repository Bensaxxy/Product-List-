import React from "react";
import { motion } from "framer-motion";
import confirmationImage from "/icon-order-confirmed.svg";

const Confimation = ({ orderedItems, totalCost, onClose, onStartNewOrder }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full p-4 rounded-lg relative max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full  hover:bg-gray-200"
        >
          &times;
        </button>
        <img className="my-6" src={confirmationImage} alt="Order Confirmed" />
        <h1 className="text-5xl font-bold text-rose6">Order Confirmed</h1>
        <p className="text-rose5 font-semibold mt-3 mb-6">
          We hope you enjoy your food!
        </p>
        <div className="bg-rose2 py-4 px-4 rounded-lg">
          {orderedItems.length === 0 ? (
            <p className="text-center text-rose5">No items to display</p>
          ) : (
            orderedItems.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-6 items-center">
                    <img
                      className="rounded-md w-full max-w-[60px]"
                      src={item.image}
                      alt={item.name}
                    />
                    <div>
                      <h1 className="font-semibold text-rose6">{item.name}</h1>
                      <div className="flex items-center gap-4">
                        <p className="text-primary font-bold">
                          {item.quantity}x
                        </p>
                        <p className="text-rose5">@${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-rose6 font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <hr className="border border-rose3/10 my-4" />
              </div>
            ))
          )}
          <div className="flex justify-between items-center my-8">
            <p className="text-rose5 text-md">Order Total</p>
            <h1 className="font-bold text-2xl">${totalCost}</h1>
          </div>
        </div>
        <button
          onClick={onStartNewOrder}
          className="py-3 my-6 bg-primary w-full rounded-full text-white font-normal hover:bg-primary/90 duration-500"
        >
          Start New Order
        </button>
      </motion.div>
    </div>
  );
};

export default Confimation;
