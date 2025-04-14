import React from "react";

const Order = ({ order, darkMode }) => {
    const items = Array.isArray(order.items) ? order.items : [];

    return (
        <div className={`card mb-3 ${darkMode ? "bg-dark text-white border-light" : ""}`}>
            <div className="card-body">
                <h5 className="card-title">Orden #{order.id}</h5>
                <p><strong>Fecha:</strong> {order.date}</p>
                <p>
                    <strong>Total:</strong>{" "}
                    {new Intl.NumberFormat(navigator.language, {
                        style: "currency",
                        currency: "CLP",
                    }).format(order.total || 0)}
                </p>
                <p><strong>Estado:</strong> {order.status}</p>

                <h6>Items:</h6>
                {items.length > 0 ? (
                    <ul className={`list-group ${darkMode ? "bg-dark" : ""}`}>
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className={`list-group-item d-flex justify-content-between ${darkMode ? "bg-dark text-white border-light" : ""}`}
                            >
                                <span>{item.name}</span>
                                <span>
                                    {new Intl.NumberFormat(navigator.language, {
                                        style: "currency",
                                        currency: "CLP",
                                    }).format(item.price)} x {item.quantity}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">Esta orden no tiene productos.</p>
                )}
            </div>
        </div>
    );
};

export default Order;
