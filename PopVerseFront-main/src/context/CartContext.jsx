import React, { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
        calculateTotal(storedCart);
    }, []);

    const saveCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const addToCart = (product) => {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex((item) => item.id === product.id);

        if (itemIndex > -1) {
            updatedCart[itemIndex].quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        saveCart(updatedCart);
    };

    // ➖ Disminuir solo 1 unidad (pero no eliminar)
    const removeOneFromCart = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter((item) => item.quantity > 0);

        saveCart(updatedCart);
    };

    // ❌ Eliminar el producto completamente
    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        saveCart(updatedCart);
    };

    const calculateTotal = (cartItems) => {
        const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalAmount);
    };

    return (
        <CartContext.Provider
            value={{ cart, total, addToCart, removeOneFromCart, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
