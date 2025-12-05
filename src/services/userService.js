const prisma = require('../config/db')

exports.getAllUsers = async (pagination = {}) => {
    try {
        
        const { page = 1, limit = 10 } = pagination
        const skip = (page - 1) * limit

        const where = {}

        const users = await prisma.user.findMany({
            where,
            skip, 
            take: limit,
            orderBy: {
                id: 'desc'
            }
        })

        const total = await prisma.user.count({ where })
        const totalPages = Math.ceil(total / limit)

        return {
            users,
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


exports.getUserById = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include:{
                // Incluir relaciones si las tienes
                // reviews: true,
                // cast: true,
            }
        })
        if (!movie) {
            throw new Error('Usuarios no encontrados')
        }
    } catch (error) {
        throw error        
    }
}


// UPDATE 

exports.updateUser = async (userId, updateData) => {
    try {
        // Verificar si la película existe
        const existingUser = await prisma.user.findUnique({
            where: { id: Number(userId) }
        })

        if (!existingUser) {
            throw new Error('Usuario no encontrado')
        }

        // Si se intenta cambiar título y año, verificar que no exista otra con los mismos datos
        if (updateData.title || updateData.year) {
            const duplicateUser = await prisma.user.findFirst({
                where: {
                    AND: [
                        { title: updateData.username || existingUser.username },
                        { year: updateData.email || existingMovie.email },
                        { NOT: { id: Number(userId) } } // Excluir la película actual
                    ]
                }
            })

            if (duplicateUser) {
                throw new Error('El usuario ya existe')
            }
        }

        // Actualizar la película
        const updateUser = await prisma.user.update({
            where: { id: Number(userId) },
            data: updateData
        })

        return updateUser
    } catch (error) {
        throw error
    }
}

// DELETE 

exports.deleteUser = async (userId) => {
    try {
        // Verificar si la película existe
        const existingUser = await prisma.user.findUnique({
            where: { id: Number(userId) }
        })

        if (!existingUser) {
            throw new Error('Usuario no encontrado')
        }

        // Eliminar la película
        await prisma.user.delete({
            where: { id: Number(userId) }
        })

        return { message: 'Usuario eliminado correctamente' }
    } catch (error) {
        throw error
    }
}