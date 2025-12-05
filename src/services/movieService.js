const prisma = require('../config/db')

exports.createMovie = async (movieData) => {
    try {
        // BUSCAR LA PELICULA POR title, year
        const existingMovie = await prisma.movie.findFirst({
            where: {
                title: movieData.title,
                year: movieData.year
            }
        })

        // VALIDACIÓN SI EXISTE LA PELICULA EN DB
        if(existingMovie){
            throw new Error('La pelicula ya se encuentra registrada')
        }

        // CREAR PELICULA
        const movie = await prisma.movie.create({
            data: movieData
        })

        return movie

    } catch (error) {
        throw error
    }
}

exports.getAllMovies = async  (filters= {}, pagination = {}) => {
    try {

        // PAGINACIÓN
        const {page = 1, limit = 10} = pagination
        const skip = (page - 1) * limit

        const where = {}

        // APLICAR FILTROS SI EXISTEN
        if(filters.genre) {
            where.genre = {
                has: filters.genre
            }
        }

        if(filters.year){
            where.year = parseInt(filters.year)
        }

        if (filters.minRating) {
            where.rating = {
                gte: parseFloat(filters.minRating)
            }
        }
        
        if (filters.title) {
            where.title = {
                contains: filters.title,
                mode: 'insensitive'
            }
        }

        // Obtener películas con paginación
        const movies = await prisma.movie.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            }
        })

        // Contar total para paginación
        const total = await prisma.movie.count({ where })
        const totalPages = Math.ceil(total / limit)

        return {
            movies,
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

// READ

exports.getMovieById = async (movieId) => {
    try {
        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId
            },
            include: {
                // Incluir relaciones si las tienes
                // reviews: true,
                // cast: true,
            }
        })

        if (!movie) {
            throw new Error('Película no encontrada')
        }

        return movie
    } catch (error) {
        throw error
    }
}


// UPDATE 

exports.updateMovie = async (movieId, updateData) => {
    try {
        // Verificar si la película existe
        const existingMovie = await prisma.movie.findUnique({
            where: { id: movieId }
        })

        if (!existingMovie) {
            throw new Error('Película no encontrada')
        }

        // Si se intenta cambiar título y año, verificar que no exista otra con los mismos datos
        if (updateData.title || updateData.year) {
            const duplicateMovie = await prisma.movie.findFirst({
                where: {
                    AND: [
                        { title: updateData.title || existingMovie.title },
                        { year: updateData.year || existingMovie.year },
                        { NOT: { id: movieId } } // Excluir la película actual
                    ]
                }
            })

            if (duplicateMovie) {
                throw new Error('Ya existe otra película con el mismo título y año')
            }
        }

        // Actualizar la película
        const updatedMovie = await prisma.movie.update({
            where: { id: movieId },
            data: updateData
        })

        return updatedMovie
    } catch (error) {
        throw error
    }
}

// DELETE 

exports.deleteMovie = async (movieId) => {
    try {
        // Verificar si la película existe
        const existingMovie = await prisma.movie.findUnique({
            where: { id: movieId }
        })

        if (!existingMovie) {
            throw new Error('Película no encontrada')
        }

        // Eliminar la película
        await prisma.movie.delete({
            where: { id: movieId }
        })

        return { message: 'Película eliminada correctamente' }
    } catch (error) {
        throw error
    }
}