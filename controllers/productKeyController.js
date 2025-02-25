const db = require('../db');
const crypto = require('crypto');
const transporter = require('../mailer');

exports.generateProductKey = (req, res) => {
    const { email, hardware_id, rfc } = req.body;

    if (!email || !hardware_id || !rfc) {
        return res.status(400).json({ status: 0, message: 'Email, hardware ID, and RFC are required' });
    }

    const generateProductKey = () => {
        const segments = [];
        for (let i = 0; i < 4; i++) {
            segments.push(crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 5));
        }
        return segments.join('-');
    };

    const productKey = generateProductKey();

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    const mailOptions = {
        from: 'digitaleventohub@gmail.com',
        to: email,
        subject: 'Product Key',
        text: `Your product key is ${productKey}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ status: 0, message: error.toString() });
        }

        db.run("INSERT OR REPLACE INTO product_keys (email, hardware_id, rfc, product_key, expiration_date) VALUES (?, ?, ?, ?, ?)", [email, hardware_id, rfc, productKey, expirationDate.toISOString()], (err) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err.toString() });
            }
            res.status(200).json({ status: 1, message: 'Product key generated and email sent' });
        });
    });
};

exports.validateProductKey = (req, res) => {
    const { email, hardware_id, rfc, product_key } = req.body;

    if (!email || !hardware_id || !rfc || !product_key) {
        return res.status(400).json({ status: 0, message: 'Email, hardware ID, RFC, and product key are required' });
    }

    db.get("SELECT product_key, expiration_date FROM product_keys WHERE email = ? AND hardware_id = ? AND rfc = ?", [email, hardware_id, rfc], (err, row) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err.toString() });
        }

        if (row && row.product_key === product_key) {
            const currentDate = new Date();
            const expirationDate = new Date(row.expiration_date);

            if (currentDate <= expirationDate) {
                res.status(200).json({ status: 1, message: 'Product key is valid' });
            } else {
                res.status(400).json({ status: 0, message: 'Product key has expired' });
            }
        } else {
            res.status(400).json({ status: 0, message: 'Invalid product key' });
        }
    });
};