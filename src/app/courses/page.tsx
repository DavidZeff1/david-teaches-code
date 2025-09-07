import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import type { Course } from "@prisma/client";

export default async function CoursesPage() {
  const courses: Course[] = await prisma.course.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6 text-blue-500" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            All Courses
          </h2>
        </div>

        {/* Course Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={`/${course.image || "default-course.jpg"}`}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {course.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
