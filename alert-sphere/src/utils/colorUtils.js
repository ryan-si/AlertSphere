export function getColorForDisease(diseaseName) {
  let hash = 0;

  for (let i = 0; i < diseaseName.length; i++) {
    const char = diseaseName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  hash = Math.abs(hash);

  const r = (hash % 128) + 128; 
  const g = ((hash & 0x00ff00) >> 8) % 128+64; 
  const b = (hash & 0x0000ff) % 128+64; 

  return `rgb(${r},${g},${b})`;
}
