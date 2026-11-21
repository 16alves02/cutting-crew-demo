import { services } from "../data/services.ts";
import "./facts.css";

const precoMin = Math.min(...services.filter((s) => s.price !== undefined).map((s) => s.price as number));

const facts = [
  { value: "Ter a Sáb", label: "09:00 às 20:00" },
  { value: String(services.length), label: "Serviços e combinações" },
  { value: `Desde ${precoMin}\u00a0€`, label: "Preços à vista, sem surpresas" },
  { value: "Online", label: "Marcação em poucos toques" },
];

export default function Facts() {
  return (
    <section className="facts on-white" aria-label="Em resumo">
      <div className="container">
        <dl className="facts__list">
          {facts.map((f) => (
            <div key={f.label} className="facts__item">
              <dt className="facts__label">{f.label}</dt>
              <dd className="facts__value">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
