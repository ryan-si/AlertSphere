export function getColorForDisease(diseaseName) {
  let hash = 0;

  for (let i = 0; i < diseaseName.length; i++) {
    const char = diseaseName.charCodeAt(i);
    // 为了增加复杂性，我们使用位操作和一些数学函数
    hash = (hash << 5) - hash + char;
    hash |= 0; // 转换为32位整数
  }

  // 使用哈希值的绝对值确保颜色的正数值
  hash = Math.abs(hash);

  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  return `rgb(${r},${g},${b})`;
}
