import "./team.css";

const slots = ["Barbeiro", "Barbeiro", "Barbeiro"];

export default function Team() {
  return (
    <section className="team on-white" id="equipa" aria-labelledby="equipa-titulo">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title" id="equipa-titulo">Equipa</h2>
          <p className="section-lead">Cada profissional com a sua fotografia, especialidade e ligação direta à sua agenda.</p>
        </div>
        <ul className="tm-grid">
          {slots.map((r, i) => (
            <li key={i} className="tm">
              <div className="tm__photo" role="img" aria-label="Espaço reservado para fotografia" />
              <h3 className="tm__name">Nome a definir</h3>
              <p className="tm__role">{r} · especialidade</p>
              <span className="tm__cta">Marcar com este profissional</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
