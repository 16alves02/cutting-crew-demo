// Serviços, durações e preços lidos no perfil do Fresha (outubro de 2026), nas páginas
// "Serviços" e "Selecionar serviços". O Fresha indica 17 serviços e estão aqui os 17
// (lista completa do passo "Selecionar serviços", 26/10/2026). A descrição só existe onde o próprio Fresha a mostra.
// A ordem dentro de cada grupo é a do Fresha, agrupada por tipo.

export type Service = {
  id: string;
  name: string;
  /** Texto do Fresha, quando existe. */
  description?: string;
  duration: string;
  /** Preço em euros. Sem preço fixo: usar `priceNote`. */
  price?: number;
  /** Texto no lugar do preço (ex.: serviços sem preço fixo). */
  priceNote?: string;
  group: "individual" | "combo";
};

export const services: Service[] = [
  { id: "cabelo", name: "Cabelo", duration: "30 min", price: 13, group: "individual" },
  { id: "barba", name: "Barba", duration: "30 min", price: 11, group: "individual" },
  { id: "sobrancelha", name: "Sobrancelha", duration: "5 min", price: 4, group: "individual" },
  { id: "acabamento", name: "Acabamento", duration: "5 min", price: 5, group: "individual" },
  { id: "hidratacao", name: "Hidratação", duration: "30 min", price: 10, group: "individual" },
  {
    id: "limpeza-de-pele",
    name: "Limpeza de pele",
    description: "Higienização e esfoliação de toda a face (inclui massagem facial).",
    duration: "30 min",
    price: 12,
    group: "individual",
  },
  {
    id: "pigmentacao",
    name: "Pigmentação",
    description: "Tingimento no tom preto para realçar detalhes do corte.",
    duration: "30 min",
    price: 12,
    group: "individual",
  },
  { id: "madeixas", name: "Madeixas", duration: "2 h", priceNote: "Valor mediante avaliação", group: "individual" },
  { id: "nariz", name: "Depilação com cera (nariz)", duration: "10 min", price: 6, group: "individual" },
  { id: "orelha", name: "Depilação com cera (orelha)", duration: "10 min", price: 6, group: "individual" },
  { id: "nariz-orelha", name: "Depilação com cera (nariz e orelha)", duration: "15 min", price: 8, group: "individual" },

  { id: "cabelo-sobrancelha", name: "Cabelo e sobrancelha", duration: "30 min", price: 16, group: "combo" },
  { id: "cabelo-barba", name: "Cabelo e barba", duration: "1 h", price: 20, group: "combo" },
  { id: "cabelo-barba-sobrancelha", name: "Cabelo, barba e sobrancelha", duration: "1 h", price: 23, group: "combo" },
  { id: "cabelo-hidratacao", name: "Cabelo e hidratação", duration: "30 min", price: 16, group: "combo" },
  { id: "cabelo-limpeza", name: "Cabelo e limpeza de pele", duration: "1 h", price: 25, group: "combo" },
  { id: "cabelo-pigmentacao", name: "Cabelo e pigmentação", duration: "1 h", price: 25, group: "combo" },
];

export const serviceGroups = [
  { id: "individuais", title: "Individuais", group: "individual" as const },
  { id: "combinacoes", title: "Combinações", group: "combo" as const },
];

export const formatPrice = (euros: number) => `${euros}\u00a0€`;
