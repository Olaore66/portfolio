import SmartLink from "./SmartLink";

// Link whose label rolls up to reveal a copy of itself on hover.
export default function RollLink({ href, children, className = "", ...props }) {
  return (
    <SmartLink href={href} className={`group relative inline-block overflow-hidden ${className}`} {...props}>
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
      >
        {children}
      </span>
    </SmartLink>
  );
}
