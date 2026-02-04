
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = 'mysql://root:hTMmyQUwctarHkzRmflQYqthShXohGba@switchback.proxy.rlwy.net:54663/railway';

async function setupDatabase() {
    try {
        console.log('Connecting to Railway MySQL...');
        const connection = await mysql.createConnection(DATABASE_URL);
        console.log('Connected!');

        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

        // Split by semicolon but handle potential issues with semicolons inside strings
        // This is a simple split for standard SQL files
        const statements = schema.split(';').filter(stmt => stmt.trim() !== '');

        console.log('Running schema.sql...');
        for (let statement of statements) {
            await connection.query(statement);
        }
        console.log('Tables created successfully!');

        await connection.end();
        console.log('Setup complete.');
    } catch (error) {
        console.error('Error during setup:', error);
        process.exit(1);
    }
}

setupDatabase();
