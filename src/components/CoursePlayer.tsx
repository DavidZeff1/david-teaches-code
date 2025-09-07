"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, PlayCircle } from "lucide-react";

type CourseForPlayer = {
  id: string;
  title: string;
  description: string;
  sections: {
    id: string;
    title: string;
    order: number;
    subsections: { id: string; title: string; order: number }[];
  }[];
};

type LessonForPlayer = {
  id: string;
  title: string;
  text: string;
  videoUrl: string | null;
} | null;

export default function CoursePlayer({
  course,
  currentLesson,
}: {
  course: CourseForPlayer;
  currentLesson: LessonForPlayer;
}) {
  const searchParams = useSearchParams();
  const activeLessonId = searchParams.get("lesson");

  const flatList = useMemo(
    () => course.sections.flatMap((s) => s.subsections),
    [course.sections]
  );

  const currentIndex = useMemo(() => {
    if (!activeLessonId) return 0;
    return Math.max(
      0,
      flatList.findIndex((l) => l.id === activeLessonId)
    );
  }, [activeLessonId, flatList]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
          <p className="mt-1 text-gray-600">{course.description}</p>
        </div>
        <Link
          href="/courses"
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
        >
          ← Back to Courses
        </Link>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="md:sticky md:top-4 h-max rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Curriculum</h2>
          <div className="space-y-4">
            {course.sections.map((section) => (
              <div key={section.id} className="rounded-lg border">
                <div className="px-3 py-2 font-semibold bg-gray-50 rounded-t-lg">
                  {section.title}
                </div>
                <ul className="divide-y">
                  {section.subsections.map((sub) => {
                    const isActive =
                      sub.id === activeLessonId ||
                      (!activeLessonId &&
                        currentIndex === 0 &&
                        sub.id === flatList[0]?.id);

                    // TODO: replace this later with real DB progress
                    const isCompleted = false;

                    return (
                      <li key={sub.id}>
                        <Link
                          href={`/courses/${course.id}?lesson=${sub.id}`}
                          className={`flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${
                            isActive
                              ? "bg-blue-50 font-medium text-blue-700"
                              : ""
                          }`}
                        >
                          <span>{sub.title}</span>
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : isActive ? (
                            <PlayCircle className="h-4 w-4 text-blue-500" />
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          {currentLesson ? (
            <>
              <h2 className="text-xl md:text-2xl font-bold">
                {currentLesson.title}
              </h2>

              {currentLesson.videoUrl && (
                <div className="mt-4 aspect-video">
                  <iframe
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    allowFullScreen
                    className="h-full w-full rounded-lg"
                  />
                </div>
              )}

              <article className="prose prose-gray max-w-none mt-6">
                <p className="whitespace-pre-wrap">{currentLesson.text}</p>
              </article>

              {/* Placeholder actions; we’ll wire these later */}
              <div className="mt-6 flex gap-3">
                <button
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  title="(Coming soon) Mark lesson complete"
                >
                  Mark Complete
                </button>
                <button
                  className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                  title="(Coming soon) Open coding challenge"
                >
                  Open Challenge
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">No lesson selected.</p>
          )}
          <div className="mt-8 flex justify-between">
            {currentIndex > 0 ? (
              <Link
                href={`/courses/${course.id}?lesson=${
                  flatList[currentIndex - 1].id
                }`}
                className="rounded-lg border px-4 py-2 hover:bg-gray-50"
              >
                ← Previous
              </Link>
            ) : (
              <div />
            )}

            {currentIndex < flatList.length - 1 ? (
              <Link
                href={`/courses/${course.id}?lesson=${
                  flatList[currentIndex + 1].id
                }`}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Next →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
