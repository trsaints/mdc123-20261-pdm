export function formatCurrency(value) {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}

export default formatCurrency;
