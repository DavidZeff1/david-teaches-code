// src/app/courses/page.tsx  (Server Component by default)
import { prisma } from "@/lib/prisma";
import CoursesClient from "./CoursesClient";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams?: { session_id?: string };
}) {
  const courses = await prisma.course.findMany();

  return <CoursesClient courses={courses} searchParams={searchParams} />;
}
