import { createContext, useEffect, useState } from "react";
import {fetchCategories} from '../Service/CategoryService.js'
import { fetchItems } from "../Service/ItemService.js";

export const AppContext =  createContext(null)

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([])
    const [itemsData, setItemsData] = useState([])
    const [auth, setAuth] = useState({token: null, role: null})
    const [cartItems, setCartItems] = useState([])

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name)
        if(existingItem){
            setCartItems(cartItems.map(cartItem => cartItem.name === item.name ? {...cartItem, quanity: cartItem.quanity + 1} : cartItem))
        }else{
            setCartItems([...cartItems, {...item, quanity: 1}])
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId))
    }

    const updateQuantity = (itemId, newQuantity) => {
        console.log('Updating:', itemId, 'to quantity:', newQuantity);
        console.log('Current cart:', cartItems);
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        setCartItems(prevCartItems => 
            prevCartItems.map(item => 
                item.itemId === itemId ? {...item, quantity: newQuantity} : item
            )
        )
    }
    
    useEffect(() => {
        async function loadData(){
            if(localStorage.getItem('token') && localStorage.getItem('role')){
                setAuthData(
                    localStorage.getItem('token'),
                    localStorage.getItem('role')
                )
            }
            const response = await fetchCategories();
            const itemResponse = await fetchItems()
            setCategories(response.data) 
            setItemsData(itemResponse.data)
        }
        loadData()
    }, [])

    const setAuthData = (token, role) => {
        setAuth({token, role})
    }

    const clearCart = () => {
        setCartItems([])
    }
    
    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart
    }
    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}

