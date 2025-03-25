import React, { createContext, useState, useContext } from "react"

export const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const addItem = (product) => {
        const existingProduct = cartItems.find(item => item.id === product.id)
        if(existingProduct){
            setCartItems(prevItems =>
                prevItems.map(items =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1} : item
                )
            );
        }
        else{
            setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }])
        }
    };

    const delItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    };

    const clearCart = () =>{
        setCartItems([])
    };

    const value = {
        cartItems,
        addItem,
        delItem,
        getTotal,
        clearCart
    };

    return(
        <CartContext.Provider value={value}>
            { children }
        </CartContext.Provider>
    );
}