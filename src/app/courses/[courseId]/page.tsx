import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import CourseSidebar from "@/components/CourseSidebar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Types derived from your schema (Section with Subsections)
type SubsectionLite = {
  id: string;
  title: string;
  videoUrl: string | null;
  text: string | null;
};
type SectionLite = {
  id: string;
  title: string;
  order: number;
  subsections: SubsectionLite[];
};

export default async function CoursePlayerPage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) {
  const { courseId } = await params;
  const { lesson } = await searchParams;

  const session = await getServerSession(authOptions);

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: { subsections: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!course) notFound();

  // lessons list with type safety
  const allLessons: SubsectionLite[] = course.sections.flatMap(
    (s: { subsections: SubsectionLite[] }) => s.subsections as SubsectionLite[]
  );

  const defaultLessonId = allLessons[0]?.id;
  const currentLessonId = lesson || defaultLessonId || "";

  // check subscription (enum: "free" | "pro" | "lifetime")
  const isSubscribed =
    session?.user?.subscription === "pro" ||
    session?.user?.subscription === "lifetime";

  // determine allowed lessons
  const allowedSections: SectionLite[] = isSubscribed
    ? (course.sections as SectionLite[])
    : (course.sections.slice(0, 1) as SectionLite[]);

  const allowedLessonIds = allowedSections.flatMap((s) =>
    s.subsections.map((sub) => sub.id)
  );

  // redirect if locked
  if (!allowedLessonIds.includes(currentLessonId)) {
    redirect("/subscribe");
  }

  const currentLesson = currentLessonId
    ? await prisma.subsection.findUnique({ where: { id: currentLessonId } })
    : null;

  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const next =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <CourseSidebar
        courseId={course.id}
        courseTitle={course.title}
        courseDescription={course.description}
        sections={course.sections}
        currentLessonId={currentLessonId}
        isSubscribed={isSubscribed}
      />

      {/* Main */}
      <main className="flex-1 bg-white dark:bg-slate-900 p-8 overflow-y-auto">
        {currentLesson ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Video */}
            {currentLesson.videoUrl ? (
              <div className="aspect-video rounded-xl overflow-hidden shadow">
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video rounded-xl flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500">
                No video for this lesson
              </div>
            )}

            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {currentLesson.title}
            </h1>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              {currentLesson.text || "This lesson has no content yet."}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
              {prev ? (
                <Link
                  href={`/courses/${course.id}?lesson=${prev.id}`}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  ← {prev.title}
                </Link>
              ) : (
                <div />
              )}
              {next && (
                <Link
                  href={`/courses/${course.id}?lesson=${next.id}`}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  {next.title} →
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full text-slate-500 dark:text-slate-400">
            Select a lesson from the sidebar to begin.
          </div>
        )}
      </main>
    </div>
  );
}
