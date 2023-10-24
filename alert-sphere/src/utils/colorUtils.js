export function getColorForDisease(diseaseName) {
  let hash = 0;

  for (let i = 0; i < diseaseName.length; i++) {
    const char = diseaseName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  hash = Math.abs(hash);

  const r = ((hash & 0xff0000) >> 16) % 128; // 限制在0-127
  const g = ((hash & 0x00ff00) >> 8) % 128; // 限制在0-127
  const b = (hash & 0x0000ff) % 128; // 限制在0-127

  return `rgb(${r},${g},${b})`;
}
