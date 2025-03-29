import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../assets/css/Login.css";

export default function Login({ darkMode }) {
    // Validation Schema with Yup
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    return (
        <div className={`d-flex justify-content-center align-items-center min-vh-100 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <div className="container-md p-4 rounded shadow bg-white">
                
                {/* Image & Form Container */}
                <div className="d-flex flex-column flex-md-row align-items-center">
                    
                    {/* Image Section (Hidden on Mobile) */}
                    <div className="d-none d-md-block flex-shrink-0 me-4">
                        <img className="img-fluid" style={{ maxWidth: "660px" }} alt="iron man" src="/login.png" />
                    </div>

                    {/* Login Form (Always Visible) */}
                    <div className="flex-grow-1 w-100">
                        <h2 className="text-center mb-4">Pop Verse</h2>
                        <Formik
                            initialValues={{ email: "", password: "", rememberMe: false }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log("Form Submitted:", values);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="w-100">
                                    {/* Email Input */}
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <Field 
                                            type="email" 
                                            name="email" 
                                            className="form-control"
                                            placeholder="Enter your email"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                                    </div>

                                    {/* Password Input */}
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <Field 
                                            type="password" 
                                            name="password" 
                                            className="form-control"
                                            placeholder="Enter your password"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <label className="form-check-label">
                                            <Field type="checkbox" name="rememberMe" className="form-check-input me-2" />
                                            Remember Me
                                        </label>
                                        <a href="#" className="text-primary small">Forgot Password?</a>
                                    </div>

                                    {/* Login Button */}
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Logging in..." : "Login"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        {/* Link to Register */}
                        <div className="text-center mt-3">
                            <p>
                                If you are not registered, <a href="/register" className="text-primary">click here</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}