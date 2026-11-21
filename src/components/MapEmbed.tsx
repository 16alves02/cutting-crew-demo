import { useState } from "react";
import { business, mapsLinks } from "../data/business.ts";

// O mapa da Google só carrega depois de um clique: poupa dados, não envia nada à Google
// sem o visitante querer e não atrasa a página.
export function MapEmbed() {
  const [on, setOn] = useState(false);
  return (
    <div className="map">
      {on ? (
        <iframe
          title={`Mapa: ${business.fullName}`}
          src={mapsLinks.embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map__facade">
          <p>{business.address.street}</p>
          <button type="button" className="btn btn--solid" onClick={() => setOn(true)}>
            Mostrar mapa
          </button>
          <small className="map__note">Ao mostrar o mapa, o Google recebe o teu pedido e pode usar cookies.</small>
        </div>
      )}
    </div>
  );
}
