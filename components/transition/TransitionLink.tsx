"use client";

import Link from "next/link";
import { useTransition } from "./TransitionProvider";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
  ariaLabel?: string;
  title?: string;
};

/**
 * Link interno que passa pelo portal da Noren. Mantém o comportamento nativo
 * para clique do meio, ctrl/cmd+clique e afins.
 */
export function TransitionLink({ href, children, className = "", onNavigate, ariaLabel, title }: Props) {
  const { navigate } = useTransition();

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel} title={title} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      title={title}
      onClick={(event) => {
        if (event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (event.button !== 0) return;
        event.preventDefault();
        onNavigate?.();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
