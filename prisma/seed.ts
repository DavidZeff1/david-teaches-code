import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean wipe (order matters: child → parent)
  await prisma.progress.deleteMany();
  await prisma.subsection.deleteMany();
  await prisma.section.deleteMany();
  await prisma.course.deleteMany();

  // Create a single Java course
  const javaCourse = await prisma.course.create({
    data: {
      title: "Java Programming Mastery",
      description:
        "Learn Java from absolute basics to advanced topics like multithreading and Spring Boot. Perfect for beginners and aspiring backend developers.",
      image: "https://via.placeholder.com/600x400.png?text=Java+Course",
      sections: {
        create: [
          {
            title: "Introduction to Java",
            order: 1,
            subsections: {
              create: [
                {
                  title: "What is Java?",
                  order: 1,
                  text: "Java is a popular, class-based, object-oriented programming language designed to have as few implementation dependencies as possible.",
                  videoUrl: "https://www.youtube.com/embed/grEKMHGYyns", // sample video
                },
                {
                  title: "Installing Java and IDE",
                  order: 2,
                  text: "Step-by-step guide to installing JDK and IntelliJ IDEA or Eclipse.",
                  videoUrl: null,
                },
                {
                  title: "Hello World Program",
                  order: 3,
                  text: "Your first Java program: printing Hello World to the console.",
                  videoUrl: null,
                },
              ],
            },
          },
          {
            title: "Java Basics",
            order: 2,
            subsections: {
              create: [
                {
                  title: "Variables and Data Types",
                  order: 1,
                  text: "Learn about primitive data types, variables, and type casting.",
                },
                {
                  title: "Operators",
                  order: 2,
                  text: "Arithmetic, relational, logical, and bitwise operators in Java.",
                },
                {
                  title: "Control Flow",
                  order: 3,
                  text: "Master if-else, switch, loops (for, while, do-while).",
                },
              ],
            },
          },
          {
            title: "Object-Oriented Programming",
            order: 3,
            subsections: {
              create: [
                {
                  title: "Classes and Objects",
                  order: 1,
                  text: "Understand how to define classes and create objects.",
                },
                {
                  title: "Encapsulation",
                  order: 2,
                  text: "Learn how to use access modifiers and getters/setters.",
                },
                {
                  title: "Inheritance",
                  order: 3,
                  text: "Extend classes to reuse and organize code effectively.",
                },
                {
                  title: "Polymorphism",
                  order: 4,
                  text: "Overloading and overriding methods to achieve flexibility.",
                },
                {
                  title: "Abstraction & Interfaces",
                  order: 5,
                  text: "Abstract classes vs interfaces and when to use them.",
                },
              ],
            },
          },
          {
            title: "Advanced Java",
            order: 4,
            subsections: {
              create: [
                {
                  title: "Collections Framework",
                  order: 1,
                  text: "Explore List, Set, Map, and their implementations.",
                },
                {
                  title: "Generics",
                  order: 2,
                  text: "Write flexible and type-safe code using generics.",
                },
                {
                  title: "Exception Handling",
                  order: 3,
                  text: "Properly handle errors with try-catch-finally and custom exceptions.",
                },
                {
                  title: "Multithreading",
                  order: 4,
                  text: "Learn about threads, Runnable, synchronization, and concurrency.",
                },
              ],
            },
          },
          {
            title: "Java in Practice",
            order: 5,
            subsections: {
              create: [
                {
                  title: "File I/O",
                  order: 1,
                  text: "Read from and write to files using Java I/O classes.",
                },
                {
                  title: "Java Streams API",
                  order: 2,
                  text: "Process collections of data with a functional style.",
                },
                {
                  title: "Introduction to Spring Boot",
                  order: 3,
                  text: "Build a simple REST API using Spring Boot.",
                },
              ],
            },
          },
        ],
      },
    },
    include: { sections: { include: { subsections: true } } },
  });

  console.log("✅ Java course created:", javaCourse.title);
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
