import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
        calculateTotal(storedCart);
    }, []);

    const addToCart = (product) => {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex((item) => item.id === product.id);

        if (itemIndex > -1) {
            updatedCart[itemIndex].quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const calculateTotal = (cartItems) => {
        const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalAmount);
    };

    return (
        <CartContext.Provider value={{ cart, total, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}