// js/illustrations.js
// Thư viện tạo hình minh họa SVG cho các bài học Toán 6 (không phụ thuộc ảnh ngoài).

export function numberLine({ min = -5, max = 5, points = [], height = 90, highlightRanges = [] } = {}) {
  const w = 640, pad = 30;
  const scale = (w - pad * 2) / (max - min);
  const x = (v) => pad + (v - min) * scale;
  const y = height / 2;
  let ticks = '';
  for (let i = min; i <= max; i++) {
    const tx = x(i);
    ticks += `<line x1="${tx}" y1="${y - 7}" x2="${tx}" y2="${y + 7}" stroke="#94a3b8" stroke-width="2"/>`;
    ticks += `<text x="${tx}" y="${y + 26}" font-size="15" text-anchor="middle" fill="#475569">${i}</text>`;
  }
  let ranges = highlightRanges.map(r => `<rect x="${x(r.from)}" y="${y - 5}" width="${x(r.to) - x(r.from)}" height="10" fill="${r.color || '#93c5fd'}" opacity="0.55" rx="4"/>`).join('');
  let dots = points.map(p => `
    <circle cx="${x(p.value)}" cy="${y}" r="8" fill="${p.color || '#ef4444'}" stroke="white" stroke-width="2"/>
    <text x="${x(p.value)}" y="${y - 16}" font-size="15" font-weight="700" text-anchor="middle" fill="${p.color || '#ef4444'}">${p.label ?? p.value}</text>`).join('');
  return `<svg viewBox="0 0 ${w} ${height}" class="illus" role="img" aria-label="Trục số">
    ${ranges}
    <line x1="${pad - 10}" y1="${y}" x2="${w - pad + 10}" y2="${y}" stroke="#64748b" stroke-width="3" marker-end="url(#arrow)" />
    <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#64748b"/></marker></defs>
    ${ticks}${dots}
  </svg>`;
}

export function polygonShape({ type = 'square', color = '#4F8EF7', labels = true, sideLabel = 'a' } = {}) {
  const shapes = {
    square: { pts: [[60,20],[220,20],[220,180],[60,180]], right: [[60,20]] },
    rectangle: { pts: [[30,50],[250,50],[250,160],[30,160]], right: [[30,50]] },
    rhombus: { pts: [[140,15],[245,100],[140,185],[35,100]] },
    parallelogram: { pts: [[70,25],[250,25],[210,175],[30,175]] },
    trapezoid: { pts: [[90,25],[190,25],[250,175],[30,175]] },
    triangleEquilateral: { pts: [[140,20],[250,180],[30,180]] },
  };
  const s = shapes[type] || shapes.square;
  const pts = s.pts.map(p => p.join(',')).join(' ');
  const cx = s.pts.reduce((a,p)=>a+p[0],0)/s.pts.length;
  const cy = s.pts.reduce((a,p)=>a+p[1],0)/s.pts.length;
  let sideText = '';
  if (labels) {
    for (let i = 0; i < s.pts.length; i++) {
      const [x1,y1] = s.pts[i];
      const [x2,y2] = s.pts[(i+1)%s.pts.length];
      const mx = (x1+x2)/2, my = (y1+y2)/2;
      const dx = mx - cx, dy = my - cy;
      const len = Math.hypot(dx,dy) || 1;
      const lx = mx + dx/len*16, ly = my + dy/len*16;
      sideText += `<text x="${lx}" y="${ly}" font-size="14" text-anchor="middle" fill="#334155" font-weight="600">${sideLabel}${s.pts.length>4?'':(i+1)}</text>`;
    }
  }
  return `<svg viewBox="0 0 280 200" class="illus" role="img" aria-label="${type}">
    <polygon points="${pts}" fill="${color}" fill-opacity="0.22" stroke="${color}" stroke-width="4" stroke-linejoin="round"/>
    ${sideText}
  </svg>`;
}

