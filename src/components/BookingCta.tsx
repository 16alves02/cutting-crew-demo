import { business } from "../data/business.ts";
import { ExtLink } from "./ExtLink.tsx";
import "./booking.css";

export default function BookingCta() {
  return (
    <section className="booking on-dark" id="marcacao" aria-labelledby="marcacao-titulo">
      <div className="container booking__grid">
        <div>
          <h2 className="booking__title" id="marcacao-titulo">
            <span>Marca</span>
            <span>a tua vez.</span>
          </h2>
          <p className="booking__lead">Escolhe o serviço e a hora que te dá jeito. Se preferires, fala connosco por WhatsApp.</p>
          <div className="booking__actions">
            <ExtLink className="btn btn--solid btn--lg" href={business.links.fresha}>Marcar agora</ExtLink>
            <ExtLink className="btn btn--line btn--lg" href={business.links.whatsapp}>WhatsApp</ExtLink>
          </div>
        </div>
      </div>
    </section>
  );
}
