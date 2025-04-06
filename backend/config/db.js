// config/db.js
import pkg from 'pg';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const { Pool } = pkg;

let db = null;
const env = process.env.NODE_ENV || 'development';

async function connectDb() {
    if (env === 'test') {
        // SQLite en modo test
        db = await open({
            filename: './tests/test.sqlite3',
            driver: sqlite3.Database
        });
    } else {
        // PostgreSQL en dev/producción
        db = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            ssl: false // Puedes poner true si estás en producción con SSL
        });
    }
    return db;
}

export { connectDb };
