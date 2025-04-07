-- Crear la base de datos
CREATE DATABASE funko_marketplace;
\c funko_marketplace; -- Conectarse a la base de datos

-- Tabla de Usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Tags (Etiquetas de productos)
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla intermedia de Tags y Productos (Muchos a Muchos)
CREATE TABLE product_tags (
    product_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (product_id, tag_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Tabla de Carrito de Compras
CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    address TEXT NOT NULL,  -- Se movió aquí desde users
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabla de Pedidos
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(10) CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de Detalles de Pedido
CREATE TABLE order_details (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabla de Favoritos (Usuarios pueden marcar productos como favoritos)
CREATE TABLE favorites (
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- USERS
INSERT INTO users (name, email, password, role) VALUES
('Juan Pérez', 'juan@example.com', 'hashedpassword1', 'user'),
('Admin User', 'admin@example.com', 'hashedpassword2', 'admin');

-- PRODUCTS
INSERT INTO products (sku, name, description, price, stock, category, color, image_url) VALUES
('FNK001', 'Funko Pop Goku', 'Figura coleccionable de Goku', 19.99, 50, 'Anime', 'Naranja', ''),
('FNK002', 'Funko Pop Darth Vader', 'Figura de Darth Vader edición limitada', 24.99, 30, 'Star Wars', 'Negro', ''),
('FNK003', 'Funko Pop Pikachu', 'Figura de Pikachu con gorra', 14.99, 70, 'Anime', 'Amarillo', '');

-- TAGS
INSERT INTO tags (name) VALUES
('anime'),
('star-wars'),
('pokemon'),
('edicion-especial');

-- PRODUCT_TAGS
INSERT INTO product_tags (product_id, tag_id) VALUES
(1, 1), -- Goku - anime
(2, 2), -- Darth Vader - star-wars
(2, 4), -- Darth Vader - edicion especial
(3, 1), -- Pikachu - anime
(3, 3); -- Pikachu - pokemon

-- CART
INSERT INTO cart (user_id, product_id, quantity, address) VALUES
(1, 1, 2, 'Av. Siempre Viva 123'),
(1, 3, 1, 'Av. Siempre Viva 123');

-- ORDERS
INSERT INTO orders (user_id, total, status) VALUES
(1, 54.97, 'paid'),
(1, 24.99, 'pending');

-- ORDER_DETAILS
INSERT INTO order_details (order_id, product_id, quantity, subtotal) VALUES
(1, 1, 2, 39.98),
(1, 3, 1, 14.99),
(2, 2, 1, 24.99);

-- FAVORITES
INSERT INTO favorites (user_id, product_id) VALUES
(1, 2), -- Juan favorite Darth Vader
(1, 3), -- Juan favorite Pikachu
(2, 1); -- Admin favorite Goku
