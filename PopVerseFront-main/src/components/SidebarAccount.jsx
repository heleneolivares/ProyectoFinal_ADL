import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SidebarAccount({ darkMode }) {
  const location = useLocation();

  const items = [
    { path: "/editProfile", label: "Editar Perfil" },
    { path: "/orderHistory", label: "Historial de Órdenes" },
    { path: "/wishlist", label: "Wishlist" },
  ];

  return (
    <div className={`col-md-3 p-3 border-end align-self-start rounded-3 shadow-sm ${darkMode ? "bg-dark text-white border-light" : "bg-white text-dark"}`}
    style={{height:"fit-content"}}>
      <h4>Mi Cuenta</h4>
      <ul className="list-group">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.path}
              className={`list-group-item ${
                isActive
                  ? "active text-white bg-primary border-primary"
                  : darkMode
                  ? "bg-dark text-white border-light"
                  : ""
              }`}
            >
              <Link
                to={item.path}
                className={`text-decoration-none ${isActive ? "text-white" : darkMode ? "text-white" : "text-dark"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
