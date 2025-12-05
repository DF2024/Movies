const prisma = require('../config/db')

exports.createGenre = async (genreData) => {
    try {
        const existingGenre = await prisma.genre.findFirst({
            where: {
                name: genreData.name
            }
        })

        if(existingGenre){
            throw new Error('El genero ya se encuentra registrado')
        }

        const genre = await prisma.genre.create({
            data: genreData
        })

        return genre

    } catch (error) {
        throw error   
    }
}

exports.getAllGenre = async (pagination = {}) => {
    try {
        const {page = 1, limit = 10} = pagination
        const skip = (page - 1) * limit

        const where = {}

        const genre = await prisma.genre.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            }
        })

        const total = await prisma.genre.count({ where })
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

exports.getGenreById = async (genreId) => {
    try {
        const genre = await prisma.genre.findUnique({
            where: {
                id: Number(genreId)
            }
        })

        if(!genre){
            throw new Error('Genero no encontrado')
        }

        return genre
    } catch (error) {
        throw error        
    }
}

exports.updateGenre = async (genreId, updateData) => {
    try {
        const existingGenre = await prisma.genre.findUnique({
            where: { id: Number(genreId)}
        })

        if (!existingGenre){
            throw new Error('Genero no encontrado')
        }

        if(updateData.name){
            const duplicateGenre = await prisma.genre.findFirst({
                where: {
                    AND: [
                        { name: updateData.name || existingGenre.name },
                        { NOT: {id: Number(genreId)} }
                    ]
                }
            })

            if (duplicateGenre){
                throw new Error('Ya existe ese genero')
            }
        }

        const updateGenre = await prisma.genre.update({
            where : { id: Number(genreId)},
            data: updateData
        })

        return updateGenre
    } catch (error) {
        throw error
    }
}

exports.deleteGenre = async (genreId) => {
    try {
        // Verificar si la película existe
        const existingGenre = await prisma.genre.findUnique({
            where: { id: Number(genreId) }
        })

        if (!existingGenre) {
            throw new Error('Película no encontrada')
        }

        // Eliminar la película
        await prisma.genre.delete({
            where: { id: Number(genreId) }
        })

        return { message: 'Genero eliminado correctamente' }
    } catch (error) {
        throw error
    }
}