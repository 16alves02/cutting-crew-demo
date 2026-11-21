import { formatPrice, serviceGroups, services } from "../data/services.ts";
import "./services.css";

export default function Services() {
  return (
    <section className="services on-light" id="servicos" aria-labelledby="servicos-titulo">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title" id="servicos-titulo">Serviços</h2>
          <p className="section-lead">Do corte rápido ao pacote completo. Escolhe um serviço ou uma combinação e marca à tua hora.</p>
        </div>
        <div className="menu-board">
          {serviceGroups.map((g) => (
            <div key={g.id} className="menu-board__group">
              <h3 className="menu-board__title">{g.title}</h3>
              <ul>
                {services.filter((s) => s.group === g.group).map((s) => (
                  <li key={s.id} className="menu-item">
                    <div className="menu-item__row">
                      <h4 className="menu-item__name">{s.name}</h4>
                      <span className="menu-item__leader" aria-hidden="true" />
                      <span className={`menu-item__price${s.price === undefined ? " menu-item__price--nota" : ""}`}>
                        {s.price !== undefined ? formatPrice(s.price) : s.priceNote}
                      </span>
                    </div>
                    <p className="menu-item__meta">
                      <span>{s.duration}</span>
                      {s.description && <span>{s.description}</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}