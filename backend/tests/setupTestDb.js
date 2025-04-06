import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function setupTestDb() {
    const db = await open({
        filename: './tests/test.sqlite3',
        driver: sqlite3.Database
    });

    await db.exec(`
        -- Tabla de usuarios
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT CHECK(role IN ('user', 'admin')) DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Tabla de productos
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sku TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            stock INTEGER NOT NULL DEFAULT 0,
            category TEXT NOT NULL,
            color TEXT NOT NULL,
            image_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Tabla de tags (etiquetas de productos)
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        );

        -- Tabla intermedia de tags y productos (muchos a muchos)
        CREATE TABLE IF NOT EXISTS product_tags (
            product_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            PRIMARY KEY (product_id, tag_id),
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
        );

        -- Tabla de carrito de compras
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL CHECK (quantity > 0),
            address TEXT NOT NULL, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );

        -- Tabla de pedidos
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            total REAL NOT NULL,
            status TEXT CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        -- Tabla de detalles de pedidos
        CREATE TABLE IF NOT EXISTS order_details (
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL CHECK (quantity > 0),
            subtotal REAL NOT NULL,
            PRIMARY KEY (order_id, product_id),
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );

        -- Tabla de favoritos
        CREATE TABLE IF NOT EXISTS favorites (
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, product_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );
    `);

    await db.exec(`
        INSERT INTO users (name, email, password, role)
        VALUES 
            ('Juan Pérez', 'juan@ejemplo.com', 'password123', 'user'),
            ('Ana Gómez', 'ana@ejemplo.com', 'password123', 'admin'),
            ('Carlos Martínez', 'carlos@ejemplo.com', 'password456', 'user'),
            ('Lucía Sánchez', 'lucia@ejemplo.com', 'password789', 'user'),
            ('Pedro López', 'pedro@ejemplo.com', 'password101', 'user');
    `);
    await db.exec(`INSERT INTO products (sku, name, description, price, stock, category, color, image_url)
        VALUES 
            ('SKU12345', 'Producto 1', 'Descripción del producto 1', 99.99, 10, 'Electrónica', 'Rojo', 'https://ejemplo.com/img1.jpg'),
            ('SKU12346', 'Producto 2', 'Descripción del producto 2', 49.99, 5, 'Electrónica', 'Azul', 'https://ejemplo.com/img2.jpg'),
            ('SKU12347', 'Producto 3', 'Descripción del producto 3', 199.99, 3, 'Muebles', 'Blanco', 'https://ejemplo.com/img3.jpg'),
            ('SKU12348', 'Producto 4', 'Descripción del producto 4', 9.99, 50, 'Accesorios', 'Negro', 'https://ejemplo.com/img4.jpg'),
            ('SKU12349', 'Producto 5', 'Descripción del producto 5', 149.99, 7, 'Electrónica', 'Verde', 'https://ejemplo.com/img5.jpg');
    `);

    await db.exec(`INSERT INTO tags (name)
        VALUES
            ('Tecnología'),
            ('Muebles'),
            ('Accesorios'),
            ('Electrónica'),
            ('Nuevo');
    `);

    await db.exec(`INSERT INTO product_tags (product_id, tag_id)
        VALUES
            (1, 1),  -- Producto 1 con Tecnología
            (2, 1),  -- Producto 2 con Tecnología
            (3, 2),  -- Producto 3 con Muebles
            (4, 3),  -- Producto 4 con Accesorios
            (5, 4),  -- Producto 5 con Electrónica
            (1, 5);  -- Producto 1 con Nuevo
    `);

    await db.exec(`INSERT INTO cart (user_id, product_id, quantity, address)
        VALUES
            (1, 1, 2, 'Calle Falsa 123, Ciudad, País'),
            (2, 3, 1, 'Avenida Siempre Viva 742, Ciudad, País'),
            (3, 4, 5, 'Boulevard de la Paz 456, Ciudad, País'),
            (4, 2, 3, 'Calle Luna 789, Ciudad, País');
    `);

    await db.exec(`INSERT INTO orders (user_id, total, status)
        VALUES
            (1, 199.98, 'pending'),
            (2, 299.97, 'paid'),
            (3, 49.99, 'shipped'),
            (4, 29.97, 'delivered');
    `);
    
    await db.exec(`INSERT INTO order_details (order_id, product_id, quantity, subtotal)
        VALUES
            (1, 1, 2, 199.98),  -- Pedido 1 con Producto 1
            (2, 3, 1, 199.99),  -- Pedido 2 con Producto 3
            (3, 4, 5, 49.95),   -- Pedido 3 con Producto 4
            (4, 2, 3, 149.97);  -- Pedido 4 con Producto 2
    `);
    
    await db.exec(`INSERT INTO favorites (user_id, product_id)
        VALUES
            (1, 3),  -- Usuario 1 le gusta el Producto 3
            (2, 5),  -- Usuario 2 le gusta el Producto 5
            (3, 4),  -- Usuario 3 le gusta el Producto 4
            (4, 1),  -- Usuario 4 le gusta el Producto 1
            (5, 2);  -- Usuario 5 le gusta el Producto 2
    `);

    return db;
}
