import type { AnchorHTMLAttributes } from "react";

// Ligação externa: abre num novo separador, sem passar o "opener", e avisa os leitores de ecrã.
export function ExtLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (abre num novo separador)</span>
    </a>
  );
}
