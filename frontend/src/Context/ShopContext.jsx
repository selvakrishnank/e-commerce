import React, { createContext } from "react";
import all_product from "../Components/Assets/all_product"
import { useState } from "react";

export const ShopContext = createContext(null) 

const getdefaultCart = () => {
        let cart = {};
        for (let index = 1; index < all_product.length + 1; index++) {
            cart[index] = 0;
        }
        return cart;
    }

const ShopContextProvider = (props) => {
    
    const [cartItems, setCartItems] = useState(getdefaultCart());
    

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }))
    }
     
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }))
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.new_price;
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product, cartItems, setCartItems, addToCart, removeFromCart}

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;