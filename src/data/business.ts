// Dados públicos da CUTTING CREW Barbershop.
// Origem: perfil da barbearia no Fresha e Linktree oficial (consultados em outubro de 2026).
// Tudo o que está aqui foi lido dessas fontes. O que falta validar está em CONTEUDOS_POR_CONFIRMAR.md.

export const business = {
  name: "CUTTING CREW",
  fullName: "CUTTING CREW Barbershop",
  // Nome que aparece depois do © no rodapé (o ano atualiza-se sozinho).
  copyrightHolder: "CUTTING CREW Barbershop",
  // Frase da bio do Linktree da barbearia.
  tagline: "Surpreendendo em todo corte. Cuidando de cada detalhe.",

  address: {
    street: "Rua Núcleo de Atletismo de Cucujães, 127",
    postalCode: "3720-780",
    locality: "Cucujães",
    region: "Aveiro",
  },
  // Texto usado para pesquisar a morada nos mapas.
  mapsQuery: "Rua Núcleo de Atletismo de Cucujães 127, 3720-780 Cucujães, Portugal",

  // Horário publicado no Fresha.
  hours: [
    { days: "Segunda-feira", time: "Fechado" },
    { days: "Terça a sábado", time: "09:00 – 20:00" },
    { days: "Domingo", time: "Fechado" },
  ],
  hoursSummary: "Terça a sábado, das 09:00 às 20:00",

  links: {
    // Perfil oficial no Fresha (URL fornecido no briefing). Todos os botões "Marcar agora" usam este link.
    fresha:
      "https://www.fresha.com/a/cutting-crew-barbershop-aveiro-rua-nucleo-de-atletismo-de-cucujaes-127-sme9odid",
    // Mesmo perfil, com a interface em português (alternativa do briefing).
    freshaPt:
      "https://www.fresha.com/pt-PT/a/cutting-crew-barbershop-aveiro-rua-nucleo-de-atletismo-de-cucujaes-127-sme9odid",
    // Ligações do Linktree oficial (sem parâmetros de rastreio).
    whatsapp: "https://wa.me/351960351733",
    // Conta oficial da barbearia. A @cutting_gu é uma conta pessoal do proprietário e não deve aparecer no site.
    instagram: "https://www.instagram.com/cuttingcrew.barbershop/",
  },
  handles: { instagram: "@cuttingcrew.barbershop" },
} as const;

export const mapsLinks = {
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapsQuery)}`,
  waze: `https://waze.com/ul?q=${encodeURIComponent(business.mapsQuery)}&navigate=yes`,
  embed: `https://www.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&hl=pt-PT&output=embed`,
};
