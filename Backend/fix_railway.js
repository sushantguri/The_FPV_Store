
const mysql = require('mysql2/promise');

const DATABASE_URL = 'mysql://root:hTMmyQUwctarHkzRmflQYqthShXohGba@switchback.proxy.rlwy.net:54663/railway';

async function updateSchema() {
    try {
        const connection = await mysql.createConnection(DATABASE_URL);
        console.log('Connected to Railway...');

        await connection.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS transaction_id VARCHAR(255) AFTER payment_method');
        console.log('Added transaction_id column to orders table.');

        await connection.end();
        console.log('Update complete.');
    } catch (error) {
        console.error('Error during update:', error);
    }
}

updateSchema();
