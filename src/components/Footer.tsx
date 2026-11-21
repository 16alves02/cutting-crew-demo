import { useSyncExternalStore } from "react";
import { business } from "../data/business.ts";
import { navLinks } from "../data/navigation.ts";
import { ExtLink } from "./ExtLink.tsx";
import "./footer.css";

const ANO_COMPILACAO = __ANO_COMPILACAO__;
const semSubscricao = () => () => {};
const anoAtual = () => new Date().getFullYear();

export default function Footer() {
  const ano = useSyncExternalStore(semSubscricao, anoAtual, () => ANO_COMPILACAO);
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="site-footer__grid">
          <p className="site-footer__tagline">{business.tagline}</p>
          <nav aria-label="Rodapé">
            <h2 className="site-footer__title">Navegar</h2>
            <ul>{navLinks.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </nav>
          <div>
            <h2 className="site-footer__title">Segue-nos</h2>
            <ul>
              <li><ExtLink href={business.links.instagram}>Instagram</ExtLink></li>
              <li><ExtLink href={business.links.whatsapp}>WhatsApp</ExtLink></li>
            </ul>
          </div>
        </div>
        <p className="site-footer__legal">
          © <span data-testid="ano">{ano}</span> {business.copyrightHolder}. Protótipo de website, ainda não oficial.
        </p>
      </div>
    </footer>
  );
}
