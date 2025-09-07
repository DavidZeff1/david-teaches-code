import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
      {/* Logo with fade + pulse */}
      <Image
        src="/logo.png"
        alt="David Teaches Code Logo"
        width={80}
        height={80}
        className="animate-fadeIn animate-pulse-slow"
        priority
      />

      {/* Animated dots */}
      <div className="mt-6 flex gap-2">
        <span className="h-3 w-3 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-3 w-3 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-3 w-3 rounded-full bg-blue-600 animate-bounce" />
      </div>
    </div>
  );
}
