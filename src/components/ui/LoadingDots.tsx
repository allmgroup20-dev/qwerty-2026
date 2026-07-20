export function LoadingDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="w-2 h-2 bg-current rounded-full animate-bounce-dot" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 bg-current rounded-full animate-bounce-dot" style={{ animationDelay: "200ms" }} />
      <span className="w-2 h-2 bg-current rounded-full animate-bounce-dot" style={{ animationDelay: "400ms" }} />
    </span>
  );
}
