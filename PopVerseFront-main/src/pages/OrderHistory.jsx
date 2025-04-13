import React, { useState, useEffect, useContext } from "react";
import Order from "../components/Order";
import SidebarAccount from "../components/SidebarAccount"; 
import { UserContext } from "../context/UserContext";
import { api } from "../services/api";

const OrderHistory = ({ darkMode }) => {
    const { token } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mt-4 d-flex">
            <SidebarAccount activePage="orderHistory" darkMode={darkMode} />

            <div className="col-md-9 p-3">
                <h1>Historial de compras</h1>
                <div className="d-flex flex-column gap-3">
                    {orders.length > 0 ? (
                        orders.map((order) => <Order key={order.id} order={order} />)
                    ) : (
                        <p>No hay compras realizadas.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
