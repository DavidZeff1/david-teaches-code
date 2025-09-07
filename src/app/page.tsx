import Link from "next/link";
import {
  PlayCircle,
  Code,
  BookOpen,
  Users,
  Trophy,
  Star,
  ArrowRight,
  CheckCircle,
  Timer,
  Award,
  Zap,
  Target,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: PlayCircle,
      title: "Interactive Video Lessons",
      description:
        "Learn with step-by-step video tutorials that you can pause, rewind, and follow at your own pace.",
      color: "blue",
    },
    {
      icon: Code,
      title: "Real-World Projects",
      description:
        "Build actual applications and projects that you can showcase in your portfolio.",
      color: "purple",
    },
    {
      icon: Target,
      title: "Structured Learning Path",
      description:
        "Follow our carefully designed curriculum that takes you from beginner to job-ready developer.",
      color: "green",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Join thousands of learners in our active community where you can ask questions and share progress.",
      color: "pink",
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed progress tracking and achievement badges.",
      color: "yellow",
    },
    {
      icon: Zap,
      title: "Hands-On Practice",
      description:
        "Immediately apply what you learn with interactive coding exercises and challenges.",
      color: "orange",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-8">
              Master Coding with
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                David Teaches Code
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-4xl mx-auto">
              Transform your career with comprehensive programming courses.
              Learn Java, Python, C, and more through
              <span className="font-semibold text-slate-800 dark:text-slate-300">
                {" "}
                interactive video lessons
              </span>
              ,
              <span className="font-semibold text-slate-800 dark:text-slate-300">
                {" "}
                hands-on projects
              </span>
              , and
              <span className="font-semibold text-slate-800 dark:text-slate-300">
                {" "}
                expert guidance
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/courses"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <PlayCircle className="w-5 h-5" />
                Start Learning Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#featured-courses"
                className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 border border-slate-200 dark:border-slate-700 shadow-lg"
              >
                <BookOpen className="w-5 h-5" />
                Browse Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-200/30 dark:bg-pink-800/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Why Choose David Teaches Code?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Our proven teaching methodology combines theory with practice,
              ensuring you build real skills that employers value.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                blue: "from-blue-500 to-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
                purple:
                  "from-purple-500 to-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
                green:
                  "from-green-500 to-green-600 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
                pink: "from-pink-500 to-pink-600 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
                yellow:
                  "from-yellow-500 to-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
                orange:
                  "from-orange-500 to-orange-600 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
              };

              return (
                <div
                  key={index}
                  className="group p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:scale-105 transform"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${colorClasses[
                      feature.color as keyof typeof colorClasses
                    ]
                      .split(" ")
                      .slice(0, 2)
                      .join(
                        " "
                      )} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <Award className="w-16 h-16 mx-auto mb-8 text-yellow-300" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Start with our beginner-friendly courses and build real projects
            from day one.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <PlayCircle className="w-5 h-5" />
              Start Learning Free
            </Link>
            <Link
              href="#featured-courses"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <BookOpen className="w-5 h-5" />
              Browse All Courses
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-blue-200 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>
              Free courses available • No credit card required • Start
              immediately
            </span>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl"></div>
        </div>
      </section>
    </main>
  );
}
