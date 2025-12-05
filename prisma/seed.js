// prisma/seed.js

const prisma = require('../src/config/db')
const bcrypt = require('bcryptjs')

async function main() {
  // HASHEO DE CONTRASEÑA 
  const hashedPasswordUser1 = await bcrypt.hash('password123', 10)
  const hashedPasswordUser2 = await bcrypt.hash('admin123', 10)
  // Crear usuarios
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: hashedPasswordUser1,
      username: 'User One',
      role: 'USER'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPasswordUser2,
      username: 'Admin User',
      role: 'ADMIN'
    }
  });


}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
