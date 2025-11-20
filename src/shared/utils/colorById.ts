export function colorFromId(id: number): string {
  const hash = (id * 2654435761) % 0xffffffff;
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  return `rgb(${r}, ${g}, ${b})`;
}