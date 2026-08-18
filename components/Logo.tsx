export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14,16 Q30,13 50,14 Q52,28 52,42 Q34,44 16,44 Q13,30 14,16 Z" />
      <path d="M70,15 Q88,13 106,15 Q108,28 107,41 Q88,43 71,42 Q69,29 70,15 Z" />
      <path d="M28,78 Q58,74 92,77 Q95,92 91,106 Q58,109 27,106 Q25,92 28,78 Z" />
      <path d="M33,45 Q29,60 39,75" />
      <path d="M39,75 L33,69 M39,75 L45,69" />
      <path d="M88,43 Q93,58 81,75" />
      <path d="M81,75 L86,68 M81,75 L75,70" />
    </svg>
  );
}
