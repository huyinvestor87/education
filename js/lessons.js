// js/lessons.js — Kịch bản "video hoạt hình" cho từng chương.
// Mỗi cảnh: { title, caption, dur (giây), draw(t) -> chuỗi SVG }, t chạy 0 → 1.
import { lerp, clamp, ease, easeOut, stagger, phase, vi, svg, label, emoji, hopArc, axis, axisX, resultBox } from './anim.js?v=__BUILD_ID__';
import { L } from './i18n.js?v=__BUILD_ID__';

const BG = (accent) => `<rect x="0" y="0" width="640" height="380" rx="18" fill="${accent}" fill-opacity="0.05"/>`;
const scene = (title, caption, dur, draw) => ({ title, caption, dur, draw });

/** Nhiệt kế đặt tại (x,y), cao h, hiển thị giá trị value trong khoảng [min,max]. */
function thermo(x, y, h, value, min = -20, max = 20) {
  const frac = clamp((value - min) / (max - min));
  const top = y - h, fillY = y - frac * h;
  const col = value < 0 ? '#3EA6F7' : '#F2545B';
  return `<rect x="${x - 13}" y="${top}" width="26" height="${h}" rx="13" fill="#e2e8f0"/>
    <rect x="${x - 13}" y="${fillY}" width="26" height="${y - fillY}" rx="13" fill="${col}"/>
    <circle cx="${x}" cy="${y + 20}" r="26" fill="${col}"/>
    ${label(x, y + 28, `${value > 0 ? '+' : ''}${value}°`, { size: 17, color: '#fff' })}`;
}

/** Ô vuông đơn vị dùng minh hoạ diện tích/lũy thừa. */
function cell(x, y, s, color, opacity) {
  return `<rect x="${x}" y="${y}" width="${s - 4}" height="${s - 4}" rx="6" fill="${color}" fill-opacity="${0.75 * opacity}" stroke="${color}" stroke-width="2" opacity="${opacity}"/>`;
}

// ============================================================ CHƯƠNG 1
const c1 = [
  scene('Đếm đồ vật', 'Khi đếm số quả táo trong giỏ, ta dùng các số tự nhiên: không, một, hai, ba... Tập hợp các số tự nhiên được kí hiệu là N.', 7, (t) => {
    const n = 7; let items = '', count = 0;
    for (let i = 0; i < n; i++) {
      const p = stagger(t, i, n);
      if (p > 0.5) count++;
      const x = 130 + (i % 4) * 108, y = 150 + Math.floor(i / 4) * 96;
      items += emoji(x, y - 26 * (1 - easeOut(p)), '🍎', 52, p);
    }
    return svg(`${BG('#4F8EF7')}${items}
      ${label(320, 60, L('Đếm số quả táo', 'Counting the apples'), { size: 26, color: '#4F8EF7' })}
      ${resultBox(320, 345, L(`Có ${count} quả táo`, `${count} apples`), clamp(t * 1.2), '#4F8EF7', 300)}`);
  }),

  scene('Cộng trên tia số', 'Phép cộng ba cộng bốn được minh hoạ bằng bốn bước nhảy trên tia số, từ điểm ba đến điểm bảy.', 7, (t) => {
    const X = axisX(70, 570, 0, 10), y = 230;
    const p = phase(t, 0.2, 0.85);
    const cur = Math.round(lerp(3, 7, p));
    return svg(`${BG('#4F8EF7')}
      ${label(320, 60, '3 + 4 = ?', { size: 30, color: '#4F8EF7' })}
      ${axis(70, 570, y, 0, 10)}
      <circle cx="${X(3)}" cy="${y}" r="9" fill="#94a3b8"/>
      ${hopArc(X(3), X(7), y, 70, '#F2545B', p)}
      ${emoji(X(cur), y - 42, '🐸', 34, clamp(p * 3))}
      ${resultBox(320, 330, `3 + 4 = ${cur}`, phase(t, 0.85, 1), '#22B27C', 240)}`);
  }),

  scene('Lũy thừa là gì?', 'Một tấm gạch hình vuông cạnh ba đề-xi-mét gồm ba hàng, mỗi hàng ba ô. Tất cả có chín ô, viết gọn là ba mũ hai.', 8, (t) => {
    let g = '', filled = 0;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const i = r * 3 + c, p = stagger(phase(t, 0.1, 0.8), i, 9);
      if (p > 0.5) filled++;
      g += cell(210 + c * 74, 110 + r * 74, 74, '#4F8EF7', p);
    }
    return svg(`${BG('#4F8EF7')}
      ${label(320, 62, L('Hình vuông cạnh 3 dm', 'Square with side 3 dm'), { size: 24, color: '#4F8EF7' })}
      ${g}
      ${label(148, 190, '3', { size: 24, color: '#F79A3E' })}
      ${label(320, 358, L(`${filled} ô`, `${filled} cells`), { size: 20, color: '#475569' })}
      ${resultBox(320, 322, '3² = 3 × 3 = 9', phase(t, 0.8, 1), '#22B27C', 280)}`);
  }),

  scene('Đi mua đồ dùng học tập', 'Mai mua ba quyển vở tám nghìn đồng và hai cây bút năm nghìn đồng. Nhân trước, cộng sau, hết ba mươi tư nghìn. Đưa năm mươi nghìn thì được trả lại mười sáu nghìn đồng.', 11, (t) => {
    const p1 = phase(t, 0.05, 0.3), p2 = phase(t, 0.3, 0.5), p3 = phase(t, 0.5, 0.72), p4 = phase(t, 0.75, 1);
    return svg(`${BG('#4F8EF7')}
      ${label(320, 50, L('🛒 Tính tiền khi đi mua sắm', '🛒 Working out the shopping bill'), { size: 24, color: '#4F8EF7' })}
      <g opacity="${p1}">${emoji(150, 115, '📓', 44)}${label(320, 124, L('3 quyển vở × 8 000đ = 24 000đ', '3 notebooks × 8,000đ = 24,000đ'), { size: 21, anchor: 'middle' })}</g>
      <g opacity="${p2}">${emoji(150, 185, '✏️', 44)}${label(320, 194, L('2 cây bút × 5 000đ = 10 000đ', '2 pens × 5,000đ = 10,000đ'), { size: 21 })}</g>
      <g opacity="${p3}">${label(320, 258, L('Tổng cộng: 24 000 + 10 000 = 34 000đ', 'Total: 24,000 + 10,000 = 34,000đ'), { size: 22, color: '#F79A3E' })}</g>
      ${resultBox(320, 330, L(`Trả lại: 50 000 − 34 000 = ${vi(16000)}đ`, `Change: 50,000 − 34,000 = 16,000đ`), p4, '#22B27C', 440)}`);
  }),
];

