const prisma = require('../config/db')

exports.createActor = async (actorData) => {

    try {
        const existingActor = await prisma.actor.findFirst({
            where: {
                name: actorData.name
            }
        })

        if(existingActor){
            throw new Error('El actor ya se encuentra registrado')
        }

        const actor = await prisma.actor.create({
            data: actorData
        })

        return actor

    } catch (error) {
        throw error
    }
}

exports.getAllActors = async (actorData) => {
    try {
        const {page = 1, limit = 10} = pagination
        const skip = (page - 1) * limit

        const where = {}

        const genre = await prisma.genre.findMany({
            where,
            skip, 
            take: limit,
            orderBy:{
                id: 'desc'
            }
        })

        const total = await prisma.actor.count({ where })
        const totalPages = Math.ceil(total / limit)

        return {
            genre, 
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        }
    } catch (error) {
        throw error
    }
}

exports.getActorById = async (actorId) => {
    try {
        const actor = await prisma.actor.findUnique({
            where: {
                id: Number(actorId)
            }
        })

        if(!actor){
            throw new Error('Actor no encontrado')
        }

        return actor
    } catch (error) {
        throw error
    }
}

exports.updateActor = async (actorId, updateData) => {
    try {
        const existingActor = await prisma.actor.findUnique({
            where: {id: Number(actorId)}
        })

        if(!existingActor){
            throw new Error('Actor no encontrado')
        }

        if(updateData.name){
            const duplicateActor = await prisma.actor.findFirst({
                where: {
                    AND: [
                        {name: updateData.name || existingActor.name },
                        { NOT: {id: Number(actorId)} }
                    ]
                }
            })

            if (duplicateActor){
                throw new Error('Ya existe este actor')
            }
        }

        const updateActor = await prisma.actor.update({
            where : { id: Number(actorId)},
            data: updateData
        })

        return updateActor
    } catch (error) {
        throw error
    }
}

exports.deleteActor = async (actorId) => {
    try {
        const existingActor = await prisma.actor.findUnique({
            where:{ id: Number(actorId) }
        })

        if(!existingActor){
            throw new Error('Actor no encontrado')
        }

        await prisma.actor.delete({
            where: { id: Number(actorId) }
        })

        return { message: 'Actor eliminado correctamente' }

    } catch (error) {
        throw error
    }
}
