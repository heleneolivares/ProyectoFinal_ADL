import React from "react";

const Order = ({ order }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Order #{order.id}</h5>
                <p><strong>Date:</strong> {order.date}</p>
                <p>
                    <strong>Total:</strong>
                    {new Intl.NumberFormat(navigator.language, {
                            style: "currency",
                            currency: "CLP",
                    }).format(order.total)}
                </p>
                
                <p><strong>Status:</strong> {order.status}</p>

                <h6>Items:</h6>
                <ul className="list-group">
                    {order.items.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between">
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
            </div>
        </div>
    );
};

export default Order;
