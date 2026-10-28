"use client";

import { useEffect } from "react";

/** Anima o conteúdo das seções ao rolar (ScrollReveal). Os fundos ficam parados. */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let sr: { destroy: () => void } | undefined;
    let alive = true;
    import("scrollreveal").then(({ default: ScrollReveal }) => {
      if (!alive) return; // desmontou antes de a lib carregar
      const instance = ScrollReveal();
      // O hero (HeroScrub) não usa .sec, então fica de fora sozinho.
      instance.reveal(".sec > .wrap, .footer > .wrap", {
        // Começa assim que a seção aponta na tela e desliza devagar, sem tranco.
        delay: 100,
        duration: 1100,
        reset: false, // anima uma vez por visita; depois fica fixo
        distance: "24px",
        origin: "bottom",
        easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        viewFactor: 0.1,
      });
      sr = instance;
    });
    return () => {
      alive = false;
      sr?.destroy();
    };
  }, []);

  return null;
}
