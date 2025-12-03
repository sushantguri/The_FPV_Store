
const prisma = require('../prismaClient.js');

const getTutorials = async (req, res) => {
    try {
        const tutorials = await prisma.tutorial.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(tutorials);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const getTutorial = async (req, res) => {
    try {
        const { id } = req.params;
        const tutorial = await prisma.tutorial.findUnique({
            where: { id: parseInt(id) },
        });

        if (!tutorial) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }

        res.status(200).json(tutorial);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const createTutorial = async (req, res) => {
    try {
        const { title, content, videoUrl, author } = req.body;

        const tutorial = await prisma.tutorial.create({
            data: {
                title,
                content,
                videoUrl,
                author,
            },
        });

        res.status(201).json(tutorial);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const updateTutorial = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, videoUrl, author } = req.body;

        const tutorial = await prisma.tutorial.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                videoUrl,
                author,
            },
        });

        res.status(200).json(tutorial);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const deleteTutorial = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.tutorial.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Tutorial deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

module.exports = { getTutorials, getTutorial, createTutorial, updateTutorial, deleteTutorial };
