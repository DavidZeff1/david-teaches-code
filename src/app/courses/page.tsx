import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Star, BookOpen, PlayCircle, Award } from "lucide-react";

const prisma = new PrismaClient();

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    include: {
      sections: {
        include: {
          subsections: true,
        },
      },
    },
  });

  // Calculate course statistics
  const coursesWithStats = courses.map((course) => {
    const totalLessons = course.sections.reduce(
      (acc, section) => acc + section.subsections.length,
      0
    );
    const estimatedHours = Math.ceil(totalLessons * 0.25); // Rough estimate: 15min per lesson

    return {
      ...course,
      totalLessons,
      estimatedHours,
      students: Math.floor(Math.random() * 2000) + 500, // Mock data - replace with real data
      rating: (4.2 + Math.random() * 0.7).toFixed(1), // Mock rating between 4.2-4.9
      difficulty: ["Beginner", "Intermediate", "Advanced"][
        Math.floor(Math.random() * 3)
      ],
      isPopular: Math.random() > 0.7,
      isNew: Math.random() > 0.8,
    };
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* All Courses */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                All Courses
              </h2>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {coursesWithStats.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 transform"
              >
                {/* Course Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={`/${course.image || "default-course.jpg"}`}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {course.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {course.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
