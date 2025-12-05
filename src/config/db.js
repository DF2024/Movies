require('dotenv').config(); 

const { Pool } = require('pg')
const { PrismaPg } = require('@prisma/adapter-pg')
const { PrismaClient } = require('../generated/prisma')

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    throw new Error("DATABASE_URL no está definida en el archivo .env");
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Creamos la ÚNICA instancia de Prisma
const prisma = new PrismaClient({ adapter });

module.exports = prisma;