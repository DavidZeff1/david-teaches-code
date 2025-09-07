import { Github, Linkedin, Mail, BookOpen, Code } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/DavidZeff1",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/david-zeff-computerscience141592/",
      icon: Linkedin,
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "Email",
      href: "mailto:dpzeff@gmail.com",
      icon: Mail,
      color: "hover:text-red-600 dark:hover:text-red-400",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-16 px-6">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          About <span className="text-blue-600">David Zeff</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          I’m a Computer Science student and developer, passionate about
          teaching programming and building user-friendly applications. Through{" "}
          <strong>David Teaches Code</strong>, my goal is to help people learn
          coding in a structured, accessible, and enjoyable way.
        </p>
      </section>

      {/* Social Links */}
      <section className="flex justify-center gap-6 mb-20">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition ${link.color}`}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </section>

      {/* Skills / Mission */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
          <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Teaching Mission
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            My mission is to make programming education simple, practical, and
            engaging. I believe in learning by doing, which is why all my
            courses include lessons, real-world projects, and coding challenges.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
          <Code className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-4" />
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Skills & Focus
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            I work with <strong>Java, Python, C</strong>, and modern web
            technologies like{" "}
            <strong>React, Next.js, TailwindCSS, Node.js</strong>, and databases
            such as <strong>Postgres (Neon) + Prisma</strong>. I’m especially
            focused on building clean, user-friendly UIs and scalable backends.
          </p>
        </div>
      </section>
    </main>
  );
}