// ============================================================ CHƯƠNG 2
const c2 = [
  scene('Ước và bội là gì?', 'Mười hai chiếc bánh xếp vừa đúng ba hàng, mỗi hàng bốn chiếc, không thừa chiếc nào. Vì mười hai chia hết cho ba nên ba là ước của mười hai, còn mười hai là bội của ba. Hai cách nói này luôn đi cùng nhau.', 10, (t) => {
    const grid = phase(t, 0.05, 0.4), p2 = phase(t, 0.42, 0.6), p3 = phase(t, 0.6, 0.78), p4 = phase(t, 0.8, 1);
    let g = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
      const i = r * 4 + c;
      g += cell(216 + c * 52, 78 + r * 52, 52, '#22B27C', stagger(grid, i, 12));
    }
    return svg(`${BG('#22B27C')}
      ${label(320, 46, L('12 chiếc bánh xếp thành 3 hàng', '12 cakes arranged in 3 rows'), { size: 23, color: '#22B27C' })}
      ${g}
      ${label(170, 160, L('3 hàng', '3 rows'), { size: 18, color: '#475569', opacity: grid })}
      ${label(320, 262, L('12 : 3 = 4 — không dư', '12 : 3 = 4 — nothing left over'), { size: 22, color: '#F79A3E', opacity: p2 })}
      ${resultBox(166, 314, L('3 là ước của 12', '3 is a factor of 12'), p3, '#4F8EF7', 296, 50)}
      ${resultBox(474, 314, L('12 là bội của 3', '12 is a multiple of 3'), p4, '#F79A3E', 296, 50)}
      ${label(320, 368, L('a chia hết cho b → b là ước của a, a là bội của b', 'a divisible by b → b is a factor of a, a is a multiple of b'), { size: 17, weight: 700, color: '#475569', opacity: p4 })}`);
  }),

  scene('Tìm tất cả ước của 12', 'Muốn tìm ước của mười hai, ta lần lượt chia mười hai cho một, cho hai, cho ba, cho tới mười hai. Phép chia nào không dư thì số chia đó là một ước. Ta được sáu số: một, hai, ba, bốn, sáu và mười hai. Mỗi số chỉ có hữu hạn ước thôi.', 10, (t) => {
    const scan = phase(t, 0.08, 0.68), fin = phase(t, 0.72, 0.9), box = phase(t, 0.88, 1);
    const found = [];
    let chips = '';
    for (let n = 1; n <= 12; n++) {
      const i = n - 1, p = stagger(scan, i, 12, 0.2), on = p > 0.6, isD = 12 % n === 0;
      if (on && isD) found.push(n);
      const x = 96 + (i % 6) * 90, y = 126 + Math.floor(i / 6) * 78;
      const col = !on ? '#94a3b8' : isD ? '#22B27C' : '#cbd5e1';
      chips += `<circle cx="${x}" cy="${y}" r="30" fill="${col}" fill-opacity="${on ? 0.22 : 0.08}" stroke="${col}" stroke-width="3" opacity="${clamp(p * 2)}"/>`
        + label(x, y + 9, String(n), { size: 24, color: on && !isD ? '#94a3b8' : '#1b2436', opacity: clamp(p * 2) })
        + (on && isD ? label(x + 30, y - 26, '✓', { size: 20, color: '#22B27C' }) : '');
    }
    return svg(`${BG('#22B27C')}
      ${label(320, 48, L('Chia 12 cho 1, 2, 3, … đến 12', 'Divide 12 by 1, 2, 3, … up to 12'), { size: 23, color: '#22B27C' })}
      ${chips}
      ${label(320, 292, `Ư(12) = {${found.join('; ')}}`, { size: 26, color: '#22B27C', opacity: fin })}
      ${resultBox(320, 348, L('Chỉ có 6 ước — hữu hạn', 'Only 6 factors — a finite list'), box, '#4F8EF7', 340, 46)}`);
  }),

  scene('Bội của 3 nhiều vô kể', 'Bội của ba là kết quả của ba nhân với không, với một, với hai, với ba và cứ thế mãi. Trên trục số, chú ếch nhảy từng bước ba đơn vị và không bao giờ phải dừng lại. Vì vậy một số có vô số bội.', 9, (t) => {
    const X = axisX(70, 530, 0, 21), y = 226;
    const p = phase(t, 0.12, 0.8), fin = phase(t, 0.82, 1);
    const cur = lerp(0, 21, p);
    let dots = '', hops = '';
    [0, 3, 6, 9, 12, 15, 18, 21].forEach(v => { if (v <= cur + 0.01) dots += `<circle cx="${X(v)}" cy="${y}" r="9" fill="#22B27C"/>`; });
    for (let k = 0; k < Math.min(7, Math.floor(cur / 3)); k++) hops += hopArc(X(k * 3), X(k * 3 + 3), y, 50, '#F79A3E', 1);
    return svg(`${BG('#22B27C')}
      ${label(320, 52, L('Chú ếch nhảy từng bước 3 đơn vị', 'The frog hops three units at a time'), { size: 23, color: '#22B27C' })}
      ${axis(70, 530, y, 0, 21, { step: 3 })}
      ${hops}${dots}
      ${emoji(X(cur), y - 44, '🐸', 34, clamp(p * 4))}
      ${label(586, y + 9, '…', { size: 38, color: '#22B27C', opacity: fin })}
      ${label(320, 308, 'B(3) = {0; 3; 6; 9; 12; 15; 18; 21; …}', { size: 23, color: '#22B27C', opacity: fin })}
      ${resultBox(320, 354, L('Bội thì vô số!', 'Infinitely many multiples!'), fin, '#F79A3E', 300, 44)}`);
  }),

  scene('Chia kẹo có dư không?', 'Mười hai chiếc kẹo chia đều cho ba bạn, mỗi bạn được bốn chiếc, không thừa chiếc nào. Ta nói mười hai chia hết cho ba.', 9, (t) => {
    const split = phase(t, 0.35, 0.85);
    let items = '';
    for (let i = 0; i < 12; i++) {
      const p = stagger(phase(t, 0, 0.35), i, 12);
      const x0 = 90 + i * 45, y0 = 130;
      const grp = Math.floor(i / 4), k = i % 4;
      const x1 = 150 + grp * 180 + (k % 2) * 52, y1 = 210 + Math.floor(k / 2) * 52;
      items += emoji(lerp(x0, x1, ease(split)), lerp(y0, y1, ease(split)), '🍬', 34, p);
    }
    let kids = '';
    for (let g = 0; g < 3; g++) kids += emoji(176 + g * 180, 320, '🧒', 40, split) + label(176 + g * 180, 355, L('4 chiếc', '4 sweets'), { size: 15, color: '#475569', opacity: split });
    return svg(`${BG('#22B27C')}
      ${label(320, 58, L('12 chiếc kẹo chia cho 3 bạn', '12 sweets shared between 3 friends'), { size: 24, color: '#22B27C' })}
      ${items}${kids}
      ${resultBox(320, 96, L('12 : 3 = 4 → chia hết!', '12 : 3 = 4 → divisible!'), phase(t, 0.85, 1), '#22B27C', 320, 46)}`);
  }),

  scene('Dấu hiệu chia hết cho 3', 'Với số bốn trăm bảy mươi mốt, ta cộng các chữ số: bốn cộng bảy cộng một bằng mười hai. Vì mười hai chia hết cho ba nên số đó cũng chia hết cho ba.', 9, (t) => {
    const rise = phase(t, 0.2, 0.55), sum = phase(t, 0.55, 0.8);
    const ds = [4, 7, 1];
    let digits = '';
    ds.forEach((d, i) => {
      const x = 240 + i * 80;
      digits += label(x, lerp(150, 240, ease(rise)), String(d), { size: 46, color: '#22B27C' });
      if (i < 2) digits += label(x + 40, 240, '+', { size: 30, color: '#94a3b8', opacity: rise });
    });
    return svg(`${BG('#22B27C')}
      ${label(320, 60, L('Số 471 có chia hết cho 3 không?', 'Is 471 divisible by 3?'), { size: 23, color: '#22B27C' })}
      ${label(320, 130, '471', { size: 60, color: '#1b2436', opacity: 1 - rise * 0.55 })}
      ${digits}
      ${label(320, 300, '= 12', { size: 36, color: '#F79A3E', opacity: sum })}
      ${resultBox(320, 350, '12 ⋮ 3 → 471 ⋮ 3 ✓', phase(t, 0.8, 1), '#22B27C', 300, 44)}`);
  }),

  scene('Cây thừa số nguyên tố', 'Phân tích số sáu mươi: sáu mươi bằng sáu nhân mười, sáu bằng hai nhân ba, mười bằng hai nhân năm. Vậy sáu mươi bằng hai mũ hai nhân ba nhân năm.', 10, (t) => {
    const l1 = phase(t, 0.15, 0.4), l2 = phase(t, 0.4, 0.75), fin = phase(t, 0.78, 1);
    const node = (x, y, v, o, c) => `<circle cx="${x}" cy="${y}" r="30" fill="${c}" fill-opacity="0.2" stroke="${c}" stroke-width="3" opacity="${o}"/>${label(x, y + 9, String(v), { size: 24, color: '#1b2436', opacity: o })}`;
    const link = (x1, y1, x2, y2, o) => `<line x1="${x1}" y1="${y1}" x2="${lerp(x1, x2, o)}" y2="${lerp(y1, y2, o)}" stroke="#94a3b8" stroke-width="3"/>`;
    return svg(`${BG('#22B27C')}
      ${label(320, 46, L('Phân tích 60 ra thừa số nguyên tố', 'Prime factorisation of 60'), { size: 22, color: '#22B27C' })}
      ${link(320, 105, 210, 175, l1)}${link(320, 105, 430, 175, l1)}
      ${link(210, 205, 140, 275, l2)}${link(210, 205, 280, 275, l2)}
      ${link(430, 205, 360, 275, l2)}${link(430, 205, 500, 275, l2)}
      ${node(320, 80, 60, 1, '#22B27C')}
      ${node(210, 180, 6, l1, '#22B27C')}${node(430, 180, 10, l1, '#22B27C')}
      ${node(140, 280, 2, l2, '#F2545B')}${node(280, 280, 3, l2, '#F2545B')}
      ${node(360, 280, 2, l2, '#F2545B')}${node(500, 280, 5, l2, '#F2545B')}
      ${resultBox(320, 350, '60 = 2² × 3 × 5', fin, '#F2545B', 260, 44)}`);
  }),

  scene('Hai chuyến xe buýt', 'Xe A chạy mười lăm phút một chuyến, xe B hai mươi phút một chuyến. Cùng xuất phát lúc sáu giờ, phải sau sáu mươi phút hai xe mới lại cùng xuất phát. Đó chính là bội chung nhỏ nhất.', 11, (t) => {
    const X = axisX(70, 570, 0, 60), p = phase(t, 0.1, 0.85);
    const cur = lerp(0, 60, p);
    const tick = (v, y, c) => v <= cur ? `<circle cx="${X(v)}" cy="${y}" r="9" fill="${c}"/>` : '';
    let a = '', b = '';
    [15, 30, 45, 60].forEach(v => a += tick(v, 140, '#4F8EF7'));
    [20, 40, 60].forEach(v => b += tick(v, 210, '#F79A3E'));
    return svg(`${BG('#22B27C')}
      ${label(320, 50, L('🚌 Bao lâu hai xe lại cùng xuất phát?', '🚌 When do both buses leave together again?'), { size: 22, color: '#22B27C' })}
      <line x1="60" y1="140" x2="580" y2="140" stroke="#e2e8f0" stroke-width="6" stroke-linecap="round"/>
      <line x1="60" y1="210" x2="580" y2="210" stroke="#e2e8f0" stroke-width="6" stroke-linecap="round"/>
      ${label(46, 132, 'A', { size: 18, color: '#4F8EF7', anchor: 'end' })}${label(46, 202, 'B', { size: 18, color: '#F79A3E', anchor: 'end' })}
      ${a}${b}
      ${emoji(X(cur), 118, '🚌', 30)}${emoji(X(cur), 188, '🚐', 30)}
      ${axis(70, 570, 275, 0, 60, { step: 15 })}
      ${resultBox(320, 348, L('BCNN(15, 20) = 60 phút → 7 giờ', 'LCM(15, 20) = 60 min → 7 o\u2019clock'), phase(t, 0.85, 1), '#22B27C', 400, 46)}`);
  }),
];

