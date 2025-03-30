import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = () => {
    // Mocked user data (this should come from context or API in a real app)
    const [user, setUser] = useState({
        name: "John",
        lastname: "Doe",
        email: "johndoe@example.com",
        password: "password123",
    });

    const [formData, setFormData] = useState({ ...user });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Data:", formData);
        // Here, you would send the data to your backend or update the global state
    };

    return (
        <div className="container mt-4 d-flex">
            {/* Sidebar Menu */}
            <div className="col-md-3 p-3 border-end">
                <h4>Mi Cuenta</h4>
                <ul className="list-group">
                    <li className="list-group-item active">
                        <Link to="/editProfile" className="text-decoration-none text-white">Editar Perfil</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/orderHistory" className="text-decoration-none">Historial de Órdenes</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/wishlist" className="text-decoration-none">Wishlist</Link>
                    </li>
                </ul>
            </div>
            <div className="col-md-9 p-3">
                <h2>Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            placeholder={user.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            value={formData.lastname}
                            placeholder={user.lastname}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            placeholder={user.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            placeholder="********"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
