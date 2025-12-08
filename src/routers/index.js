const { Router } = require('express')
const authRouter = require('./auth');
const movieRouter = require('./movies')
const usersRouter = require('./users')
const genreRouter = require('./genre')
const actoRouter = require('./actor')
const router = Router()

router.use('/auth', authRouter)
router.use('/movie', movieRouter)
router.use('/users', usersRouter)
router.use('/genre', genreRouter)
router.use('/actor', actoRouter)

module.exports = router