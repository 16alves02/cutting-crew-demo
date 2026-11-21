import { useEffect } from "react";

const ALVOS = ".section-head, .menu-board__col, .menu-board > *, .gallery__item, .roster__item, .faq__item, .facts__item, .location__grid > *";

/**
 * Entrada suave dos blocos ao rolar a página.
 * Sem JavaScript, ou com "reduzir movimento" ativo, nada é escondido: o conteúdo aparece sempre.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(ALVOS));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    for (const el of els) {
      el.setAttribute("data-reveal", "");
      io.observe(el);
    }
    return () => {
      io.disconnect();
      for (const el of els) el.removeAttribute("data-reveal");
    };
  }, []);
}
