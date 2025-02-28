const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./backend-pos.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS verification_codes (email TEXT PRIMARY KEY, code TEXT, verified INTEGER DEFAULT 0, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
    db.run("CREATE TABLE IF NOT EXISTS product_keys (email TEXT, hardware_id TEXT, rfc TEXT, product_key TEXT, expiration_date int, PRIMARY KEY (email, hardware_id, rfc))");
});

module.exports = db;