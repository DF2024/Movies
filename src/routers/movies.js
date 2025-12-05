const express = require('express')
const router = express.Router()
const movieController = require('../controllers/moviesController')

router.post('/', movieController.createMovie)
router.get('/', movieController.getAllMovies)
router.get('/:id', movieController.getMovieById)
router.put('/:id', movieController.updateMovie)
router.delete('/:id', movieController.deleteMovie)

module.exports = router