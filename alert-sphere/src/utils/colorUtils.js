export function getColorForDisease(diseaseName) {
    const hash = diseaseName.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);

    // Use the number to generate a color
    const hue = hash % 360;  // Hue value
    return `hsl(${hue}, 50%, 50%)`;
}