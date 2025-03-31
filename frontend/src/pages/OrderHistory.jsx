import React, { useState } from "react";
import Order from "../components/Order"; // Import the Order component
import { Link } from "react-router-dom";

const OrderHistory = () => {
    // Mock orders (replace with API data in real implementation)
    const [orders, setOrders] = useState([
        {
            id: 101,
            date: "20-03-2024",
            total: 120.50,
            status: "Completada",
            items: [
                { id: 1, name: "POP! Spider-Man", price: 30.00, quantity: 2 },
                { id: 2, name: "POP! Batman", price: 60.50, quantity: 1 },
            ],
        },
        {
            id: 102,
            date: "18-03-2024",
            total: 45.99,
            status: "Pendiente",
            items: [
                { id: 3, name: "POP! Iron Man", price: 45.99, quantity: 1 },
            ],
        },
    ]);

    return (
        <div className="container mt-4 d-flex">
            {/* Sidebar Menu */}
            <div className="col-md-3 p-3 border-end">
                <h4>Mi Cuenta</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/editProfile" className="text-decoration-none">Editar Perfil</Link>
                    </li>
                    <li className="list-group-item active">
                        <Link to="/orderHistory" className="text-decoration-none text-white">Historial de Órdenes</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/wishlist" className="text-decoration-none">Wishlist</Link>
                    </li>
                </ul>
            </div>
            <div className="col-md-9 p-3">
                <h2>Historial de compras</h2>
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