// ============================================================ CHƯƠNG 3
const c3 = [
  scene('Nhiệt độ ở Sa Pa', 'Buổi sáng ở Sa Pa nhiệt độ là âm tám độ C. Đến trưa, nhiệt độ tăng thêm mười hai độ, ta được âm tám cộng mười hai bằng bốn độ C.', 9, (t) => {
    const p = phase(t, 0.2, 0.8);
    const v = Math.round(lerp(-8, 4, ease(p)));
    return svg(`${BG('#7C5CFC')}
      ${label(320, 52, L('🌡️ Nhiệt độ tăng lên như thế nào?', '🌡️ How does the temperature rise?'), { size: 23, color: '#7C5CFC' })}
      ${thermo(200, 300, 200, v)}
      ${label(430, 150, L('Sáng: −8°C', 'Morning: −8°C'), { size: 22, color: '#3EA6F7' })}
      ${label(430, 200, L(`Tăng 12°`, `Up 12°`), { size: 22, color: '#F79A3E', opacity: p })}
      ${resultBox(430, 280, `−8 + 12 = ${v}°C`, phase(t, 0.8, 1), '#22B27C', 250, 50)}`);
  }),

  scene('Tàu ngầm nổi lên', 'Tàu ngầm đang ở độ sâu bốn mươi lăm mét, ghi là âm bốn mươi lăm. Tàu nổi lên hai mươi mét: âm bốn mươi lăm cộng hai mươi bằng âm hai mươi lăm mét.', 10, (t) => {
    const p = phase(t, 0.25, 0.85);
    const depth = lerp(-45, -25, ease(p));
    const y = 150 + (-depth) * 3.6;
    return svg(`${BG('#7C5CFC')}
      <rect x="20" y="150" width="600" height="215" rx="14" fill="#3EA6F7" fill-opacity="0.16"/>
      <line x1="20" y1="150" x2="620" y2="150" stroke="#3EA6F7" stroke-width="4"/>
      ${label(96, 140, L('Mặt biển  0m', 'Sea level  0m'), { size: 16, color: '#3EA6F7' })}
      ${label(320, 52, L('🚢 Tàu ngầm nổi lên', '🚢 The submarine rises'), { size: 24, color: '#7C5CFC' })}
      ${emoji(300, y, '🛥️', 46)}
      <line x1="300" y1="150" x2="300" y2="${y}" stroke="#7C5CFC" stroke-width="2" stroke-dasharray="6 5"/>
      ${label(390, y + 6, `${Math.round(depth)} m`, { size: 22, color: '#7C5CFC', anchor: 'start' })}
      ${resultBox(320, 340, L('−45 + 20 = −25 (sâu 25m)', '−45 + 20 = −25 (25m deep)'), phase(t, 0.85, 1), '#22B27C', 360, 46)}`);
  }),

  scene('Cộng số nguyên trên trục số', 'Từ điểm âm ba, ta nhảy sang phải năm đơn vị và dừng ở điểm hai. Vậy âm ba cộng năm bằng hai.', 8, (t) => {
    const X = axisX(70, 570, -6, 6), y = 220, p = phase(t, 0.25, 0.85);
    const cur = Math.round(lerp(-3, 2, p));
    return svg(`${BG('#7C5CFC')}
      ${label(320, 58, '(−3) + 5 = ?', { size: 30, color: '#7C5CFC' })}
      <rect x="${X(-6)}" y="${y - 4}" width="${X(0) - X(-6)}" height="8" fill="#3EA6F7" fill-opacity="0.3" rx="4"/>
      ${axis(70, 570, y, -6, 6)}
      <circle cx="${X(-3)}" cy="${y}" r="9" fill="#94a3b8"/>
      ${hopArc(X(-3), X(2), y, 66, '#7C5CFC', p)}
      ${label(X(cur), y - 88, String(cur), { size: 24, color: '#7C5CFC', opacity: clamp(p * 3) })}
      ${resultBox(320, 330, `(−3) + 5 = ${cur}`, phase(t, 0.85, 1), '#22B27C', 260)}`);
  }),

  scene('Quy tắc dấu khi nhân', 'Nhân hai số khác dấu thì kết quả mang dấu âm: âm ba nhân bảy bằng âm hai mươi mốt. Còn nhân hai số cùng dấu thì kết quả là số dương.', 9, (t) => {
    const p1 = phase(t, 0.1, 0.45), p2 = phase(t, 0.45, 0.75), p3 = phase(t, 0.75, 1);
    const row = (y, txt, res, col, o) => `${label(200, y, txt, { size: 24, anchor: 'end', opacity: o })}${label(250, y, '→', { size: 22, color: '#94a3b8', anchor: 'start', opacity: o })}${label(330, y, res, { size: 24, color: col, anchor: 'start', opacity: o })}`;
    return svg(`${BG('#7C5CFC')}
      ${label(320, 56, L('✖️ Quy tắc dấu', '✖️ The sign rule'), { size: 26, color: '#7C5CFC' })}
      ${row(140, '(−) × (+)', L('kết quả ÂM (−)', 'result is NEGATIVE (−)'), '#F2545B', p1)}
      ${row(196, '(+) × (+)', L('kết quả DƯƠNG (+)', 'result is POSITIVE (+)'), '#22B27C', p2)}
      ${row(252, '(−) × (−)', L('kết quả DƯƠNG (+)', 'result is POSITIVE (+)'), '#22B27C', p2)}
      ${resultBox(320, 330, '(−3) × 7 = −21', p3, '#F2545B', 280)}`);
  }),
];