export function symmetryAxis({ color = '#EF5DA8' } = {}) {
  // Con bướm đối xứng qua trục dọc
  return `<svg viewBox="0 0 260 200" class="illus" role="img" aria-label="Đối xứng trục">
    <line x1="130" y1="10" x2="130" y2="190" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 6"/>
    <path d="M130,60 C90,10 20,30 25,80 C28,110 80,110 130,90" fill="${color}" fill-opacity="0.75"/>
    <path d="M130,60 C170,10 240,30 235,80 C232,110 180,110 130,90" fill="${color}" fill-opacity="0.75"/>
    <path d="M130,90 C100,120 70,150 90,180 C105,195 125,160 130,130" fill="${color}" fill-opacity="0.5"/>
    <path d="M130,90 C160,120 190,150 170,180 C155,195 135,160 130,130" fill="${color}" fill-opacity="0.5"/>
    <line x1="130" y1="55" x2="130" y2="135" stroke="#334155" stroke-width="4"/>
  </svg>`;
}

export function symmetryCenter({ color = '#17B6C4' } = {}) {
  return `<svg viewBox="0 0 220 220" class="illus" role="img" aria-label="Đối xứng tâm">
    <circle cx="110" cy="110" r="4" fill="#334155"/>
    <path d="M110,110 L110,20 A90,90 0 0,1 200,110 Z" fill="${color}" fill-opacity="0.75"/>
    <path d="M110,110 L110,200 A90,90 0 0,1 20,110 Z" fill="${color}" fill-opacity="0.75"/>
    <path d="M110,110 L200,110 A90,90 0 0,1 110,200 Z" fill="${color}" fill-opacity="0.35"/>
    <path d="M110,110 L20,110 A90,90 0 0,1 110,20 Z" fill="${color}" fill-opacity="0.35"/>
  </svg>`;
}

