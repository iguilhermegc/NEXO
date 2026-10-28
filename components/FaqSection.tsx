"use client";

import { useState } from "react";

const FAQ = [
  { q: "O cliente precisa baixar algum aplicativo?", a: "Não. A página abre direto no navegador, pelo NFC ou pelo QR Code." },
  { q: "E se o celular do cliente não tiver NFC?", a: "Toda tag tem também um QR Code, que funciona em qualquer câmera." },
  { q: "Preciso de algum equipamento?", a: "Só um celular ou tablet no salão para receber os chamados." },
  { q: "Quem atualiza o cardápio?", a: "A gente. Você manda a mudança pelo WhatsApp e nós atualizamos." },
  { q: "Alguém pode trocar o link da tag?", a: "Não. A tag é gravada com um link da Nexo e travada contra regravação." },
];

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="duvidas" className="sec sec-brown fq">
      <div className="wrap fq-grid">
        <div className="fq-side">
          <h2 className="serif h2 tight">
            Dúvidas <em>comuns</em>.
          </h2>
          <p className="body muted">O que os donos de restaurante mais perguntam antes de começar.</p>
          <div className="fq-help">
            <p><strong>Ficou alguma dúvida?</strong> A gente responde no mesmo dia.</p>
          </div>
        </div>

        <ol className="fq-list">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={`fq-item${isOpen ? " is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    className="fq-q"
                    id={`fq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`fq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="serif fq-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="fq-text">{item.q}</span>
                    <span className="fq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`fq-a-${i}`}
                  role="region"
                  aria-labelledby={`fq-q-${i}`}
                  className="fq-a"
                  inert={!isOpen}
                >
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
