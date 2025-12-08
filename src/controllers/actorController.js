const actorService = require('../services/actorService')


exports.createActor = async (req, res) => {
    try {
        const actorData = req.body
        const actor = await actorService.createActor(actorData)

        res.status(201).json({
            succes: true,
            data: actor,
            message: 'Actor creado exitosamente'
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            error: error.message
        })
    }
}

exports.getAllActors = async (req, res) => {
    try {
        const pagination = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        }

        const result = await actorService.getAllActors(pagination)

        res.status(200).json({
            succes: true,
            data: result.actor,
            pagination: result.pagination
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.getActorById = async (req, res) => {
    try {
        const { id } = req.params
        const actor = await actorService.getActorById(id)

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

exports.updateActor = async (req, res) => {
    try {
        const {id} = req.params
        const updateData = req.body

        const updateActor = await actorService.updateActor(id, updateData)

        res.status(200).json({
            success: true,
            data: updateActor,
            message: 'Actor actualizado exitosamente'
        })

    } catch (error) {
        const statusCode = error.message.includes('no encontrado') ? 404 : 400
        res.status(statusCode).json({
            success: false,
            error: error.message
        })
    }
}

exports.deleteActor = async(req, res) => {
    try {
        const {id} = req.params
        const result = await actorService.deleteActor(id)

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