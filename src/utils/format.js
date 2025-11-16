export function cmToMeters(cm) {
  const n = Number(cm);
  if (isNaN(n)) return "—";
  return `${(n / 100).toFixed(2)} m`;
}

export function formatDateNow() {
  const d = new Date();
  return d.toLocaleDateString("en-GB");
}
