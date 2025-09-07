"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

type Subsection = {
  id: string;
  title: string;
};

type Section = {
  id: string;
  title: string;
  order: number;
  subsections: Subsection[];
};

export default function CourseSidebar({
  courseId,
  courseTitle,
  courseDescription,
  sections,
  currentLessonId,
  isSubscribed,
}: {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  sections: Section[];
  currentLessonId: string;
  isSubscribed: boolean;
}) {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-80 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {courseTitle}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
          {courseDescription}
        </p>
      </div>

      {/* Sections */}
      <nav className="p-4 space-y-2">
        {sections.map((section, sectionIndex) => {
          const isLocked = !isSubscribed && sectionIndex > 0;

          return (
            <div key={section.id} className="space-y-1">
              {isLocked ? (
                // Locked section links to /subscribe
                <Link
                  href="/subscribe"
                  className="flex justify-between items-center p-3 rounded-lg bg-slate-100 text-slate-400 border border-slate-200 dark:border-slate-700 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-800/60 transition cursor-pointer"
                >
                  <span className="font-medium">{section.title}</span>
                  <Lock className="w-4 h-4 text-slate-400" />
                </Link>
              ) : (
                <>
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex justify-between items-center p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition`}
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {section.title}
                    </span>
                    <svg
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        openSections.includes(section.id) ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Subsections */}
                  {openSections.includes(section.id) && (
                    <div className="ml-4 space-y-1">
                      {section.subsections.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/courses/${courseId}?lesson=${sub.id}`}
                          className={`block px-3 py-2 rounded text-sm transition ${
                            sub.id === currentLessonId
                              ? "bg-blue-500 text-white font-medium shadow"
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                          }`}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
