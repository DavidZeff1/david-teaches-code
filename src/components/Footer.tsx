import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/DavidZeff1",
      icon: Github,
      hoverColor:
        "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/david-zeff-computerscience141592/",
      icon: Linkedin,
      hoverColor:
        "hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      name: "Email",
      href: "mailto:dpzeff@gmail.com",
      icon: Mail,
      hoverColor:
        "hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",
    },
  ];

  const quickLinks = [
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="relative mt-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="David Teaches Code Logo"
                  width={500}
                  height={500}
                  className="h-12 w-auto"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  David Teaches Code
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Learn • Build • Grow
                </p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Empowering developers of all levels with comprehensive coding
              tutorials, interactive challenges, and a supportive learning
              community. Start your coding journey today and build the future
              you envision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
              Connect
            </h4>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={
                      link.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      link.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className={`flex items-center gap-3 p-3 rounded-xl text-slate-600 dark:text-slate-400 ${link.hoverColor} transition-all duration-200 group`}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span>© {new Date().getFullYear()} David Zeff</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Built with
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                for teaching code
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
}