// ============================================================ CHƯƠNG 4
const c4 = [
  scene('Chu vi sân bóng', 'Đi một vòng quanh sân hình chữ nhật dài ba mươi mét, rộng hai mươi mét. Cộng bốn cạnh lại, ta được chu vi bằng một trăm mét.', 10, (t) => {
    const x0 = 150, y0 = 120, w = 340, h = 200, per = 2 * (w + h);
    const p = phase(t, 0.12, 0.9), d = p * per;
    let cx, cy;
    if (d < w) { cx = x0 + d; cy = y0; }
    else if (d < w + h) { cx = x0 + w; cy = y0 + (d - w); }
    else if (d < 2 * w + h) { cx = x0 + w - (d - w - h); cy = y0 + h; }
    else { cx = x0; cy = y0 + h - (d - 2 * w - h); }
    const met = Math.round(p * 100);
    return svg(`${BG('#F79A3E')}
      ${label(320, 56, L('⚽ Chu vi sân bóng', '⚽ Perimeter of the pitch'), { size: 25, color: '#F79A3E' })}
      <rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="6" fill="#22B27C" fill-opacity="0.15" stroke="#22B27C" stroke-width="4"/>
      ${label(x0 + w / 2, y0 - 12, '30 m', { size: 20, color: '#22B27C' })}
      ${label(x0 - 16, y0 + h / 2, '20 m', { size: 20, color: '#22B27C', anchor: 'end' })}
      <circle cx="${cx}" cy="${cy}" r="11" fill="#F2545B" stroke="#fff" stroke-width="3"/>
      ${label(320, y0 + h / 2 + 8, `${met} m`, { size: 34, color: '#F79A3E' })}
      ${resultBox(320, 356, '2 × (30 + 20) = 100 m', phase(t, 0.9, 1), '#22B27C', 330, 44)}`);
  }),

  scene('Diện tích là bao nhiêu ô?', 'Mảnh vườn dài mười lăm mét, rộng tám mét được phủ kín bởi các ô vuông một mét. Đếm được một trăm hai mươi ô, nên diện tích là một trăm hai mươi mét vuông.', 10, (t) => {
    const s = 30, cols = 15, rows = 8, x0 = 90, y0 = 100;
    let g = '', filled = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c, pp = stagger(phase(t, 0.08, 0.85), i, cols * rows, 0.985);
      if (pp > 0.5) filled++;
      g += `<rect x="${x0 + c * s}" y="${y0 + r * s}" width="${s - 2}" height="${s - 2}" fill="#F79A3E" fill-opacity="${0.7 * pp}" stroke="#F79A3E" stroke-opacity="0.5" stroke-width="1"/>`;
    }
    return svg(`${BG('#F79A3E')}
      ${label(320, 56, L('🌱 Mảnh vườn 15m × 8m', '🌱 A garden 15m × 8m'), { size: 24, color: '#F79A3E' })}
      ${g}
      ${label(320, 368, L(`Đã phủ ${filled} ô vuông 1m²`, `${filled} squares of 1m² covered`), { size: 19, color: '#475569' })}
      ${resultBox(320, 330, '15 × 8 = 120 m²', phase(t, 0.85, 1), '#22B27C', 280, 46)}`);
  }),

  scene('Vì sao diện tích hình thoi chia đôi?', 'Hình thoi nằm gọn trong hình chữ nhật có hai cạnh bằng hai đường chéo, và chiếm đúng một nửa. Vì thế diện tích bằng tích hai đường chéo chia hai.', 10, (t) => {
    const cx = 320, cy = 205, w = 260, h = 195;
    const pr = phase(t, 0.1, 0.4), pd = phase(t, 0.4, 0.7), pf = phase(t, 0.72, 1);
    const pts = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
    return svg(`${BG('#F79A3E')}
      ${label(320, 52, L('💠 Hình thoi có 2 đường chéo 8cm và 6cm', '💠 Rhombus with diagonals 8cm and 6cm'), { size: 21, color: '#F79A3E' })}
      <rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" fill="#94a3b8" fill-opacity="${0.12 * pr}" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="8 6" opacity="${pr}"/>
      <polygon points="${pts}" fill="#F79A3E" fill-opacity="${0.55 * pd}" stroke="#F2545B" stroke-width="4" opacity="${clamp(pd * 2)}"/>
      <line x1="${cx - w / 2}" y1="${cy}" x2="${cx + w / 2}" y2="${cy}" stroke="#F2545B" stroke-width="2.5" stroke-dasharray="6 4" opacity="${pd}"/>
      <line x1="${cx}" y1="${cy - h / 2}" x2="${cx}" y2="${cy + h / 2}" stroke="#F2545B" stroke-width="2.5" stroke-dasharray="6 4" opacity="${pd}"/>
      ${label(cx, cy - h / 2 - 12, '8 cm', { size: 18, color: '#475569', opacity: pr })}
      ${label(cx + w / 2 + 34, cy, '6 cm', { size: 18, color: '#475569', opacity: pr })}
      ${label(cx, cy + 8, L('nửa hình chữ nhật', 'half the rectangle'), { size: 16, color: '#7c2d12', opacity: pd })}
      ${resultBox(320, 352, '(8 × 6) : 2 = 24 cm²', pf, '#22B27C', 300, 44)}`);
  }),

  scene('Cần bao nhiêu viên gạch?', 'Sân dài mười mét, rộng sáu mét, gạch hình vuông cạnh năm mươi xăng-ti-mét. Mỗi chiều xếp được hai mươi và mười hai viên, tất cả cần hai trăm bốn mươi viên gạch.', 10, (t) => {
    const cols = 20, rows = 12, s = 24, x0 = 80, y0 = 96;
    let g = '', n = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c, pp = stagger(phase(t, 0.08, 0.85), i, cols * rows, 0.99);
      if (pp > 0.5) n++;
      g += `<rect x="${x0 + c * s}" y="${y0 + r * s}" width="${s - 3}" height="${s - 3}" rx="3" fill="#C2703B" fill-opacity="${0.85 * pp}"/>`;
    }
    return svg(`${BG('#F79A3E')}
      ${label(320, 54, L('🧱 Lát gạch cho sân 10m × 6m', '🧱 Tiling a 10m × 6m yard'), { size: 23, color: '#F79A3E' })}
      <rect x="${x0 - 6}" y="${y0 - 6}" width="${cols * s + 8}" height="${rows * s + 8}" rx="8" fill="none" stroke="#94a3b8" stroke-width="3"/>
      ${g}
      ${label(320, 400, '', { size: 1 })}
      ${resultBox(320, 356, L(`${n} viên gạch (600 000 : 2 500 = 240)`, `${n} tiles (600,000 : 2,500 = 240)`), phase(t, 0.85, 1), '#22B27C', 430, 44)}`);
  }),
];

// ============================================================ CHƯƠNG 5
const c5 = [
  scene('Gấp đôi cánh bướm', 'Gấp con bướm theo đường thẳng đứng ở giữa, hai cánh trùng khít lên nhau. Đường thẳng đó gọi là trục đối xứng.', 9, (t) => {
    const p = phase(t, 0.25, 0.75);
    const k = 1 - ease(p) * 0.98;   // cánh phải gập dần về trục
    const wing = (dir, sx) => `<g transform="translate(320 205) scale(${dir * sx} 1)">
        <path d="M0,-30 C-40,-95 -125,-70 -118,-14 C-113,26 -50,26 0,4 Z" fill="#EF5DA8" fill-opacity="0.8"/>
        <path d="M0,4 C-30,40 -58,80 -36,104 C-20,120 -4,78 0,42 Z" fill="#EF5DA8" fill-opacity="0.55"/>
      </g>`;
    return svg(`${BG('#EF5DA8')}
      ${label(320, 52, L('🦋 Trục đối xứng của cánh bướm', '🦋 The butterfly\u2019s line of symmetry'), { size: 23, color: '#EF5DA8' })}
      <line x1="320" y1="80" x2="320" y2="340" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="8 7"/>
      ${wing(-1, 1)}${wing(1, k)}
      <rect x="316" y="150" width="8" height="110" rx="4" fill="#334155"/>
      ${resultBox(320, 356, L('Hai nửa trùng khít ✓', 'The two halves match ✓'), phase(t, 0.78, 1), '#EF5DA8', 280, 44)}`);
  }),

  scene('Chữ cái nào đối xứng?', 'Chữ A và chữ H có trục đối xứng thẳng đứng, gấp đôi thì hai nửa chồng khít. Chữ F thì không có trục đối xứng nào.', 9, (t) => {
    const p1 = phase(t, 0.15, 0.45), p2 = phase(t, 0.45, 0.7), p3 = phase(t, 0.7, 1);
    const item = (x, ch, ok, o) => `${label(x, 210, ch, { size: 96, color: ok ? '#22B27C' : '#94a3b8', opacity: o })}
      ${ok ? `<line x1="${x}" y1="120" x2="${x}" y2="240" stroke="#EF5DA8" stroke-width="3" stroke-dasharray="7 6" opacity="${o}"/>` : ''}
      ${label(x, 285, ok ? L('✓ có trục', '✓ has one') : L('✗ không có', '✗ has none'), { size: 17, color: ok ? '#22B27C' : '#94a3b8', opacity: o })}`;
    return svg(`${BG('#EF5DA8')}
      ${label(320, 56, L('Chữ nào có trục đối xứng?', 'Which letter has a line of symmetry?'), { size: 24, color: '#EF5DA8' })}
      ${item(150, 'A', true, p1)}${item(320, 'H', true, p2)}${item(490, 'F', false, p3)}
      ${resultBox(320, 348, L('Gấp đôi mà trùng khít → có trục đối xứng', 'Folds and matches → line of symmetry'), phase(t, 0.85, 1), '#EF5DA8', 460, 44)}`);
  }),

  scene('Chong chóng quay 180°', 'Quay chong chóng nửa vòng, tức một trăm tám mươi độ, quanh tâm của nó thì hình thu được trùng khít hình ban đầu. Tâm đó là tâm đối xứng.', 9, (t) => {
    const p = phase(t, 0.2, 0.85), deg = ease(p) * 180;
    const blade = (a, c) => `<path d="M320,205 L320,105 A100,100 0 0,1 420,205 Z" fill="${c}" fill-opacity="0.8" transform="rotate(${a} 320 205)"/>`;
    return svg(`${BG('#17B6C4')}
      ${label(320, 52, L('🎡 Quay 180° quanh tâm', '🎡 Turning 180° about the centre'), { size: 24, color: '#17B6C4' })}
      <g transform="rotate(${deg} 320 205)">${blade(0, '#17B6C4')}${blade(90, '#4F8EF7')}${blade(180, '#17B6C4')}${blade(270, '#4F8EF7')}</g>
      <circle cx="320" cy="205" r="7" fill="#1b2436"/>
      ${label(320, 330, L(`Đã quay ${Math.round(deg)}°`, `Turned ${Math.round(deg)}°`), { size: 22, color: '#475569' })}
      ${resultBox(320, 366, L('Trùng khít → có tâm đối xứng', 'It matches → centre of symmetry'), phase(t, 0.85, 1), '#17B6C4', 380, 42)}`);
  }),

  scene('Hình thang cân thì sao?', 'Hình thang cân gấp đôi theo trục dọc thì trùng khít, nên có trục đối xứng. Nhưng quay một trăm tám mươi độ thì lệch hẳn, nên nó không có tâm đối xứng.', 10, (t) => {
    const p1 = phase(t, 0.1, 0.45), p2 = phase(t, 0.5, 0.9), deg = ease(p2) * 180;
    const trap = (o, c) => `<polygon points="250,140 390,140 450,265 190,265" fill="${c}" fill-opacity="0.25" stroke="${c}" stroke-width="3.5" opacity="${o}"/>`;
    return svg(`${BG('#EF5DA8')}
      ${label(320, 52, L('Hình thang cân: có trục, không có tâm', 'Isosceles trapezium: a line, but no centre'), { size: 21, color: '#EF5DA8' })}
      <line x1="320" y1="120" x2="320" y2="290" stroke="#22B27C" stroke-width="3" stroke-dasharray="7 6" opacity="${p1}"/>
      ${trap(0.35, '#94a3b8')}
      <g transform="rotate(${deg} 320 202)">${trap(1, '#EF5DA8')}</g>
      ${label(320, 318, p2 > 0.05 ? L(`Quay ${Math.round(deg)}° → lệch khỏi hình cũ`, `Turned ${Math.round(deg)}° → no longer matches`) : L('Trục đối xứng ✓', 'Line of symmetry ✓'), { size: 19, color: '#475569' })}
      ${resultBox(320, 358, L('Có trục ✓ — Không có tâm ✗', 'Has a line ✓ — no centre ✗'), phase(t, 0.9, 1), '#EF5DA8', 360, 42)}`);
  }),
];

