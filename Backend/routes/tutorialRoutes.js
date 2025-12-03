const express = require('express');
const router = express.Router();
const { getTutorials, createTutorial, updateTutorial, deleteTutorial } = require('../controllers/tutorialController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getTutorials);
router.post('/', protect, createTutorial);
router.patch('/:id', protect, updateTutorial);
router.delete('/:id', protect, deleteTutorial);

module.exports = router;
