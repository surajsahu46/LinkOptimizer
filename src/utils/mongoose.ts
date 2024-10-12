import dotenv from 'dotenv';
import { set, connect, connection } from 'mongoose';

dotenv.config();

const conn = {
    isConnected: false,
}

// MongoDB config
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/LinkOptimizer';

export async function connectDB() {
    if (conn.isConnected) return;

    set('strictQuery', true);
    const db = await connect(MONGODB_URL);

    conn.isConnected = db.connections[0].readyState === 1;
}

if (connection) {
    connection.on('connected', () => {
        console.log('connected to mongodb');
    });

    connection.on('error', (err) => {
        console.log('error mongodb', err);
    });
}