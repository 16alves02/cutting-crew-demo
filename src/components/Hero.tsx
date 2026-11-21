import { business } from "../data/business.ts";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero on-dark" id="top" aria-label="Apresentação">
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__reveal">
        <div className="container hero__content">
          <p className="hero__meta">{business.fullName} · {business.address.locality}, {business.address.region}</p>
          <h1 className="hero__title hero__title--pt">
            <span className="hero__line">Surpreendendo</span>
            <span className="hero__line">em todo corte.</span>
          </h1>
          <div className="hero__text">
            <p className="hero__lead">Cuidando de cada detalhe.</p>
            <p className="hero__meta">Aberto de terça a sábado, das 09:00 às 20:00. Marca online em poucos toques.</p>
            <div className="hero__actions">
              <a className="btn btn--solid btn--lg" href={business.links.fresha} target="_blank" rel="noopener noreferrer">Marcar agora<span className="sr-only"> (abre num novo separador)</span></a>
              <a className="btn btn--line btn--lg" href="#servicos">Ver serviços</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
