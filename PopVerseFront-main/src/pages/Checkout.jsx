import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
    const { token } = useContext(UserContext)
    const { cart, total } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center">Checkout</h2>

            {cart.length === 0 ? (
                <div className="alert alert-warning text-center">Carro vacio</div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>
                                            {new Intl.NumberFormat(navigator.language, {
                                                style: "currency",
                                                currency: "CLP",
                                            }).format(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            {new Intl.NumberFormat(navigator.language, {
                                                style: "currency",
                                                currency: "CLP",
                                            }).format(item.price * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h4>Total: <span className="fw-bold">${total.toFixed(2)}</span></h4>
                        <button className="btn btn-success btn-lg">Pagar ahora</button>
                    </div>
                </>
            )}
        </div>
    );
}