import React from "react";

export default function Newsletter( darkMode ) {
    return (
        <div className="w-100 py-5" style={{ backgroundImage: `url('/newsletter-bg.png')`, backgroundSize: "cover", backgroundPosition: "center", }}>
            <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-center gap-4 px-3">
            {/* Imagen del Funko */}
                <div className="d-none d-lg-block">
                    <img src="/newsletter-funko.png" alt="Funko Newsletter" style={{ height: "200px", objectFit: "contain", transform: "scaleX(-1)" }}/>
                </div>

                {/* Contenido del formulario */}
                <div className={`bg-white rounded-4 shadow p-4 w-100`} style={{ maxWidth: "600px" }}>
                    <h2 className="text-center fw-bold mb-2" style={{ color: "#000" }}>NEWSLETTER</h2>
                    <p className="text-center text-muted small mb-4">
                        RECIBE INFORMACIÓN DE NUESTROS PRODUCTOS Y PROMOCIONES. <br />
                        SE EL PRIMERO EN ENTERARTE DE TODO.
                    </p>
                    <form className="d-flex">
                        <input type="email" className="form-control rounded-start" placeholder="Email *" required/>
                        <button type="submit" className="btn btn-primary rounded-end ms-2">
                            INSCRIBIRSE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}