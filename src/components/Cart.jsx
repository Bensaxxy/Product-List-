import React from "react";
import removeItem from "/icon-remove-item.svg";
import carbonNeutral from "/icon-carbon-neutral.svg";
import emptyImg from "/illustration-empty-cart.svg";

const Cart = ({
  cartItems,
  removeItemFromCart,
  getCartTotal,
  handleConfirmOrder,
}) => {
  const getItemPrice = (itemId) => {
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
    return prices[itemId] || 0;
  };

  return (
    <div>
      <div className="rounded-lg py-4 px-4 bg-white">
        <h1 className="font-bold text-primary text-2xl">
          Your Cart ({Object.keys(cartItems).length})
        </h1>
        <div>
          {Object.keys(cartItems).length === 0 ? (
            <div className="flex flex-col items-center justify-center my-10">
              <img src={emptyImg} />
              <p className="text-rose4 font-semibold text-sm">
                Your added items will appear here
              </p>
            </div>
          ) : (
            <>
              {Object.entries(cartItems).map(([itemId, quantity]) => (
                <div key={itemId}>
                  <div className="flex justify-between items-center my-4">
                    <div>
                      <p className="text-sm font-medium">
                        {itemId.charAt(0).toUpperCase() + itemId.slice(1)}
                      </p>
                      <div className="flex gap-3 items-center text-[14px]">
                        <p className="text-primary font-bold">{quantity}x</p>
                        <p className="text-rose4">
                          @${getItemPrice(itemId).toFixed(2)}
                        </p>
                        <p className="text-rose4 font-semibold">
                          ${(getItemPrice(itemId) * quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => removeItemFromCart(itemId)}>
                      <img
                        className="p-1 rounded-full border border-rose4"
                        src={removeItem}
                        alt="Remove item"
                      />
                    </button>
                  </div>
                  <hr />
                </div>
              ))}

              <div className="flex justify-between items-center my-8">
                <p className="text-rose5 text-md">Order Total</p>
                <h1 className="font-bold text-2xl">${getCartTotal()}</h1>
              </div>
              <div className="py-4 px-2 rounded-lg bg-rose flex items-center mb-4 justify-center gap-2">
                <img src={carbonNeutral} />
                <p className="text-[14px] lg:text-[12px] font-semibold">
                  This is a <span className="font-bold"> Carbon-neutral </span>{" "}
                  delivery
                </p>
              </div>
              <button
                onClick={handleConfirmOrder}
                className="py-2 bg-primary w-full rounded-full text-white font-normal hover:bg-primary/90 duration-500"
              >
                Confirm Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
