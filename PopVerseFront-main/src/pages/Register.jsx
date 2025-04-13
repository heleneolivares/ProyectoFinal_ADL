import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "../services/api";

import "../assets/css/Register.css";

export default function Register({ darkMode }) {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            await api.post("/auth/register", values);
            alert("Usuario registrado exitosamente");
            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Nombre es requerido"),
        email: Yup.string().email("Email inválido").required("Email es requerido"),
        password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Contraseña es requerida"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
            .required("Confirmar contraseña es requerido"),
    });

    return (
        <div className={`d-flex justify-content-center align-items-center min-vh-100 px-3 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <div className={`w-100 w-md-75 w-lg-75 w-xl-50 p-4 rounded shadow-lg ${darkMode ? "bg-dark text-white" : "bg-white text-dark"}`}>
                <div className="row g-0 align-items-center">
                    <div className="col-md-6 d-none d-md-block text-center">
                        <img
                            className="img-fluid"
                            src="/login.png"
                            alt="registro"
                            style={{ maxHeight: "380px", objectFit: "contain" }}
                        />
                    </div>


                    <div className="col-12 col-md-6 px-3 px-md-4">
                        <h2 className="text-center mb-4">Crea tu Cuenta</h2>
                        <Formik
                            initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                handleSubmit(values);
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Ingresa tu nombre"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Ingresa tu email"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Ingresa tu contraseña"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Confirmar Contraseña</label>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            className="form-control"
                                            placeholder="Confirma tu contraseña"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger small mt-1" />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Registrando..." : "Registrar"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
