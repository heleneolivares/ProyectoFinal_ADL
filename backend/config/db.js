import pkg from 'pg';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const { Pool } = pkg;

let db;
const env = process.env.NODE_ENV;

async function connectDb() {
    if (env === 'test') {
        // Usar SQLite para pruebas
        if (!db) {
            db = await open({
                filename: './tests/test.sqlite3', // Archivo de base de datos para pruebas
                driver: sqlite3.Database
            });

            // Crear las tablas si no existen
            await db.exec(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    role TEXT DEFAULT 'user'
                );
            `);
            await db.exec(`
                CREATE TABLE IF NOT EXISTS cart (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    quantity INTEGER NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                );
            `);
            await db.exec(`
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT,
                    price REAL NOT NULL
                );
            `);
        }
    } else {
        // Usar PostgreSQL en dev/producción
        db = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            ssl: false // Cambiar a true si es necesario para producción
        });
    }
    return db;
}

export { connectDb };
