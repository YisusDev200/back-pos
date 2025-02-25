const db = require('../db');
const transporter = require('../mailer');

exports.sendCode = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: 0, message: 'Email is required' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
        from: 'digitaleventohub@gmail.com',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ status: 0, message: error.toString() });
        }

        db.run("INSERT OR REPLACE INTO verification_codes (email, code, verified) VALUES (?, ?, 0)", [email, verificationCode], (err) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err.toString() });
            }
            res.status(200).json({ status: 1, message: 'Verification code sent' });
        });
    });
};

exports.verifyCode = (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ status: 0, message: 'Email and code are required' });
    }

    db.get("SELECT code FROM verification_codes WHERE email = ?", [email], (err, row) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err.toString() });
        }

        if (row && row.code === code) {
            db.run("UPDATE verification_codes SET verified = 1 WHERE email = ?", [email], (err) => {
                if (err) {
                    return res.status(500).json({ status: 0, message: err.toString() });
                }
                res.status(200).json({ status: 1, message: 'Code verified successfully' });
            });
        } else {
            res.status(400).json({ status: 0, message: 'Invalid code' });
        }
    });
};