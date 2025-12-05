const movieService = require('../services/movieService')

exports.createMovie = async (req, res) => {
    try {
        const movieData = req.body
        const movie = await movieService.createMovie(movieData)
        
        res.status(201).json({
            success: true,
            data: movie,
            message: 'Película creada exitosamente'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

exports.getAllMovies = async (req, res) => {
    try {
        const filters = {
            genre: req.query.genre,
            year: req.query.year,
            minRating: req.query.minRating,
            title: req.query.title
        }
        
        const pagination = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        }

        const result = await movieService.getAllMovies(filters, pagination)
        
        res.status(200).json({
            success: true,
            data: result.movies,
            pagination: result.pagination
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.getMovieById = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await movieService.getMovieById(id)
        
        res.status(200).json({
            success: true,
            data: movie
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}

exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        
        const updatedMovie = await movieService.updateMovie(id, updateData)
        
        res.status(200).json({
            success: true,
            data: updatedMovie,
            message: 'Película actualizada exitosamente'
        })
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 400
        res.status(statusCode).json({
            success: false,
            error: error.message
        })
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params
        const result = await movieService.deleteMovie(id)
        
        res.status(200).json({
            success: true,
            message: result.message
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}