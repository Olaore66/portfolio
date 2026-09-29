import RevealText from "./RevealText";

// Shared section shell: numbered label + optional headline.
export default function Section({ id, index, label, title, className = "", children }) {
  return (
    <section id={id} className={`scroll-mt-0 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] opacity-70 sm:mb-16">
          {index && <span>({index})</span>}
          <span className="h-px w-10 bg-current" />
          <span>{label}</span>
        </div>
        {title && (
          <RevealText
            as="h2"
            text={title}
            className="mb-16 max-w-4xl font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl"
          />
        )}
        {children}
      </div>
    </section>
  );
}
