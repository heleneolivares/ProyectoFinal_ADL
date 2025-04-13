import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../assets/css/Login.css";

export default function Login({ darkMode }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/";

    const validationSchema = Yup.object({
        email: Yup.string().email("Email inválido").required("Email es requerido"),
        password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Contraseña es requerida"),
    });

    return (
        <div className={`d-flex justify-content-center align-items-center min-vh-100 px-3 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <div className={`w-100 w-md-75 w-lg-75 w-xl-50 p-4 rounded shadow-lg ${darkMode ? "bg-dark text-white" : "bg-white text-dark"}`}>

                <div className="row g-0 align-items-center">
                    <div className="col-md-6 d-none d-md-block text-center">
                        <img 
                            className="img-fluid" 
                            src="/login.png" 
                            alt="iron man" 
                            style={{ maxHeight: "380px", objectFit: "contain" }}
                        />
                    </div>

                    <div className="col-12 col-md-6 px-3 px-md-4">
                        <h2 className="text-center mb-4">PopVerse</h2>
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                const success = await login(values.email, values.password);
                                if (success) {
                                    navigate(from);
                                } else {
                                    alert("Credenciales inválidas");
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <Field type="email" name="email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <Field type="password" name="password" className="form-control" />
                                        <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100" 
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Iniciando sesión..." : "Login"}
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        <div className="text-center mt-3">
                            <p>
                                ¿No tienes cuenta? <a href="/register" className="text-primary">click aquí</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
