import React, { createContext, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [email, setEmail] = useState(null)
    const API_URL = import.meta.env.VITE_API_URL;

    const login = async(email, password) => {
        try {
            const response = await axios.post(API_URL+"/auth/login", { email, password })
            const { token, email: userEmail } = response.data
            setToken(token)
            setEmail(userEmail)
            return true
        }
        catch(error){
            return false
        }
    };

    const register = async(name, lastname, email, password, confirm) => {
        try{
            const response = await axios.post(API_URL+"/auth/register", {name, lastname, email, password, confirm})
            const { token, email: userEmail } = response.data
            setToken(token)
            setEmail(userEmail)
            return true
        }
        catch(error){
            alert("Error al registrar usuario: ", error)
            return false
        }
    };

    const getProfile = async () => {
        if(token){
            try{
                const response = await axios.post(API_URL+"/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                return response.data
            }
            catch(error){
                alert.error("Error al obtener perfil: ", error)
            }
        }
        return null
    };

    const logout = () => {
        setToken(null)
        setEmail(null)
    };

    return(
        <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
            { children }
        </UserContext.Provider>
    );
}