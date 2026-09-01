// js/anim.js — Engine "video hoạt hình": trình chiếu các cảnh SVG động kèm
// phụ đề và giọng đọc tiếng Việt (Web Speech API). Không cần thư viện ngoài.

// ----------------------------------------------------------- Hàm tiện ích
export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/** Tiến độ riêng của phần tử thứ i trong n phần tử xuất hiện lần lượt. */
export function stagger(t, i, n, overlap = 0.45) {
  const span = 1 / (n - (n - 1) * overlap || 1);
  const start = i * span * (1 - overlap);
  return clamp((t - start) / span);
}

/** Chỉ chạy trong khoảng [from, to] của cảnh, trả về 0..1. */
export function phase(t, from, to) { return clamp((t - from) / (to - from)); }

export const vi = (n) => Number(n).toLocaleString('vi-VN');

export function svg(inner, viewBox = '0 0 640 380') {
  return `<svg viewBox="${viewBox}" class="anim-stage-svg" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

export function label(x, y, text, { size = 22, color = '#1b2436', weight = 800, anchor = 'middle', opacity = 1 } = {}) {
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}" opacity="${opacity}" font-family="system-ui, -apple-system, sans-serif">${text}</text>`;
}

export function emoji(x, y, char, size = 40, opacity = 1, rotate = 0) {
  return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle" dominant-baseline="central" opacity="${opacity}" transform="rotate(${rotate} ${x} ${y})">${char}</text>`;
}

/** Cung nhảy (dùng minh hoạ phép cộng/trừ trên trục số). */
export function hopArc(x1, x2, y, h = 46, color = '#F2545B', progress = 1) {
  const xe = lerp(x1, x2, progress);
  const cx = (x1 + xe) / 2;
  return `<path d="M${x1},${y} Q${cx},${y - h} ${xe},${y}" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="${xe}" cy="${y}" r="8" fill="${color}" stroke="#fff" stroke-width="2.5"/>`;
}

/** Trục số ngang với các mốc, dùng chung cho nhiều cảnh. */
export function axis(x0, x1, y, min, max, { step = 1, color = '#64748b' } = {}) {
  const sc = (x1 - x0) / (max - min);
  let out = `<line x1="${x0 - 14}" y1="${y}" x2="${x1 + 16}" y2="${y}" stroke="${color}" stroke-width="3"/>`;
  for (let v = min; v <= max; v += step) {
    const x = x0 + (v - min) * sc;
    out += `<line x1="${x}" y1="${y - 7}" x2="${x}" y2="${y + 7}" stroke="${color}" stroke-width="2"/>`;
    out += label(x, y + 28, String(v), { size: 15, weight: 600, color: '#475569' });
  }
  return out;
}
export const axisX = (x0, x1, min, max) => (v) => x0 + (v - min) * ((x1 - x0) / (max - min));

