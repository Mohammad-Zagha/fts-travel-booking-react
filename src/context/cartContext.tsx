import React, { createContext, useContext } from "react";
import type { RoomAvailability } from "../types/hotel_types";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export type CartRoomItem = RoomAvailability & {
  quantity: number;
  checkIn: Date;
  checkOut: Date;
};

type CartContextType = {
  cart: CartRoomItem[];
  addToCart: (item: CartRoomItem) => void;
  removeFromCart: (roomId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useLocalStorageState<CartRoomItem[]>("cart", []);

  const addToCart = (item: CartRoomItem) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.roomId === item.roomId
    );

    if (existingItem) {
      // If item already exists, increment quantity
      const updatedCart = cart.map((cartItem) =>
        cartItem.roomId === item.roomId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // If item doesn't exist, add it with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (roomId: number) => {
    const existingItem = cart.find((cartItem) => cartItem.roomId === roomId);

    if (existingItem && existingItem.quantity > 1) {
      // If quantity > 1, decrement quantity
      const updatedCart = cart.map((cartItem) =>
        cartItem.roomId === roomId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // If quantity is 1 or item doesn't exist, remove it completely
      const updatedCart = cart.filter((cartItem) => cartItem.roomId !== roomId);
      setCart(updatedCart);
    }
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
