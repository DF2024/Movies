const express = require('express')
const router = express.Router()
const actorController = require('../controllers/moviesController')
const authenticateToken = require('../middlewares/auth')

router.post('/', authenticateToken, actorController.createActor)
router.get('/', authenticateToken, actorController.getAllActors)
router.get('/:id', authenticateToken, actorController.getActorbyID)
router.put('/:id', authenticateToken, actorController.updateActor)
router.delete('/:id', authenticateToken, actorController.deleteUser)

module.exports = router