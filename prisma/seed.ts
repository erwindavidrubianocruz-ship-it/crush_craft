import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("DemoPass123", 10);

  const demoUsers = [
    { email: "alex.police@example.com", name: "Alex", age: 31, occupation: "Police Officer", region: "Berlin", bio: "Night-shift officer who loves long weekend hikes." },
    { email: "nina.teacher@example.com", name: "Nina", age: 28, occupation: "Teacher", region: "Munich", bio: "Primary school teacher, coffee fan, and book collector." },
    { email: "omar.nurse@example.com", name: "Omar", age: 34, occupation: "Nurse", region: "Hamburg", bio: "ER nurse with a calm mindset and a playful laugh." },
    { email: "sara.engineer@example.com", name: "Sara", age: 29, occupation: "Software Engineer", region: "Cologne", bio: "Builds apps by day, explores local food spots by night." },
    { email: "jonas.firefighter@example.com", name: "Jonas", age: 33, occupation: "Firefighter", region: "Berlin", bio: "Team-oriented and active, always planning his next cycling trip." },
  ];

  for (const user of demoUsers) {
    await prisma.user.create({
      data: {
        email: user.email,
        passwordHash,
        profile: {
          create: {
            name: user.name,
            age: user.age,
            occupation: user.occupation,
            region: user.region,
            bio: user.bio,
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
