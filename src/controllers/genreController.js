const genreService = require('../services/genreService')

exports.createGenre = async (req, res) => {
    try {
        const genreData = req.body
        const genre = await genreService.createGenre(genreData)

        res.status(201).json({
            success: true,
            data: genre,
            message: 'Genero creado exitosamente'
        })

    } catch (error) {
        res.status(400).json({
            success: false, 
            error: error.message
        })
    }
}

exports.getAllGenre = async (req, res) => {
    try {
        const pagination = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        }

        const result = await genreService.getAllGenre(pagination)
        
        res.status(200).json({
            success: true,
            data: result.genre,
            pagination: result.pagination
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.getGenreById = async (req, res) => {
    try {
        const { id } = req.params
        const genre = await genreService.getGenreById(id)
        
        res.status(200).json({
            success: true,
            data: genre
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}

exports.updateGenre = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        
        const updatedGenre = await genreService.updateGenre(id, updateData)
        
        res.status(200).json({
            success: true,
            data: updatedGenre,
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

exports.deleteGenre = async (req, res) => {
    try {
        const { id } = req.params
        const result = await genreService.deleteGenre(id)
        
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
