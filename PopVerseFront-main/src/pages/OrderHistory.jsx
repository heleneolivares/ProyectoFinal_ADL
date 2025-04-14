import React, { useState, useEffect, useContext } from "react";
import Order from "../components/Order";
import SidebarAccount from "../components/SidebarAccount";
import { UserContext } from "../context/UserContext";
import { api } from "../services/api";

const OrderHistory = ({ darkMode }) => {
  const { token } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          setError("No estás autenticada. Inicia sesión.");
          setLoading(false);
          return;
        }

        const response = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("ORDENES:", response.data); 

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Hubo un error al cargar tus órdenes.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="container mt-4 d-flex">
      <SidebarAccount activePage="orderHistory" darkMode={darkMode} />

      <div className="col-md-9 p-3">
        <h1>Historial de compras</h1>

        {loading ? (
          <p>Cargando órdenes...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : orders.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {orders.map((order) => (
              <Order key={order.id} order={order} darkMode={darkMode}/>
            ))}
          </div>
        ) : (
          <p>No hay compras realizadas.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
