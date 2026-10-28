import { Logo } from "@/components/Logo";

const COLS = [
  {
    t: "Navegue",
    links: [
      { l: "Como funciona", h: "#como" },
      { l: "O que inclui", h: "#inclui" },
      { l: "Dúvidas", h: "#duvidas" },
      { l: "Contato", h: "#contato" },
    ],
  },
  {
    t: "Grupo Nexo",
    links: [
      { l: "nexo", h: "#" },
      { l: "nexo.tag", h: "#" },
    ],
  },
  {
    t: "Redes",
    links: [
      { l: "Instagram", h: "https://www.instagram.com/nexostudio.brr/" },
      { l: "YouTube", h: "#" },
    ],
  },
];

/** Rodapé: marca + colunas de links, barra legal e o nome "nexo.menu" grande fechando a página. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap ftr">
        <div className="ftr-top">
          <div className="ftr-brand">
            <Logo height={40} />
            <p className="serif ftr-line">
              Cardápio <em>em movimento</em>, em cada mesa.
            </p>
            <p className="ftr-place">Um produto do grupo Nexo · Petrolina, PE</p>
          </div>

          <div className="ftr-cols">
            {COLS.map((c) => (
              <nav key={c.t} aria-label={c.t} className="ftr-col">
                <h2 className="ftr-h">{c.t}</h2>
                <ul>
                  {c.links.map((k) => (
                    <li key={k.l}>
                      <a className="ftr-a" href={k.h}>{k.l}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="ftr-bar">
          <span>© {new Date().getFullYear()} Nexo</span>
          <nav aria-label="Legal" className="ftr-legal">
            <a className="ftr-a" href="#">Termos de uso</a>
            <a className="ftr-a" href="#">Política de privacidade</a>
          </nav>
          <a className="ftr-a ftr-top-link" href="#topo">Voltar ao topo ↑</a>
        </div>
      </div>
    </footer>
  );
}
