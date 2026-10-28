"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Header() {
  const scrolled = useScrollState();
  return (
    <header className={`hdr${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap hdr-inner">
        <a href="#topo" className="wordmark" aria-label="nexo.menu, voltar ao topo">
          <Logo height={46} priority />
        </a>
        <div className="hdr-right">
          <nav className="hdr-links" aria-label="Seções">
            <a className="navlnk" href="#como">Como funciona</a>
            <a className="navlnk" href="#inclui">O que inclui</a>
            <a className="navlnk" href="#duvidas">Dúvidas</a>
          </nav>
          <a className="btn btn-sm" href="#contato">
            Entre em contato
          </a>
        </div>
      </div>
    </header>
  );
}

function useScrollState() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}