// ============================================================ CHƯƠNG 6
const c6 = [
  scene('Khảo sát môn thể thao', 'Hỏi hai mươi bạn về môn thể thao yêu thích. Vẽ biểu đồ cột, cột nào cao nhất là môn được yêu thích nhất: bóng đá với tám bạn.', 9, (t) => {
    const data = [[L('⚽ Bóng đá', '⚽ Football'), 8, '#17B6C4'], [L('🏸 Cầu lông', '🏸 Badminton'), 5, '#4F8EF7'], [L('🏊 Bơi', '🏊 Swimming'), 4, '#F79A3E'], [L('🏓 Bóng bàn', '🏓 Table tennis'), 3, '#EF5DA8']];
    const base = 300, maxH = 190;
    let bars = '';
    data.forEach(([name, v, c], i) => {
      const p = stagger(phase(t, 0.1, 0.85), i, 4, 0.5);
      const h = (v / 8) * maxH * easeOut(p), x = 110 + i * 125;
      bars += `<rect x="${x}" y="${base - h}" width="76" height="${h}" rx="8" fill="${c}"/>
        ${label(x + 38, base - h - 10, String(Math.round(v * easeOut(p))), { size: 20, color: c })}
        ${label(x + 38, base + 26, name, { size: 15, color: '#475569', weight: 600 })}`;
    });
    return svg(`${BG('#17B6C4')}
      ${label(320, 52, L('📊 Môn thể thao yêu thích của 20 bạn', '📊 Favourite sport of 20 students'), { size: 22, color: '#17B6C4' })}
      <line x1="70" y1="${base}" x2="600" y2="${base}" stroke="#94a3b8" stroke-width="3"/>
      ${bars}
      ${resultBox(320, 358, L('Bóng đá được yêu thích nhất (8 bạn)', 'Football is the most popular (8 students)'), phase(t, 0.85, 1), '#17B6C4', 420, 42)}`);
  }),

  scene('Tung đồng xu 50 lần', 'Tung đồng xu năm mươi lần, đếm được hai mươi tám lần mặt sấp. Xác suất thực nghiệm bằng hai mươi tám chia năm mươi, tức là không phẩy năm mươi sáu.', 10, (t) => {
    const p = phase(t, 0.1, 0.8);
    const flips = Math.round(p * 50), sap = Math.round(p * 28);
    const spin = Math.abs(Math.cos(t * 26));
    return svg(`${BG('#17B6C4')}
      ${label(320, 54, L('🪙 Tung đồng xu', '🪙 Tossing a coin'), { size: 25, color: '#17B6C4' })}
      <g transform="translate(320 150) scale(${0.25 + spin * 0.75} 1)">
        <circle cx="0" cy="0" r="52" fill="#F7C948" stroke="#B98900" stroke-width="4"/>
        ${label(0, 10, spin > 0.5 ? 'S' : 'N', { size: 34, color: '#7c5a00' })}
      </g>
      ${label(210, 252, L(`Số lần tung: ${flips}`, `Tosses: ${flips}`), { size: 21, color: '#475569' })}
      ${label(210, 288, L(`Mặt sấp: ${sap}`, `Tails: ${sap}`), { size: 21, color: '#F2545B' })}
      <rect x="380" y="230" width="180" height="72" rx="12" fill="#17B6C4" fill-opacity="0.14" stroke="#17B6C4" stroke-width="2.5"/>
      ${label(470, 262, `${sap} : ${flips || 1}`, { size: 20, color: '#0e7490' })}
      ${label(470, 290, flips ? (sap / flips).toFixed(2).replace('.', ',') : '0', { size: 22, color: '#0e7490' })}
      ${resultBox(320, 352, L('Xác suất thực nghiệm ≈ 0,56', 'Experimental probability ≈ 0.56'), phase(t, 0.82, 1), '#22B27C', 350, 44)}`);
  }),

  scene('Gieo xúc xắc 100 lần', 'Gieo xúc xắc một trăm lần, các mặt chẵn là hai, bốn, sáu xuất hiện tổng cộng năm mươi tư lần. Xác suất thực nghiệm của mặt chẵn là không phẩy năm mươi tư.', 10, (t) => {
    const counts = [15, 18, 17, 19, 14, 17];
    const p = phase(t, 0.1, 0.8), base = 300;
    let bars = '';
    counts.forEach((v, i) => {
      const even = (i + 1) % 2 === 0;
      const h = (v / 20) * 170 * easeOut(p), x = 100 + i * 78;
      bars += `<rect x="${x}" y="${base - h}" width="54" height="${h}" rx="7" fill="${even ? '#17B6C4' : '#cbd5e1'}"/>
        ${label(x + 27, base + 26, `${i + 1}`, { size: 19, color: even ? '#0e7490' : '#94a3b8' })}
        ${label(x + 27, base - h - 9, String(Math.round(v * easeOut(p))), { size: 15, color: '#475569', weight: 700 })}`;
    });
    return svg(`${BG('#17B6C4')}
      ${label(320, 50, L('🎲 Số lần xuất hiện mỗi mặt', '🎲 How often each face came up'), { size: 23, color: '#17B6C4' })}
      <line x1="80" y1="${base}" x2="590" y2="${base}" stroke="#94a3b8" stroke-width="3"/>
      ${bars}
      ${label(320, 348, L('Mặt chẵn (xanh): 18 + 19 + 17 = 54 lần', 'Even faces (blue): 18 + 19 + 17 = 54 times'), { size: 19, color: '#475569', opacity: phase(t, 0.6, 0.85) })}
      ${resultBox(320, 378, '54 : 100 = 0,54', phase(t, 0.85, 1), '#22B27C', 260, 40)}`);
  }),
];