/** Hộp kết quả nổi bật (hiện dần). */
export function resultBox(x, y, text, t, color = '#22B27C', w = 260, h = 56) {
  const s = 0.6 + 0.4 * easeOut(clamp(t * 1.6));
  return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${clamp(t * 2)}" >
    <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="16" fill="${color}" fill-opacity="0.14" stroke="${color}" stroke-width="3"/>
    ${label(0, 8, text, { size: 25, color })}
  </g>`;
}

// ----------------------------------------------------------- Trình phát
export class AnimPlayer {
  constructor({ mount, scenes, accent = '#4F8EF7', backHash = '#/', practiceHash = null, title = '' }) {
    this.mount = mount;
    this.scenes = scenes;
    this.accent = accent;
    this.backHash = backHash;
    this.practiceHash = practiceHash;
    this.title = title;
    this.index = 0;
    this.elapsed = 0;          // giây đã trôi trong cảnh hiện tại
    this.playing = false;
    this.voiceOn = true;
    this.lastTs = 0;
    this.rafId = null;
    this.frameGap = 1000 / 30; // 30fps: đủ mượt, nhẹ pin cho iPad
    this.lastDraw = 0;
    this.destroyed = false;
  }

  get scene() { return this.scenes[this.index]; }
  get total() { return this.scenes.reduce((s, x) => s + x.dur, 0); }
  get done() { return this.index >= this.scenes.length - 1 && this.elapsed >= this.scene.dur; }

  render() {
    this.mount.innerHTML = `
      <section class="player" style="--accent:${this.accent}">
        <div class="player-head">
          <a class="icon-btn" href="${this.backHash}" aria-label="Quay lại">←</a>
          <div class="player-title"><b>${this.title}</b><span id="pScene"></span></div>
          <button class="icon-btn" id="pVoice" aria-label="Bật/tắt giọng đọc">🔊</button>
        </div>

        <div class="anim-stage" id="pStage"></div>

        <div class="caption-bar"><p id="pCaption"></p></div>

        <div class="player-bar"><span id="pProgress"></span></div>

        <div class="player-controls">
          <button class="ctrl-btn" id="pPrev" aria-label="Cảnh trước">⏮</button>
          <button class="ctrl-btn ctrl-main" id="pPlay" aria-label="Phát">▶️</button>
          <button class="ctrl-btn" id="pNext" aria-label="Cảnh sau">⏭</button>
          <button class="ctrl-btn" id="pReplay" aria-label="Xem lại từ đầu">🔁</button>
        </div>

        <div class="scene-dots" id="pDots">
          ${this.scenes.map((s, i) => `<button class="scene-dot" data-i="${i}"><b>${i + 1}</b><span>${s.title}</span></button>`).join('')}
        </div>

        <div class="player-end" id="pEnd" hidden>
          <h2>🎉 Hết bài giảng rồi!</h2>
          <p>Em đã xem xong. Giờ luyện tập để nhớ thật lâu nhé!</p>
          <div class="summary-actions">
            <button class="btn btn-outline" id="pEndReplay">🔁 Xem lại</button>
            ${this.practiceHash ? `<a class="btn btn-primary" href="${this.practiceHash}">✏️ Luyện tập ngay</a>` : ''}
          </div>
        </div>
      </section>`;

    this.$stage = this.mount.querySelector('#pStage');
    this.$caption = this.mount.querySelector('#pCaption');
    this.$progress = this.mount.querySelector('#pProgress');
    this.$play = this.mount.querySelector('#pPlay');
    this.$sceneLabel = this.mount.querySelector('#pScene');
    this.$voice = this.mount.querySelector('#pVoice');
    this.$end = this.mount.querySelector('#pEnd');

    this.$play.addEventListener('click', () => this.toggle());
    this.mount.querySelector('#pNext').addEventListener('click', () => this.goto(this.index + 1));
    this.mount.querySelector('#pPrev').addEventListener('click', () => this.goto(this.index - 1));
    this.mount.querySelector('#pReplay').addEventListener('click', () => { this.goto(0); this.play(); });
    this.mount.querySelector('#pEndReplay').addEventListener('click', () => { this.goto(0); this.play(); });
    this.$voice.addEventListener('click', () => this.toggleVoice());
    this.mount.querySelectorAll('.scene-dot').forEach(b => b.addEventListener('click', () => { this.goto(Number(b.dataset.i)); this.play(); }));

    this.enterScene(0, false);
    this.draw(0);
  }

  // ---------------------------------------------------------- điều khiển
  toggle() { this.playing ? this.pause() : this.play(); }

  play() {
    if (this.destroyed) return;
    if (this.done) { this.goto(0); }
    this.playing = true;
    this.$play.textContent = '⏸';
    this.$end.hidden = true;
    this.speak(this.scene.caption, this.elapsed < 0.35);
    this.lastTs = performance.now();
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame((ts) => this.loop(ts));
  }

  pause() {
    this.playing = false;
    if (this.$play) this.$play.textContent = '▶️';
    cancelAnimationFrame(this.rafId);
    try { window.speechSynthesis && window.speechSynthesis.pause(); } catch (e) {}
  }

  goto(i) {
    if (i < 0) i = 0;
    if (i > this.scenes.length - 1) i = this.scenes.length - 1;
    this.enterScene(i, this.playing);
  }

  enterScene(i, speakNow) {
    this.index = i;
    this.elapsed = 0;
    this.$sceneLabel.textContent = `Cảnh ${i + 1}/${this.scenes.length} · ${this.scene.title}`;
    this.$caption.textContent = this.scene.caption;
    this.$caption.classList.remove('caption-in');
    void this.$caption.offsetWidth;      // ép trình duyệt chạy lại hiệu ứng
    this.$caption.classList.add('caption-in');
    this.mount.querySelectorAll('.scene-dot').forEach((b, k) => b.classList.toggle('active', k === i));
    if (speakNow) this.speak(this.scene.caption, true);
    this.draw(0);
  }

  toggleVoice() {
    this.voiceOn = !this.voiceOn;
    this.$voice.textContent = this.voiceOn ? '🔊' : '🔇';
    this.$voice.classList.toggle('muted', !this.voiceOn);
    if (!this.voiceOn) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    else if (this.playing) this.speak(this.scene.caption, true);
  }

  speak(text, restart) {
    if (!this.voiceOn || !text) return;
    try {
      const ss = window.speechSynthesis;
      if (!ss) return;
      if (!restart && ss.paused) { ss.resume(); return; }
      ss.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'vi-VN';
      u.rate = 0.95;
      const v = ss.getVoices().find(x => /vi[-_]VN/i.test(x.lang));
      if (v) u.voice = v;
      ss.speak(u);
    } catch (e) { /* trình duyệt không hỗ trợ đọc — bỏ qua */ }
  }

  // ---------------------------------------------------------- vòng lặp
  loop(ts) {
    if (!this.playing || this.destroyed) return;
    const dt = Math.min(0.05, (ts - this.lastTs) / 1000);
    this.lastTs = ts;
    this.elapsed += dt;

    if (this.elapsed >= this.scene.dur) {
      if (this.index < this.scenes.length - 1) {
        this.enterScene(this.index + 1, true);
      } else {
        this.elapsed = this.scene.dur;
        this.draw(1);
        this.pause();
        this.$end.hidden = false;
        return;
      }
    }
    if (ts - this.lastDraw >= this.frameGap) {
      this.lastDraw = ts;
      this.draw(clamp(this.elapsed / this.scene.dur));
    }
    this.rafId = requestAnimationFrame((t) => this.loop(t));
  }

  draw(t) {
    if (!this.$stage) return;
    this.$stage.innerHTML = this.scene.draw(t);
    const before = this.scenes.slice(0, this.index).reduce((s, x) => s + x.dur, 0);
    this.$progress.style.width = `${((before + t * this.scene.dur) / this.total) * 100}%`;
  }

  destroy() {
    this.destroyed = true;
    this.playing = false;
    cancelAnimationFrame(this.rafId);
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
  }
}
