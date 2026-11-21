import "./gallery.css";

const slots = ["Degradé", "Barba", "Textura", "Risco", "Acabamento", "O espaço"];

export default function Gallery() {
  return (
    <section className="gallery on-dark" id="galeria" aria-labelledby="galeria-titulo">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title" id="galeria-titulo">Galeria</h2>
          <p className="section-lead">O trabalho da casa em destaque. Aqui entram as fotografias da própria barbearia.</p>
        </div>
        <ul className="ph-grid">
          {slots.map((s, i) => (
            <li key={s} className={`ph ph--${i + 1}`} role="img" aria-label={`Espaço reservado: ${s}`}>
              <span className="ph__title">{s}</span>
              <span className="ph__note">Fotografia da barbearia</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
