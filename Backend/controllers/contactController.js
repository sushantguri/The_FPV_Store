const pool = require('../dbConfig');

const submitContactForm = async (req, res) => {
    try {
        const name = req.body.name || null;
        const email = req.body.email || null;
        const message = req.body.message || null;

        const [result] = await pool.execute(
            'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );

        const [contact] = await pool.execute(
            'SELECT * FROM contacts WHERE id = ?',
            [result.insertId]
        );

        console.log("New message from: " + name);
        console.log("Message: " + message);

        res.status(201).json({ message: "Message sent successfully", contact: contact[0] });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const [contacts] = await pool.execute(
            'SELECT * FROM contacts ORDER BY created_at DESC'
        );
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = { submitContactForm, getAllContacts };
