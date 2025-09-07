// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Wipe old data
  await prisma.subsection.deleteMany();
  await prisma.section.deleteMany();
  await prisma.course.deleteMany();

  // --- Java Course ---
  const javaCourse = await prisma.course.create({
    data: {
      title: "Java Programming",
      description: "Master Java from beginner to advanced.",
      image: "java.png",
      sections: {
        create: [
          {
            title: "Beginner",
            order: 1,
            subsections: {
              create: [
                {
                  title: "Introduction to Java",
                  order: 1,
                  text: "Learn about Java, its history, and setup.",
                  videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
                },
                {
                  title: "Variables & Data Types",
                  order: 2,
                  text: "Understand variables, primitive types, and reference types.",
                  videoUrl: "https://www.youtube.com/embed/GoXwIVyNvX0",
                },
              ],
            },
          },
          {
            title: "Intermediate",
            order: 2,
            subsections: {
              create: [
                {
                  title: "OOP Basics",
                  order: 1,
                  text: "Classes, objects, methods, and encapsulation.",
                  videoUrl: "https://www.youtube.com/embed/8cm1x4bC610",
                },
              ],
            },
          },
          {
            title: "Advanced",
            order: 3,
            subsections: {
              create: [
                {
                  title: "Multithreading",
                  order: 1,
                  text: "Introduction to concurrency in Java.",
                  videoUrl: "https://www.youtube.com/embed/d1kPMr7l-dI",
                },
              ],
            },
          },
        ],
      },
    },
    include: { sections: true },
  });

  // --- Python Course ---
  const pythonCourse = await prisma.course.create({
    data: {
      title: "Python Programming",
      description: "Learn Python from the ground up.",
      image: "python.png",
      sections: {
        create: [
          {
            title: "Beginner",
            order: 1,
            subsections: {
              create: [
                {
                  title: "Intro to Python",
                  order: 1,
                  text: "Getting started with Python installation and syntax.",
                  videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
                },
                {
                  title: "Variables & Strings",
                  order: 2,
                  text: "Learn about variables, strings, and basic types.",
                  videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
                },
              ],
            },
          },
          {
            title: "Intermediate",
            order: 2,
            subsections: {
              create: [
                {
                  title: "Functions & Modules",
                  order: 1,
                  text: "Define functions and organize code into modules.",
                  videoUrl: "https://www.youtube.com/embed/9Os0o3wzS_I",
                },
              ],
            },
          },
          {
            title: "Advanced",
            order: 3,
            subsections: {
              create: [
                {
                  title: "Decorators & Generators",
                  order: 1,
                  text: "Dive into decorators and generators for advanced workflows.",
                  videoUrl: "https://www.youtube.com/embed/9oyr0mocZTg",
                },
              ],
            },
          },
        ],
      },
    },
    include: { sections: true },
  });

  console.log("Seeded courses:", { javaCourse, pythonCourse });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
