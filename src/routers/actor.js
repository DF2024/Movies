const express = require('express')
const router = express.Router()
const actorController = require('../controllers/actorController')
const authenticateToken = require('../middlewares/auth')

router.post('/', authenticateToken, actorController.createActor)
router.get('/', authenticateToken, actorController.getAllActors)
router.get('/:id', authenticateToken, actorController.getActorById)
router.put('/:id', authenticateToken, actorController.updateActor)
router.delete('/:id', authenticateToken, actorController.deleteActor)

module.exports = router