import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
                email: Yup.string().email("Email inválido").required("Requerido"),
                password: Yup.string().required("Requerido"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                const res = await api.post("/auth/login", values);
                localStorage.setItem("token", res.data.token);
                navigate("/profile");
                } catch (err) {
                setError("Credenciales incorrectas");
                }
                setSubmitting(false);
            }}
        >
        {({ isSubmitting }) => (
            <Form className="p-4">
                <Field type="email" name="email" placeholder="Email" className="border p-2 w-full" />
                <ErrorMessage name="email" component="div" className="text-red-500" />

                <Field type="password" name="password" placeholder="Contraseña" className="border p-2 w-full mt-2" />
                <ErrorMessage name="password" component="div" className="text-red-500" />

                <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white p-2 mt-2">
                    Iniciar sesión
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </Form>
        )}
        </Formik>
    );
};

export default Login;