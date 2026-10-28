import { Header } from "@/components/ScrollChrome";
import { FaqSection } from "@/components/FaqSection";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { HeroScrub } from "@/components/HeroScrub";
import { Footer } from "@/components/Footer";
import { Steps } from "@/components/Steps";
import { Panel } from "@/components/Panel";
import {
  BellIcon, BookIcon, CheckIcon, PanelIcon, PinIcon,
  RefreshIcon, TagIcon, VideoIcon,
} from "@/components/icons";

const INCLUDES = [
  { Icon: BookIcon, t: "Cardápio com a sua marca", d: "Cores, logo e fotos da casa." },
  { Icon: VideoIcon, t: "Vídeos dos pratos", d: "Filmamos e editamos de 8 a 10 pratos." },
  { Icon: TagIcon, t: "Tag em cada mesa", d: "NFC e QR Code em acrílico." },
  { Icon: BellIcon, t: "Garçom e conta pelo celular", d: "Direto do celular do cliente." },
  { Icon: PanelIcon, t: "Painel do salão", d: "Chamados em tempo real." },
  { Icon: RefreshIcon, t: "Atualizações incluídas", d: "Mudou o preço? Entre em contato." },
];

const PILOT = ["Setup completo", "Atualizações incluídas", "Acompanhamento no primeiro mês"];

export default function Home() {
  return (
    <div className="page">
      <a className="skip" href="#topo">Pular para o conteúdo</a>
      <Header />

      <main id="topo">
        {/* Hero */}
        <HeroScrub />

        {/* Como funciona */}
        <Steps />

        {/* Painel */}
        <Panel />

        {/* O que inclui */}
        <section id="inclui" className="sec">
          <div className="wrap g-inclui">
            <div className="inclui-head">
              <h2 className="serif h2 tight">Você não mexe em nada. A gente cuida.</h2>
              <p className="local">
                <PinIcon size={22} className="accent" />
                <span><strong>Gente daqui.</strong> Vamos até o seu restaurante em Petrolina.</span>
              </p>
            </div>
            <ul className="features">
              {INCLUDES.map(({ Icon, t, d }) => (
                <li className="feature" key={t}>
                  <Icon size={24} className="feature-icon" />
                  <div>
                    <h3 className="feature-title">{t}</h3>
                    <p className="body muted">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Piloto */}
        <section className="sec sec-light">
          <div className="wrap">
            <div className="pilot">
              <h2 className="serif h2 tight pilot-title">Seja o primeiro restaurante da nexo em Petrolina.</h2>
              <p className="body pilot-sub">Preço de lançamento em troca do seu depoimento.</p>
              <ul className="pilot-list">
                {PILOT.map((t) => (
                  <li key={t}>
                    <CheckIcon size={20} />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="caption pilot-note">Poucas vagas de piloto.</p>
            </div>
          </div>
        </section>

        {/* Dúvidas */}
        <FaqSection />

        {/* CTA final */}
        <section className="sec">
          <div className="wrap final">
            <h2 className="serif h2xl tight">Vamos montar o seu cardápio?</h2>
          
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="sec sec-tint">
          <div className="wrap g-faq">
            <div className="contact-copy sec-title">
              <p className="body muted">Prefere escrever? Deixe sua mensagem aqui.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />

      <Reveal />
    </div>
  );
}
