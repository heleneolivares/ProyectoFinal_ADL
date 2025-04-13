import React, { useState, useEffect, useContext } from "react";
import SidebarAccount from "../components/SidebarAccount.jsx";
import { UserContext } from "../context/UserContext";
import { api } from "../services/api";

const EditProfile = ({ darkMode }) => {
    const { token } = useContext(UserContext);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const userData = async () => {
            try {
                const response = await api.get("/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        userData();
    }, []);

    // Prevenir errores si el token se actualiza
    useEffect(() => {
        if (token) {
            setFormData((prev) => ({ ...prev }));
        }
    }, [token]);

    // Manejo de cambios
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/users/${formData.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFormData(response.data);
            alert("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="container mt-4 d-flex">
            <SidebarAccount darkMode={darkMode} />

            <div className="col-md-9 p-3">
                <h2>Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