export function barChart({ data = [], color = '#4F8EF7', unit = '' } = {}) {
  const w = 560, h = 260, pad = 40;
  const max = Math.max(...data.map(d => d.value), 1);
  const bw = (w - pad * 2) / data.length;
  let bars = data.map((d, i) => {
    const bh = (h - pad * 2) * (d.value / max);
    const x = pad + i * bw + bw * 0.15;
    const y = h - pad - bh;
    return `<rect x="${x}" y="${y}" width="${bw*0.7}" height="${bh}" rx="6" fill="${d.color || color}"/>
      <text x="${x + bw*0.35}" y="${y - 8}" font-size="14" text-anchor="middle" font-weight="700" fill="#334155">${d.value}${unit}</text>
      <text x="${x + bw*0.35}" y="${h - pad + 20}" font-size="13" text-anchor="middle" fill="#475569">${d.label}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" class="illus" role="img" aria-label="Biểu đồ cột">
    <line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="#94a3b8" stroke-width="2"/>
    ${bars}
  </svg>`;
}

export function pieSpinner({ segments = [{ value: 1, color: '#4F8EF7', label: 'A' }] } = {}) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  const cx = 110, cy = 110, r = 95;
  let angle = -90, paths = '';
  segments.forEach(s => {
    const sweep = (s.value / total) * 360;
    const x1 = cx + r * Math.cos(angle * Math.PI / 180);
    const y1 = cy + r * Math.sin(angle * Math.PI / 180);
    const end = angle + sweep;
    const x2 = cx + r * Math.cos(end * Math.PI / 180);
    const y2 = cy + r * Math.sin(end * Math.PI / 180);
    const large = sweep > 180 ? 1 : 0;
    const midA = (angle + end) / 2 * Math.PI / 180;
    const lx = cx + r * 0.6 * Math.cos(midA), ly = cy + r * 0.6 * Math.sin(midA);
    paths += `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z" fill="${s.color}" stroke="white" stroke-width="2"/>`;
    paths += `<text x="${lx}" y="${ly}" font-size="15" font-weight="700" fill="white" text-anchor="middle">${s.label}</text>`;
    angle = end;
  });
  return `<svg viewBox="0 0 220 220" class="illus" role="img" aria-label="Vòng quay xác suất">${paths}<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#334155" stroke-width="3"/></svg>`;
}

export function fractionCircle({ n = 1, d = 4, color = '#F2545B' } = {}) {
  const cx = 100, cy = 100, r = 88;
  let slices = '';
  for (let i = 0; i < d; i++) {
    const a1 = (-90 + i * 360 / d) * Math.PI / 180;
    const a2 = (-90 + (i + 1) * 360 / d) * Math.PI / 180;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const large = 360 / d > 180 ? 1 : 0;
    const filled = i < n;
    slices += `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z" fill="${filled ? color : '#fff'}" fill-opacity="${filled ? 0.85 : 1}" stroke="${color}" stroke-width="2.5"/>`;
  }
  return `<svg viewBox="0 0 200 200" class="illus" role="img" aria-label="Phân số ${n}/${d}">${slices}</svg>`;
}

export function fractionBar({ n = 1, d = 4, color = '#F2545B', w = 400, h = 70 } = {}) {
  let cells = '';
  const cw = w / d;
  for (let i = 0; i < d; i++) {
    cells += `<rect x="${i * cw}" y="0" width="${cw}" height="${h}" fill="${i < n ? color : '#fff'}" fill-opacity="${i < n ? 0.85 : 1}" stroke="${color}" stroke-width="2.5"/>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" class="illus" role="img" aria-label="Phân số ${n}/${d}">${cells}</svg>`;
}

export function percentGrid({ percent = 25, color = '#A56CF2' } = {}) {
  const cells = [];
  const filled = Math.round(percent);
  for (let i = 0; i < 100; i++) {
    const x = (i % 10) * 20, y = Math.floor(i / 10) * 20;
    cells.push(`<rect x="${x}" y="${y}" width="19" height="19" fill="${i < filled ? color : '#f1f5f9'}" fill-opacity="${i < filled ? 0.85 : 1}" stroke="#cbd5e1" stroke-width="1"/>`);
  }
  return `<svg viewBox="0 0 200 200" class="illus" role="img" aria-label="${percent}%">${cells.join('')}</svg>`;
}

export function angleDiagram({ degrees = 60, label = '' } = {}) {
  const cx = 30, cy = 190, r = 150;
  const a2 = -degrees * Math.PI / 180;
  const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
  const large = degrees > 180 ? 1 : 0;
  const ar = 40;
  const ax2 = cx + ar * Math.cos(a2), ay2 = cy + ar * Math.sin(a2);
  const midA = (-degrees/2) * Math.PI/180;
  const lx = cx + (ar+22) * Math.cos(midA), ly = cy + (ar+22) * Math.sin(midA);
  return `<svg viewBox="0 0 260 210" class="illus" role="img" aria-label="Góc ${degrees} độ">
    <line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#334155" stroke-width="4"/>
    <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#334155" stroke-width="4"/>
    <path d="M${cx+ar},${cy} A${ar},${ar} 0 ${large} 1 ${ax2},${ay2}" fill="none" stroke="#F79A3E" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#334155"/>
    <text x="${lx}" y="${ly}" font-size="16" font-weight="700" fill="#F79A3E" text-anchor="middle">${label || degrees + '°'}</text>
  </svg>`;
}

export function parallelLines() {
  return `<svg viewBox="0 0 260 200" class="illus" role="img" aria-label="Hai đường thẳng song song">
    <line x1="20" y1="60" x2="240" y2="60" stroke="#4F8EF7" stroke-width="4"/>
    <line x1="20" y1="150" x2="240" y2="150" stroke="#4F8EF7" stroke-width="4"/>
    <line x1="70" y1="10" x2="190" y2="195" stroke="#F2545B" stroke-width="4"/>
    <text x="14" y="55" font-size="15" fill="#334155">a</text>
    <text x="14" y="145" font-size="15" fill="#334155">b</text>
    <text x="195" y="20" font-size="15" fill="#334155">c</text>
    <text x="105" y="45" font-size="14" fill="#F79A3E" font-weight="700">1</text>
    <text x="120" y="140" font-size="14" fill="#F79A3E" font-weight="700">2</text>
  </svg>`;
}

export function clockFace({ hour = 3, minute = 0 } = {}) {
  const cx = 100, cy = 100, r = 88;
  const hAngle = ((hour % 12) + minute / 60) * 30 - 90;
  const mAngle = minute * 6 - 90;
  const hx = cx + 46 * Math.cos(hAngle * Math.PI/180), hy = cy + 46 * Math.sin(hAngle * Math.PI/180);
  const mx = cx + 70 * Math.cos(mAngle * Math.PI/180), my = cy + 70 * Math.sin(mAngle * Math.PI/180);
  let ticks = '';
  for (let i = 0; i < 12; i++) {
    const a = i * 30 * Math.PI / 180 - Math.PI/2;
    const x1 = cx + (r-6) * Math.cos(a), y1 = cy + (r-6) * Math.sin(a);
    const x2 = cx + r * Math.cos(a), y2 = cy + r * Math.sin(a);
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#334155" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 200 200" class="illus" role="img" aria-label="Đồng hồ ${hour} giờ ${minute} phút">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#334155" stroke-width="3"/>
    ${ticks}
    <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="#F2545B" stroke-width="3" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#334155"/>
  </svg>`;
}

export function thermometer({ value = -5, min = -20, max = 40, color='#7C5CFC' } = {}) {
  const h = 220, top = 20, bottom = 190;
  const frac = (value - min) / (max - min);
  const fillY = bottom - frac * (bottom - top);
  return `<svg viewBox="0 0 100 240" class="illus" role="img" aria-label="Nhiệt kế ${value} độ C">
    <rect x="40" y="${top}" width="20" height="${bottom-top}" rx="10" fill="#e2e8f0"/>
    <rect x="40" y="${fillY}" width="20" height="${bottom-fillY}" rx="10" fill="${value<0?'#3EA6F7':'#F2545B'}"/>
    <circle cx="50" cy="205" r="22" fill="${value<0?'#3EA6F7':'#F2545B'}"/>
    <text x="50" y="235" font-size="16" text-anchor="middle" font-weight="700" fill="#334155">${value}°C</text>
  </svg>`;
}

export function factorTree() {
  return `<svg viewBox="0 0 300 220" class="illus" role="img" aria-label="Sơ đồ cây phân tích ra thừa số nguyên tố">
    <g font-size="16" font-weight="700" text-anchor="middle" fill="#0f172a">
      <line x1="150" y1="30" x2="90" y2="80" stroke="#94a3b8" stroke-width="2"/>
      <line x1="150" y1="30" x2="210" y2="80" stroke="#94a3b8" stroke-width="2"/>
      <line x1="90" y1="95" x2="55" y2="145" stroke="#94a3b8" stroke-width="2"/>
      <line x1="90" y1="95" x2="125" y2="145" stroke="#94a3b8" stroke-width="2"/>
      <line x1="210" y1="95" x2="175" y2="145" stroke="#94a3b8" stroke-width="2"/>
      <line x1="210" y1="95" x2="245" y2="145" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="150" cy="20" r="22" fill="#22B27C" fill-opacity="0.25" stroke="#22B27C" stroke-width="2.5"/>
      <text x="150" y="26">60</text>
      <circle cx="90" cy="88" r="20" fill="#22B27C" fill-opacity="0.25" stroke="#22B27C" stroke-width="2.5"/>
      <text x="90" y="94">6</text>
      <circle cx="210" cy="88" r="20" fill="#22B27C" fill-opacity="0.25" stroke="#22B27C" stroke-width="2.5"/>
      <text x="210" y="94">10</text>
      <circle cx="55" cy="160" r="18" fill="#F2545B" fill-opacity="0.25" stroke="#F2545B" stroke-width="2.5"/>
      <text x="55" y="165">2</text>
      <circle cx="125" cy="160" r="18" fill="#F2545B" fill-opacity="0.25" stroke="#F2545B" stroke-width="2.5"/>
      <text x="125" y="165">3</text>
      <circle cx="175" cy="160" r="18" fill="#F2545B" fill-opacity="0.25" stroke="#F2545B" stroke-width="2.5"/>
      <text x="175" y="165">2</text>
      <circle cx="245" cy="160" r="18" fill="#F2545B" fill-opacity="0.25" stroke="#F2545B" stroke-width="2.5"/>
      <text x="245" y="165">5</text>
    </g>
    <text x="150" y="205" font-size="14" text-anchor="middle" fill="#475569">60 = 2² × 3 × 5</text>
  </svg>`;
}