// ============================================================ CHƯƠNG 7
const c7 = [
  scene('Ăn pizza và phân số', 'Chiếc bánh pizza được cắt thành tám phần bằng nhau. Nam ăn ba phần, tức là ăn ba phần tám chiếc bánh.', 9, (t) => {
    const cx = 220, cy = 200, r = 108, d = 8;
    const eaten = Math.min(3, Math.floor(phase(t, 0.15, 0.8) * 3.999));
    let sl = '';
    for (let i = 0; i < d; i++) {
      const a1 = (-90 + i * 45) * Math.PI / 180, a2 = (-90 + (i + 1) * 45) * Math.PI / 180;
      const gone = i < eaten;
      const off = gone ? 26 : 0;
      const mx = Math.cos((a1 + a2) / 2) * off, my = Math.sin((a1 + a2) / 2) * off;
      sl += `<path d="M${cx + mx},${cy + my} L${cx + mx + r * Math.cos(a1)},${cy + my + r * Math.sin(a1)} A${r},${r} 0 0 1 ${cx + mx + r * Math.cos(a2)},${cy + my + r * Math.sin(a2)} Z"
        fill="${gone ? '#e2e8f0' : '#F79A3E'}" fill-opacity="${gone ? 0.45 : 0.9}" stroke="#F2545B" stroke-width="2.5"/>`;
    }
    return svg(`${BG('#F2545B')}
      ${label(320, 50, L('🍕 Chia bánh pizza thành 8 phần', '🍕 A pizza cut into 8 slices'), { size: 23, color: '#F2545B' })}
      ${sl}
      ${label(480, 150, L(`Đã ăn: ${eaten} phần`, `Eaten: ${eaten} slices`), { size: 22, color: '#F2545B' })}
      ${label(480, 215, `${eaten}`, { size: 44, color: '#F2545B' })}
      <line x1="452" y1="230" x2="508" y2="230" stroke="#F2545B" stroke-width="4"/>
      ${label(480, 278, '8', { size: 44, color: '#F2545B' })}
      ${resultBox(320, 356, L('Nam đã ăn 3/8 chiếc bánh', 'Nam has eaten 3/8 of the pizza'), phase(t, 0.82, 1), '#22B27C', 330, 44)}`);
  }),

  scene('Rút gọn phân số', 'Tám phần mười hai: chia cả tử và mẫu cho bốn, ta được hai phần ba. Hai băng giấy tô màu bằng nhau, chỉ khác cách chia.', 9, (t) => {
    const p = phase(t, 0.25, 0.8);
    const bar = (y, n, d, col, o) => {
      let out = '';
      const w = 420 / d;
      for (let i = 0; i < d; i++) out += `<rect x="${110 + i * w}" y="${y}" width="${w - 3}" height="58" rx="5" fill="${i < n ? col : '#fff'}" fill-opacity="${i < n ? 0.85 : 1}" stroke="${col}" stroke-width="2.5" opacity="${o}"/>`;
      return out;
    };
    return svg(`${BG('#F2545B')}
      ${label(320, 50, L('Rút gọn 8/12', 'Simplifying 8/12'), { size: 25, color: '#F2545B' })}
      ${bar(110, 8, 12, '#F2545B', 1)}
      ${label(70, 146, '8/12', { size: 20, color: '#F2545B', anchor: 'end' })}
      ${label(320, 208, L('÷ 4 cả tử và mẫu', '÷ 4 top and bottom'), { size: 20, color: '#94a3b8', opacity: p })}
      ${bar(240, 2, 3, '#22B27C', p)}
      ${label(70, 276, '2/3', { size: 20, color: '#22B27C', anchor: 'end', opacity: p })}
      ${resultBox(320, 352, L('8/12 = 2/3 (bằng nhau!)', '8/12 = 2/3 (the same!)'), phase(t, 0.82, 1), '#22B27C', 320, 44)}`);
  }),

  scene('So sánh hai phân số', 'So sánh ba phần tư và năm phần sáu. Quy đồng mẫu số mười hai, ta được chín phần mười hai và mười phần mười hai. Vậy năm phần sáu lớn hơn.', 10, (t) => {
    const p = phase(t, 0.3, 0.75);
    const bar = (y, n, d, col, txt) => {
      let out = '', w = 400 / d;
      for (let i = 0; i < d; i++) out += `<rect x="${140 + i * w}" y="${y}" width="${w - 3}" height="52" rx="4" fill="${i < n ? col : '#fff'}" fill-opacity="${i < n ? 0.85 : 1}" stroke="${col}" stroke-width="2"/>`;
      return out + label(120, y + 34, txt, { size: 19, color: col, anchor: 'end' });
    };
    const A = p < 0.5 ? [3, 4, '3/4'] : [9, 12, '9/12'], B = p < 0.5 ? [5, 6, '5/6'] : [10, 12, '10/12'];
    return svg(`${BG('#F2545B')}
      ${label(320, 50, L('3/4 và 5/6 — phân số nào lớn hơn?', '3/4 and 5/6 — which is larger?'), { size: 22, color: '#F2545B' })}
      ${bar(110, A[0], A[1], '#4F8EF7', A[2])}
      ${bar(200, B[0], B[1], '#F2545B', B[2])}
      ${label(320, 300, p > 0.5 ? L('Cùng mẫu 12 → so tử: 10 > 9', 'Same denominator 12 → compare tops: 10 > 9') : L('Khác mẫu → quy đồng nào!', 'Different denominators → make them the same!'), { size: 20, color: '#475569' })}
      ${resultBox(320, 352, '5/6 > 3/4', phase(t, 0.8, 1), '#22B27C', 230, 44)}`);
  }),

  scene('Cộng phân số khác mẫu', 'Một phần ba cộng một phần sáu. Đổi một phần ba thành hai phần sáu, cộng lại được ba phần sáu, rút gọn thành một nửa.', 9, (t) => {
    const p1 = phase(t, 0.2, 0.5), p2 = phase(t, 0.55, 0.85);
    const bar = (x, y, n, d, col, o) => {
      let out = ''; const w = 150 / d;
      for (let i = 0; i < d; i++) out += `<rect x="${x + i * w}" y="${y}" width="${w - 2}" height="54" rx="4" fill="${i < n ? col : '#fff'}" fill-opacity="${i < n ? 0.85 : 1}" stroke="${col}" stroke-width="2" opacity="${o}"/>`;
      return out;
    };
    return svg(`${BG('#F2545B')}
      ${label(320, 50, '1/3 + 1/6 = ?', { size: 26, color: '#F2545B' })}
      ${bar(70, 120, p1 > 0.5 ? 2 : 1, p1 > 0.5 ? 6 : 3, '#4F8EF7', 1)}
      ${label(145, 200, p1 > 0.5 ? '2/6' : '1/3', { size: 20, color: '#4F8EF7' })}
      ${label(250, 152, '+', { size: 30, color: '#94a3b8' })}
      ${bar(300, 120, 1, 6, '#F79A3E', 1)}
      ${label(375, 200, '1/6', { size: 20, color: '#F79A3E' })}
      ${label(480, 152, '=', { size: 30, color: '#94a3b8', opacity: p2 })}
      ${bar(510, 120, 3, 6, '#22B27C', p2)}
      ${label(585, 200, '3/6', { size: 20, color: '#22B27C', opacity: p2 })}
      ${resultBox(320, 320, '3/6 = 1/2', phase(t, 0.85, 1), '#22B27C', 220, 46)}`);
  }),
];

// ============================================================ CHƯƠNG 8
const c8 = [
  scene('Giảm giá 15% là bao nhiêu?', 'Chiếc áo giá hai trăm năm mươi nghìn được giảm mười lăm phần trăm, tức giảm ba mươi bảy nghìn năm trăm đồng. Giá còn lại là hai trăm mười hai nghìn năm trăm đồng.', 10, (t) => {
    const p = phase(t, 0.25, 0.8);
    const price = Math.round(lerp(250000, 212500, ease(p)) / 500) * 500;
    const barW = 400 * (price / 250000);
    return svg(`${BG('#A56CF2')}
      ${label(320, 52, L('🏷️ Áo giảm giá 15%', '🏷️ Shirt with 15% off'), { size: 25, color: '#A56CF2' })}
      ${emoji(110, 150, '👕', 64)}
      <rect x="180" y="120" width="400" height="56" rx="10" fill="#e2e8f0"/>
      <rect x="180" y="120" width="${barW}" height="56" rx="10" fill="#A56CF2" fill-opacity="0.75"/>
      ${label(380, 158, L(`${vi(price)}đ`, `${price.toLocaleString('en-US')}đ`), { size: 25, color: '#fff' })}
      ${label(320, 235, L(`Giảm 15% = 250 000 × 0,15 = ${vi(37500)}đ`, `15% off = 250,000 × 0.15 = 37,500đ`), { size: 20, color: '#F2545B', opacity: p })}
      ${label(320, 280, '250 000 − 37 500', { size: 20, color: '#475569', opacity: p })}
      ${resultBox(320, 340, L(`Giá sau giảm: ${vi(212500)}đ`, `New price: 212,500đ`), phase(t, 0.82, 1), '#22B27C', 360, 46)}`);
  }),

  scene('Phần trăm là gì?', 'Phần trăm nghĩa là chia thành một trăm phần bằng nhau. Sáu mươi lăm phần trăm chính là sáu mươi lăm ô trong bảng một trăm ô.', 9, (t) => {
    const target = 65, n = Math.round(phase(t, 0.1, 0.85) * target);
    let g = '';
    for (let i = 0; i < 100; i++) {
      const x = 200 + (i % 10) * 26, y = 90 + Math.floor(i / 10) * 26;
      g += `<rect x="${x}" y="${y}" width="23" height="23" rx="4" fill="${i < n ? '#A56CF2' : '#eef1f8'}"/>`;
    }
    return svg(`${BG('#A56CF2')}
      ${label(320, 52, L('💯 65% của một hình vuông', '💯 65% of a square'), { size: 24, color: '#A56CF2' })}
      ${g}
      ${label(320, 384, '', { size: 1 })}
      ${resultBox(320, 372, `${n}% = ${n}/100`, 1, '#A56CF2', 240, 42)}`);
  }),

  scene('Bẫy phần trăm: tăng 20% rồi giảm 20%', 'Giá tăng hai mươi phần trăm rồi lại giảm hai mươi phần trăm. Kết quả không quay về giá cũ mà chỉ còn chín mươi sáu phần trăm, vì lần giảm tính trên giá mới cao hơn.', 12, (t) => {
    const p1 = phase(t, 0.15, 0.45), p2 = phase(t, 0.5, 0.82);
    const v = p2 > 0 ? lerp(120, 96, ease(p2)) : lerp(100, 120, ease(p1));
    const h = (x) => x * 2.2;
    const bar = (x, val, col, txt, o) => `<rect x="${x}" y="${300 - h(val)}" width="96" height="${h(val)}" rx="9" fill="${col}" opacity="${o}"/>
      ${label(x + 48, 300 - h(val) - 12, `${Math.round(val)}%`, { size: 20, color: col, opacity: o })}
      ${label(x + 48, 326, txt, { size: 16, color: '#475569', opacity: o })}`;
    return svg(`${BG('#A56CF2')}
      ${label(320, 46, L('📈 Tăng 20% rồi giảm 20% — về giá cũ chứ?', '📈 Up 20% then down 20% — back to the start?'), { size: 20, color: '#A56CF2' })}
      <line x1="70" y1="300" x2="600" y2="300" stroke="#94a3b8" stroke-width="3"/>
      <line x1="70" y1="${300 - h(100)}" x2="600" y2="${300 - h(100)}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="7 6"/>
      ${bar(110, 100, '#94a3b8', L('Giá ban đầu', 'Original price'), 1)}
      ${bar(272, Math.max(100, v), '#F79A3E', L('Tăng 20%', 'Up 20%'), p1)}
      ${bar(434, v, '#F2545B', L('Rồi giảm 20%', 'Then down 20%'), p2)}
      ${resultBox(320, 358, L('100% × 1,2 × 0,8 = 96% — thấp hơn giá cũ!', '100% × 1.2 × 0.8 = 96% — lower than before!'), phase(t, 0.85, 1), '#F2545B', 470, 44)}`);
  }),
];

