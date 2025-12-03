const prisma = require('../prismaClient');

const submitContactForm = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        const contact = await prisma.contact.create({
            data: {
                name: name,
                email: email,
                message: message
            }
        });

        console.log("New message from: " + name);
        console.log("Message: " + message);

        res.status(201).json({ message: "Message sent successfully", contact: contact });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = { submitContactForm };
