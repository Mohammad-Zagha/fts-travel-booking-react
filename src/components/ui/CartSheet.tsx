import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../shadcn/Sheet";
import { ShoppingCart, Calendar, Users, Trash2 } from "lucide-react";
import { useCart } from "../../context/cartContext";
import { Button } from "./Button";
import { formatDate } from "../../lib/utils";
import { Link } from "react-router";

const CartSheet = () => {
  const [open, setOpen] = useState(false);
  const { cart, removeFromCart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const calculateNights = (checkIn: Date, checkOut: Date) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0; // handle invalid dates

    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md backdrop-saturate-150 shadow-sm hover:bg-black/30 transition-colors">
          <ShoppingCart className="w-5 h-5 text-white" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount > 99 ? "99+" : cartItemCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className=" p-2 flex flex-col  ">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold  text-primary ">Your Cart</h2>
              <p className="text-sm text-slate-500">
                {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Your cart is empty
              </h3>
              <p className="text-slate-500 text-sm">
                Add some rooms to get started
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.roomId}
                className="group relative bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-slate-300/50"
              >
                {/* Room Image and Basic Info */}
                <div className="flex gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={item.roomPhotoUrl}
                      alt={item.roomType}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-slate-800 text-lg truncate">
                        {item.roomType}
                      </h3>
                      <Button
                        variant={"ghost"}
                        onClick={() => removeFromCart(item.roomId)}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center "
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      Room {item.roomNumber}
                    </p>
                    <div className="flex items-center text-sm text-slate-500">
                      <Users className="w-4 h-4 mr-1" />
                      {item.capacityOfAdults} adults, {item.capacityOfChildren}{" "}
                      children
                    </div>
                  </div>
                </div>

                {/* Check-in/Check-out Dates */}
                {(item.checkIn || item.checkOut) && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-100/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="flex items-center text-xs font-medium text-slate-600 mb-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            Check-in
                          </div>
                          <div className="text-sm font-bold text-slate-800">
                            {formatDate(item.checkIn)}
                          </div>
                        </div>
                        <div className="w-8 h-px bg-gradient-to-r from-blue-300 to-purple-300" />
                        <div className="text-center">
                          <div className="flex items-center text-xs font-medium text-slate-600 mb-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            Check-out
                          </div>
                          <div className="text-sm font-bold text-slate-800">
                            {formatDate(item.checkOut)}
                          </div>
                        </div>
                      </div>
                      {item.checkIn && item.checkOut && (
                        <div className="text-center">
                          <div className="text-xs font-medium text-slate-600 mb-1">
                            Nights
                          </div>
                          <div className="text-sm font-bold text-primary">
                            {calculateNights(item.checkIn, item.checkOut)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Price and Quantity */}
                <div className="flex items-center justify-end">
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-500">
                      ${item.price}/night
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-200/50 bg-white/80 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 font-medium">Subtotal</span>
                <span className="text-lg font-bold text-slate-800">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                Taxes and fees will be calculated at checkout
              </div>
            </div>
            <Link
              onClick={() => setOpen(false)}
              to={"/checkout"}
              className="w-full h-12 text-sm bg-gradient-to-r from-accent to-primary text-white font-bold rounded-full flex items-center justify-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
