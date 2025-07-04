const express = require('express');
const router = express.Router();


const {
  getCourses,
  getCourseById,
  registerStudent
} = require('../controllers/courseController');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/:id/register', registerStudent);

module.exports = router;
