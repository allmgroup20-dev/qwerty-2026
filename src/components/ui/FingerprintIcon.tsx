interface Props { className?: string; size?: number }
export function FingerprintIcon({ className = "", size = 64 }: Props) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="45" r="14" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="45" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M50 31c-7.7 0-14 6.3-14 14 0 3.3 1.1 6.3 3 8.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M61.2 38.5c1.8 2.5 2.8 5.5 2.8 8.5 0 2.5-.6 4.8-1.7 6.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M50 17c-15.5 0-28 12.5-28 28 0 6.4 2.2 12.3 5.8 17" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M72.2 34.5c3.6 4.7 5.8 10.6 5.8 17 0 5.3-1.5 10.3-4 14.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M33.5 70.2A31.8 31.8 0 0 1 50 63.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M66.5 70.2A31.8 31.8 0 0 0 50 63.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M50 49c.6 0 1 .4 1 1v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M43 51l-5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M57 51l5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 57c-1.5-1.8-2.5-4-2.8-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M62 57c1.5-1.8 2.5-4 2.8-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
