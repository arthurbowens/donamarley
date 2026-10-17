/** Placeholder de produto no visual da loja (sem fotos aleatórias externas). */
export function buildProductPlaceholder(name: string, category: string): string {
  const label = name.length > 28 ? `${name.slice(0, 26)}…` : name;
  const tag = category.length > 20 ? `${category.slice(0, 18)}…` : category;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F8F1ED"/>
      <stop offset="100%" stop-color="#E7D5C7"/>
    </linearGradient>
  </defs>
  <rect width="480" height="480" fill="url(#bg)"/>
  <circle cx="380" cy="100" r="56" fill="#B97983" opacity="0.25"/>
  <circle cx="90" cy="360" r="72" fill="#B97983" opacity="0.18"/>
  <g transform="translate(240 210)">
    <rect x="-70" y="-120" width="140" height="200" rx="28" fill="#FFFFFF" stroke="#B97983" stroke-width="3"/>
    <rect x="-35" y="-150" width="70" height="36" rx="10" fill="#B97983"/>
    <rect x="-50" y="-40" width="100" height="12" rx="6" fill="#E7D5C7"/>
    <rect x="-50" y="-18" width="100" height="12" rx="6" fill="#E7D5C7"/>
  </g>
  <text x="240" y="372" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#49343B">${escapeXml(label)}</text>
  <text x="240" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" letter-spacing="2" fill="#B97983">${escapeXml(tag.toUpperCase())}</text>
  <text x="240" y="430" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#49343B" opacity="0.55">IMAGEM ILUSTRATIVA</text>
</svg>`.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
