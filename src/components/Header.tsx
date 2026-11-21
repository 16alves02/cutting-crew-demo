import { useEffect, useRef, useState } from "react";
import { navLinks } from "../data/navigation.ts";
import "./header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const resto = document.querySelectorAll<HTMLElement>("main, footer");
    resto.forEach((el) => el.setAttribute("inert", ""));
    document.documentElement.classList.add("menu-aberto");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 900px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      resto.forEach((el) => el.removeAttribute("inert"));
      document.documentElement.classList.remove("menu-aberto");
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className="site-header on-dark" data-solid={scrolled || open}>
      <div className="site-header__bar">
        <a className="wordmark" href="#top" onClick={close} aria-label="CUTTING CREW, início">
          <span>CUTTING CREW</span>
        </a>
        <nav className="site-header__nav" aria-label="Principal">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-header__actions">
          <span className="site-header__label">Protótipo</span>
          <button
            ref={toggleRef}
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="menu-movel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <span className="burger__lines" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>
      <div id="menu-movel" className="menu" data-open={open} inert={!open}>
        <nav aria-label="Menu móvel">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} onClick={close}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot">
          <p>Protótipo de website para CUTTING CREW Barbershop.</p>
        </div>
      </div>
    </header>
  );
}