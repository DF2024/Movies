const { Router } = require('express')
const authRouter = require('./auth');
const movieRouter = require('./movies')
const usersRouter = require('./users')
const router = Router()

router.use('/auth', authRouter)
router.use('/movie', movieRouter)
router.use('/users', usersRouter)


module.exports = router