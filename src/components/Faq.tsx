import "./faq.css";

export default function Faq() {
  return (
    <section className="faq on-white" id="perguntas" aria-labelledby="perguntas-titulo">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title" id="perguntas-titulo">Perguntas</h2>
          <p className="section-lead">O que costumam perguntar antes da primeira visita.</p>
        </div>
        <ul className="faq__list">
          <li className="faq__item">
            <details>
              <summary className="faq__q">Como marco o meu corte?<span className="roster__icon" aria-hidden="true" /></summary>
              <div className="faq__a"><p>Pelo botão Marcar agora, que abre a agenda online. Escolhes o serviço, o dia e a hora. Também podes mandar mensagem por WhatsApp.</p></div>
            </details>
          </li>
          <li className="faq__item">
            <details>
              <summary className="faq__q">Qual é o horário?<span className="roster__icon" aria-hidden="true" /></summary>
              <div className="faq__a"><p>Abrimos de terça a sábado, das 09:00 às 20:00. Domingo e segunda-feira estão fechados.</p></div>
            </details>
          </li>
          <li className="faq__item">
            <details>
              <summary className="faq__q">Quanto custa um corte?<span className="roster__icon" aria-hidden="true" /></summary>
              <div className="faq__a"><p>O corte de cabelo custa 13 €, a barba 11 € e a combinação de cabelo e barba 20 €. A lista completa está na secção Serviços.</p></div>
            </details>
          </li>
          <li className="faq__item">
            <details>
              <summary className="faq__q">O que inclui a limpeza de pele?<span className="roster__icon" aria-hidden="true" /></summary>
              <div className="faq__a"><p>Higienização e esfoliação de toda a face, com massagem facial incluída.</p></div>
            </details>
          </li>
          <li className="faq__item">
            <details>
              <summary className="faq__q">Quanto custam as madeixas?<span className="roster__icon" aria-hidden="true" /></summary>
              <div className="faq__a"><p>Depende do trabalho. O valor é definido depois de avaliarmos o cabelo, e o serviço demora cerca de 2 horas.</p></div>
            </details>
          </li>
          <li className="faq__item">
            <details>
              <summary className="faq__q">Onde ficam?<span className="roster__icon" aria-hidden="true" /></summary>
              <div className="faq__a"><p>Na Rua Núcleo de Atletismo de Cucujães, 127, em Cucujães. Na secção Localização tens o mapa e as indicações.</p></div>
            </details>
          </li>
        </ul>
      </div>
    </section>
  );
}