// ============================================================ CHƯƠNG 9
const c9 = [
  scene('Kim đồng hồ tạo ra góc', 'Từ mười hai giờ, kim phút quay dần. Đến ba giờ, hai kim tạo thành một góc vuông chín mươi độ.', 9, (t) => {
    const p = phase(t, 0.15, 0.85), deg = ease(p) * 90;
    const cx = 250, cy = 200, R = 108;
    const hx = cx + 62 * Math.cos((deg - 90) * Math.PI / 180), hy = cy + 62 * Math.sin((deg - 90) * Math.PI / 180);
    let ticks = '';
    for (let i = 0; i < 12; i++) {
      const a = i * 30 * Math.PI / 180 - Math.PI / 2;
      ticks += `<line x1="${cx + (R - 9) * Math.cos(a)}" y1="${cy + (R - 9) * Math.sin(a)}" x2="${cx + R * Math.cos(a)}" y2="${cy + R * Math.sin(a)}" stroke="#334155" stroke-width="2.5"/>`;
    }
    const ax = cx + 52 * Math.cos((deg - 90) * Math.PI / 180), ay = cy + 52 * Math.sin((deg - 90) * Math.PI / 180);
    return svg(`${BG('#E0A106')}
      ${label(320, 50, L('🕒 Góc giữa hai kim đồng hồ', '🕒 The angle between the clock hands'), { size: 23, color: '#E0A106' })}
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="#334155" stroke-width="3.5"/>${ticks}
      <path d="M${cx},${cy - 52} A52,52 0 0,1 ${ax},${ay}" fill="none" stroke="#F79A3E" stroke-width="4"/>
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 88}" stroke="#F2545B" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="6" fill="#334155"/>
      ${label(470, 190, `${Math.round(deg)}°`, { size: 46, color: '#F79A3E' })}
      ${resultBox(470, 268, deg > 85 ? L('Góc vuông!', 'A right angle!') : L('Đang quay...', 'Turning...'), phase(t, 0.85, 1), '#22B27C', 220, 44)}`);
  }),

  scene('Bốn loại góc', 'Cho tia quay từ từ. Dưới chín mươi độ là góc nhọn, đúng chín mươi độ là góc vuông, trên chín mươi độ là góc tù, và một trăm tám mươi độ là góc bẹt.', 12, (t) => {
    const deg = ease(phase(t, 0.05, 0.95)) * 180;
    const kind = deg < 89 ? [L('Góc nhọn', 'Acute angle'), '#22B27C'] : deg <= 91 ? [L('Góc vuông', 'Right angle'), '#4F8EF7'] : deg < 179 ? [L('Góc tù', 'Obtuse angle'), '#F79A3E'] : [L('Góc bẹt', 'Straight angle'), '#F2545B'];
    const cx = 320, cy = 280, R = 200;
    const rad = -deg * Math.PI / 180;
    const ar = 70;
    return svg(`${BG('#E0A106')}
      ${label(320, 46, L('📐 Tia quay — góc đổi tên', '📐 A turning ray — the angle changes name'), { size: 24, color: '#E0A106' })}
      <line x1="${cx}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${cx + R * Math.cos(rad)}" y2="${cy + R * Math.sin(rad)}" stroke="${kind[1]}" stroke-width="5" stroke-linecap="round"/>
      <path d="M${cx + ar},${cy} A${ar},${ar} 0 ${deg > 180 ? 1 : 0} 1 ${cx + ar * Math.cos(rad)},${cy + ar * Math.sin(rad)}" fill="none" stroke="${kind[1]}" stroke-width="4"/>
      <circle cx="${cx}" cy="${cy}" r="6" fill="#334155"/>
      ${label(cx + 118, cy - 24, `${Math.round(deg)}°`, { size: 30, color: kind[1] })}
      ${resultBox(320, 344, kind[0], 1, kind[1], 240, 48)}`);
  }),

  scene('Tia phân giác chia đôi góc', 'Tia phân giác nằm giữa hai cạnh và chia góc một trăm ba mươi độ thành hai góc bằng nhau, mỗi góc sáu mươi lăm độ.', 9, (t) => {
    const p = phase(t, 0.3, 0.8), cx = 320, cy = 300, R = 210;
    const A = 130, half = 65;
    const ray = (d, col, w) => `<line x1="${cx}" y1="${cy}" x2="${cx + R * Math.cos(-d * Math.PI / 180)}" y2="${cy + R * Math.sin(-d * Math.PI / 180)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    const bis = lerp(0, half, ease(p));
    return svg(`${BG('#E0A106')}
      ${label(320, 46, L('✂️ Tia phân giác của góc 130°', '✂️ Bisector of a 130° angle'), { size: 23, color: '#E0A106' })}
      ${ray(0, '#334155', 5)}${ray(A, '#334155', 5)}
      ${ray(bis, '#F2545B', 4)}
      <path d="M${cx + 80},${cy} A80,80 0 0 1 ${cx + 80 * Math.cos(-A * Math.PI / 180)},${cy + 80 * Math.sin(-A * Math.PI / 180)}" fill="none" stroke="#94a3b8" stroke-width="3"/>
      ${label(cx + 118, cy - 74, '130°', { size: 24, color: '#475569' })}
      ${label(cx + 168, cy - 26, `${Math.round(bis)}°`, { size: 21, color: '#F2545B', opacity: p })}
      ${label(cx + 22, cy - 152, `${Math.round(A - bis)}°`, { size: 21, color: '#F2545B', opacity: p })}
      <circle cx="${cx}" cy="${cy}" r="6" fill="#334155"/>
      ${resultBox(320, 366, L('130° : 2 = 65° mỗi góc', '130° : 2 = 65° each'), phase(t, 0.82, 1), '#22B27C', 320, 42)}`);
  }),

  scene('Hai đường thẳng song song', 'Hai thanh ray xe lửa luôn cách đều nhau và không bao giờ cắt nhau. Khi một đường thẳng cắt qua, hai góc so le trong bằng nhau.', 9, (t) => {
    const p = phase(t, 0.35, 0.85);
    return svg(`${BG('#E0A106')}
      ${label(320, 48, L('🛤️ Đường ray — hai đường thẳng song song', '🛤️ Railway tracks — two parallel lines'), { size: 21, color: '#E0A106' })}
      <line x1="60" y1="150" x2="600" y2="150" stroke="#4F8EF7" stroke-width="6" stroke-linecap="round"/>
      <line x1="60" y1="280" x2="600" y2="280" stroke="#4F8EF7" stroke-width="6" stroke-linecap="round"/>
      ${emoji(lerp(80, 560, phase(t, 0, 0.9)), 215, '🚆', 48)}
      <line x1="200" y1="110" x2="440" y2="320" stroke="#F2545B" stroke-width="4" opacity="${p}"/>
      ${label(268, 132, '55°', { size: 20, color: '#F2545B', opacity: p })}
      ${label(372, 306, '55°', { size: 20, color: '#F2545B', opacity: p })}
      ${label(320, 356, L('Hai góc so le trong bằng nhau', 'Alternate interior angles are equal'), { size: 19, color: '#475569', opacity: p })}`);
  }),
];

export const LESSON_SCENES = { c1, c2, c3, c4, c5, c6, c7, c8, c9 };

// ---------------------------------------------------------------- Song ngữ
// Bản dịch tiếng Anh cho tiêu đề và lời thuyết minh của từng cảnh.
const SCENE_EN = {
  'Đếm đồ vật': ['Counting objects', 'When you count the apples in a basket you use natural numbers: zero, one, two, three, and so on. The set of natural numbers is written as N.'],
  'Cộng trên tia số': ['Adding on the number line', 'Three plus four is shown as four hops along the number line, from the point three to the point seven.'],
  'Lũy thừa là gì?': ['What is a power?', 'A square tile with a side of three decimetres has three rows of three cells. That makes nine cells altogether, written in short as three squared.'],
  'Đi mua đồ dùng học tập': ['Shopping for school supplies', 'Mai buys three notebooks at eight thousand dong and two pens at five thousand dong. Multiply first, then add: the total is thirty four thousand. From fifty thousand, her change is sixteen thousand dong.'],

  'Ước và bội là gì?': ['What are factors and multiples?', 'Twelve cakes fit into exactly three rows of four, with none left over. Because twelve is divisible by three, three is a factor of twelve and twelve is a multiple of three. Those two statements always come together.'],
  'Tìm tất cả ước của 12': ['Finding every factor of 12', 'To find the factors of twelve, divide twelve by one, by two, by three, and so on up to twelve. Whenever the division leaves no remainder, that divisor is a factor. We get six of them: one, two, three, four, six and twelve. Every number has only finitely many factors.'],
  'Bội của 3 nhiều vô kể': ['Multiples of 3 never run out', 'The multiples of three are three times zero, three times one, three times two, three times three, and so on for ever. On the number line the frog hops three units at a time and never has to stop. So a number has infinitely many multiples.'],

  'Chia kẹo có dư không?': ['Sharing sweets — any left over?', 'Twelve sweets shared equally between three friends give four sweets each, with none left over. We say that twelve is divisible by three.'],
  'Dấu hiệu chia hết cho 3': ['The divisibility test for 3', 'For the number four hundred and seventy one, add the digits: four plus seven plus one makes twelve. Since twelve is divisible by three, the number is divisible by three too.'],
  'Cây thừa số nguyên tố': ['The prime factor tree', 'Break down sixty: sixty is six times ten, six is two times three, and ten is two times five. So sixty equals two squared times three times five.'],
  'Hai chuyến xe buýt': ['Two bus routes', 'Bus A leaves every fifteen minutes and bus B every twenty minutes. Starting together at six o clock, they only leave together again after sixty minutes. That is the lowest common multiple.'],

  'Nhiệt độ ở Sa Pa': ['Temperature in the mountains', 'In the morning the temperature in Sa Pa is minus eight degrees Celsius. By midday it has risen by twelve degrees, so minus eight plus twelve gives four degrees Celsius.'],
  'Tàu ngầm nổi lên': ['The submarine rises', 'The submarine is forty five metres below the surface, written as minus forty five. It rises twenty metres: minus forty five plus twenty equals minus twenty five metres.'],
  'Cộng số nguyên trên trục số': ['Adding integers on the number line', 'Starting at minus three, we hop five units to the right and land on two. So minus three plus five equals two.'],
  'Quy tắc dấu khi nhân': ['The sign rule for multiplying', 'Multiplying two numbers with different signs gives a negative answer: minus three times seven is minus twenty one. Multiplying two numbers with the same sign gives a positive answer.'],

  'Chu vi sân bóng': ['The perimeter of a pitch', 'Walk right around a rectangular pitch thirty metres long and twenty metres wide. Adding the four sides gives a perimeter of one hundred metres.'],
  'Diện tích là bao nhiêu ô?': ['How many unit squares?', 'A garden fifteen metres by eight metres is covered by squares of one metre. There are one hundred and twenty of them, so the area is one hundred and twenty square metres.'],
  'Vì sao diện tích hình thoi chia đôi?': ['Why do we halve for a rhombus?', 'The rhombus fits inside a rectangle whose sides are its two diagonals, and it fills exactly half of it. That is why its area is the product of the diagonals divided by two.'],
  'Cần bao nhiêu viên gạch?': ['How many tiles are needed?', 'The yard is ten metres by six metres and each tile is fifty centimetres square. That is twenty tiles one way and twelve the other, so two hundred and forty tiles in all.'],

  'Gấp đôi cánh bướm': ['Folding the butterfly', 'Fold the butterfly along the vertical line in the middle and the two wings match exactly. That line is called a line of symmetry.'],
  'Chữ cái nào đối xứng?': ['Which letters are symmetric?', 'The letters A and H have a vertical line of symmetry, so folding them in half makes the two halves match. The letter F has no line of symmetry at all.'],
  'Chong chóng quay 180°': ['Turning the pinwheel 180 degrees', 'Turn the pinwheel half a turn, that is one hundred and eighty degrees, about its centre and it looks exactly the same. That point is a centre of symmetry.'],
  'Hình thang cân thì sao?': ['What about an isosceles trapezium?', 'Folded along its vertical line, an isosceles trapezium matches, so it has a line of symmetry. But turned one hundred and eighty degrees it no longer fits, so it has no centre of symmetry.'],

  'Khảo sát môn thể thao': ['A sports survey', 'Twenty students were asked about their favourite sport. On a bar chart, the tallest bar shows the most popular sport: football with eight votes.'],
  'Tung đồng xu 50 lần': ['Tossing a coin fifty times', 'Tossing a coin fifty times gave twenty eight tails. The experimental probability is twenty eight divided by fifty, which is nought point five six.'],
  'Gieo xúc xắc 100 lần': ['Rolling a dice one hundred times', 'Rolling a dice one hundred times, the even faces two, four and six came up fifty four times in total. The experimental probability of an even number is nought point five four.'],

  'Ăn pizza và phân số': ['Pizza and fractions', 'The pizza is cut into eight equal slices. Nam eats three of them, which is three eighths of the pizza.'],
  'Rút gọn phân số': ['Simplifying a fraction', 'Eight twelfths: divide the top and the bottom by four to get two thirds. The two shaded strips are the same size, only divided differently.'],
  'So sánh hai phân số': ['Comparing two fractions', 'Compare three quarters and five sixths. With a common denominator of twelve they become nine twelfths and ten twelfths, so five sixths is the larger.'],
  'Cộng phân số khác mẫu': ['Adding unlike fractions', 'One third plus one sixth. Change one third into two sixths, add to get three sixths, which simplifies to one half.'],

  'Giảm giá 15% là bao nhiêu?': ['How much is 15 percent off?', 'A shirt costing two hundred and fifty thousand dong is reduced by fifteen percent, that is thirty seven thousand five hundred dong. The new price is two hundred and twelve thousand five hundred dong.'],
  'Phần trăm là gì?': ['What does percent mean?', 'Percent means divided into one hundred equal parts. Sixty five percent is simply sixty five cells out of a hundred cell grid.'],
  'Bẫy phần trăm: tăng 20% rồi giảm 20%': ['The percentage trap', 'A price goes up by twenty percent and then down by twenty percent of the new price. It does not return to the original price but ends at ninety six percent, because the reduction is taken from a higher price.'],

  'Kim đồng hồ tạo ra góc': ['Clock hands make an angle', 'Starting from twelve o clock the minute hand turns round. By three o clock the two hands form a right angle of ninety degrees.'],
  'Bốn loại góc': ['The four kinds of angle', 'Watch the ray turn. Below ninety degrees it is an acute angle, at exactly ninety degrees a right angle, above ninety degrees an obtuse angle, and at one hundred and eighty degrees a straight angle.'],
  'Tia phân giác chia đôi góc': ['The bisector halves an angle', 'The bisector lies between the two sides and cuts the angle of one hundred and thirty degrees into two equal angles of sixty five degrees each.'],
  'Hai đường thẳng song song': ['Two parallel lines', 'Two railway tracks stay the same distance apart and never meet. When another line crosses them, the alternate interior angles are equal.'],
};

Object.values(LESSON_SCENES).forEach(list => list.forEach(sc => {
  const e = SCENE_EN[sc.title];
  if (e) { sc.title_en = e[0]; sc.caption_en = e[1]; }
}));
