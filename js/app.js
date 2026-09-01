// js/app.js — Điều hướng (router) và toàn bộ giao diện của trang web Toán 6.
import { CHAPTERS, QUESTIONS, EXAMS, chapterById, questionsOf } from './data.js?v=df84ac4a-20260901064657';
import * as P from './progress.js?v=df84ac4a-20260901064657';

const app = document.getElementById('app');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

// ----------------------------------------------------------------- Helpers
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function presentable(q) {
  const order = shuffle(q.options.map((_, i) => i));
  const options = order.map(i => q.options[i]);
  const answer = order.indexOf(q.answer);
  return { ...q, options, answer };
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function diffLabel(d) {
  return { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó', hsg: 'Nâng cao HSG' }[d] || d;
}
function diffClass(d) {
  return { easy: 'tag-easy', medium: 'tag-medium', hard: 'tag-hard', hsg: 'tag-hsg' }[d] || '';
}

function go(hash) {
  if (currentQuiz && currentQuiz.mode === 'exam' && !currentQuiz.submitted) {
    if (!confirm('Bạn đang làm bài thi và giờ vẫn đang chạy. Thoát ra sẽ mất kết quả bài làm dở, bạn có chắc chắn muốn thoát?')) return;
    stopTimer();
    currentQuiz = null;
  }
  location.hash = hash;
}
window.go = go; // dùng trong các thuộc tính onclick inline

function progressRing(percent, color, size = 54) {
  const r = (size - 8) / 2, c = 2 * Math.PI * r;
  const off = c - (percent / 100) * c;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="ring">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#e6eaf0" stroke-width="6"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 ${size/2} ${size/2})"/>
    <text x="50%" y="53%" text-anchor="middle" font-size="${size*0.28}" font-weight="700" fill="${color}">${percent}%</text>
  </svg>`;
}

// ----------------------------------------------------------------- Header nav state
function setActiveNav(route) {
  siteNav.querySelectorAll('a[data-route]').forEach(a => {
    a.classList.toggle('active', a.dataset.route === route);
  });
  siteNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

// ----------------------------------------------------------------- VIEW: Trang chủ
function viewHome() {
  const stats = P.overallStats(QUESTIONS);
  const badges = P.earnedBadges();
  app.innerHTML = `
    <section class="hero">
      <div class="hero-text">
        <p class="eyebrow">📘 Bộ sách Kết nối tri thức với cuộc sống</p>
        <h1>Học Toán 6 thật vui,<br>hiểu sâu — nhớ lâu!</h1>
        <p class="lead">Kiến thức trực quan bằng hình ảnh sinh động, gắn liền ví dụ thực tế mỗi ngày: đi chợ, đo sân bóng, xem đồng hồ… Luyện tập từ dễ đến khó, sẵn sàng chinh phục kỳ thi học sinh giỏi!</p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-lg" href="#/luyen-tap">🚀 Bắt đầu luyện tập</a>
          <a class="btn btn-outline btn-lg" href="#/de-thi">⏱️ Làm đề thi thử</a>
        </div>
        ${stats.done > 0 ? `<div class="hero-stats">
          <div><b>${stats.streak}</b><span>ngày liên tiếp 🔥</span></div>
          <div><b>${stats.done}</b><span>câu đã luyện</span></div>
          <div><b>${stats.accuracy}%</b><span>độ chính xác</span></div>
          <div><b>${badges.length}</b><span>huy hiệu 🏅</span></div>
        </div>` : ''}
      </div>
      <div class="hero-art" aria-hidden="true">🧮 📐 🍕 🌡️ 📊 🦋</div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>9 chương học — bám sát SGK Kết nối tri thức</h2>
        <p>Nhấn vào một chương để xem lý thuyết trực quan, ví dụ thực tế và bắt đầu luyện tập.</p>
      </div>
      <div class="chapter-grid">
        ${CHAPTERS.map(ch => {
          const st = P.chapterStats(ch.id, QUESTIONS);
          return `<a class="chapter-card" href="#/chuong/${ch.id}" style="--accent:${ch.color}">
            <div class="chapter-card-top">
              <span class="chapter-emoji">${ch.emoji}</span>
              ${progressRing(st.percent, ch.color, 48)}
            </div>
            <div class="chapter-tag">${ch.book} · Chương ${ch.order}</div>
            <h3>${ch.title}</h3>
            <p>${ch.hook}</p>
          </a>`;
        }).join('')}
      </div>
    </section>

    <section class="section feature-section">
      <div class="section-head">
        <h2>Vì sao học sinh sẽ thích học Toán ở đây?</h2>
      </div>
      <div class="feature-grid">
        <div class="feature"><span>🖼️</span><h3>Trực quan, sinh động</h3><p>Mọi kiến thức đều minh họa bằng hình vẽ, biểu đồ, đồng hồ, trục số… dễ hình dung.</p></div>
        <div class="feature"><span>🛒</span><h3>Gắn với đời sống</h3><p>Ví dụ thực tế: đi chợ, đo sân bóng, xem nhiệt độ, tính giảm giá — Toán học ở ngay xung quanh em.</p></div>
        <div class="feature"><span>🎯</span><h3>Luyện từ dễ đến khó</h3><p>Ba mức Dễ – Trung bình – Khó cho từng chủ đề, cùng ngân hàng câu hỏi Học sinh giỏi.</p></div>
        <div class="feature"><span>⏱️</span><h3>Đề thi có đếm giờ</h3><p>Rèn tốc độ làm bài với các đề kiểm tra và đề thi thử bấm giờ như thi thật.</p></div>
        <div class="feature"><span>📈</span><h3>Theo dõi tiến độ</h3><p>Biểu đồ tiến độ, chuỗi ngày học, huy hiệu thành tích giúp em luôn có động lực.</p></div>
        <div class="feature"><span>🏆</span><h3>Luyện thi HSG</h3><p>Bài toán nâng cao, tư duy logic — chuẩn bị tốt cho các kỳ thi học sinh giỏi.</p></div>
      </div>
    </section>

    <section class="section cta-band">
      <div>
        <h2>Xem tiến độ học tập của em</h2>
        <p>Theo dõi số câu đã làm đúng, thời gian luyện tập và các huy hiệu đã đạt được.</p>
      </div>
      <a class="btn btn-primary btn-lg" href="#/tien-do">📊 Xem tiến độ</a>
    </section>
  `;
}

// ----------------------------------------------------------------- VIEW: Chi tiết chương
function viewChapter(id) {
  const ch = chapterById(id);
  if (!ch) { go('#/'); return; }
  const idx = CHAPTERS.findIndex(c => c.id === id);
  const prev = CHAPTERS[idx - 1], next = CHAPTERS[idx + 1];
  const diffs = ['easy', 'medium', 'hard'];
  const hasHsg = questionsOf(id, 'hsg').length > 0;

  app.innerHTML = `
    <section class="chapter-banner" style="--accent:${ch.color}">
      <div class="chapter-banner-emoji">${ch.emoji}</div>
      <div>
        <div class="chapter-tag light">${ch.book} · Chương ${ch.order}</div>
        <h1>${ch.title}</h1>
        <p>${ch.hook}</p>
      </div>
    </section>

    <section class="section">
      <div class="theory-list">
        ${ch.theory.map(t => `
          <article class="theory-card">
            <h3>${t.heading}</h3>
            <div class="theory-content">
              <div class="theory-text">${t.html}</div>
              ${t.illus ? `<div class="theory-illus">${t.illus}</div>` : ''}
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="section practice-cta" style="--accent:${ch.color}">
      <h2>Luyện tập ngay — Chương ${ch.order}</h2>
      <div class="diff-grid">
        ${diffs.map(d => {
          const qs = questionsOf(id, d);
          const st = qs.length ? Math.round(qs.filter(q => P.loadProgress().answered[q.id]?.correct).length / qs.length * 100) : 0;
          return `<a class="diff-card ${diffClass(d)}" href="#/luyen-tap/${id}/${d}">
            <span class="diff-name">${diffLabel(d)}</span>
            <span class="diff-count">${qs.length} câu hỏi</span>
            <div class="mini-bar"><span style="width:${st}%"></span></div>
          </a>`;
        }).join('')}
      </div>
      ${hasHsg ? `<a class="btn btn-hsg" href="#/hsg/${id}">🏆 Thử sức bài nâng cao Học sinh giỏi</a>` : ''}
    </section>

    <nav class="chapter-pager">
      ${prev ? `<a href="#/chuong/${prev.id}">← ${prev.title}</a>` : '<span></span>'}
      <a href="#/" class="pager-home">Tất cả chương</a>
      ${next ? `<a href="#/chuong/${next.id}">${next.title} →</a>` : '<span></span>'}
    </nav>
  `;
}

// ----------------------------------------------------------------- VIEW: Trung tâm luyện tập
function viewPracticeHub() {
  app.innerHTML = `
    <section class="page-head">
      <h1>🎯 Luyện tập theo chủ đề</h1>
      <p>Chọn một chương và mức độ để bắt đầu luyện tập. Câu hỏi có phản hồi tức thì cùng lời giải chi tiết.</p>
    </section>
    <section class="section">
      <div class="practice-hub-grid">
        ${CHAPTERS.map(ch => `
          <div class="hub-card" style="--accent:${ch.color}">
            <div class="hub-card-head">
              <span class="chapter-emoji">${ch.emoji}</span>
              <div><div class="chapter-tag">${ch.book} · Chương ${ch.order}</div><h3>${ch.title}</h3></div>
            </div>
            <div class="diff-row">
              ${['easy', 'medium', 'hard'].map(d => `<a class="chip ${diffClass(d)}" href="#/luyen-tap/${ch.id}/${d}">${diffLabel(d)} (${questionsOf(ch.id, d).length})</a>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// ----------------------------------------------------------------- VIEW: HSG hub
function viewHsgHub(chapterId) {
  if (chapterId) {
    startQuiz({
      mode: 'practice',
      title: `Nâng cao HSG · ${chapterById(chapterId).title}`,
      accent: chapterById(chapterId).color,
      questions: questionsOf(chapterId, 'hsg'),
      backHash: '#/hsg',
    });
    return;
  }
  app.innerHTML = `
    <section class="page-head hsg-head">
      <h1>🏆 Luyện thi Học sinh giỏi</h1>
      <p>Những bài toán nâng cao đòi hỏi tư duy linh hoạt — luyện tập theo từng chương, hoặc thử sức với đề thi HSG tổng hợp có tính giờ.</p>
      <a class="btn btn-primary btn-lg" href="#/de-thi/hsg">⏱️ Làm đề thi Học sinh giỏi (90 phút)</a>
    </section>
    <section class="section">
      <div class="practice-hub-grid">
        ${CHAPTERS.map(ch => {
          const n = questionsOf(ch.id, 'hsg').length;
          if (!n) return '';
          return `<a class="hub-card hub-card-link" style="--accent:${ch.color}" href="#/hsg/${ch.id}">
            <div class="hub-card-head">
              <span class="chapter-emoji">${ch.emoji}</span>
              <div><div class="chapter-tag">Chương ${ch.order}</div><h3>${ch.title}</h3></div>
            </div>
            <span class="chip tag-hsg">${n} bài nâng cao →</span>
          </a>`;
        }).join('')}
      </div>
    </section>
  `;
}

// ----------------------------------------------------------------- VIEW: Đề thi hub
function viewExamHub() {
  const p = P.loadProgress();
  app.innerHTML = `
    <section class="page-head">
      <h1>⏱️ Đề thi thử có đếm giờ</h1>
      <p>Rèn luyện tốc độ và bản lĩnh phòng thi. Đồng hồ đếm ngược sẽ tự nộp bài khi hết giờ.</p>
    </section>
    <section class="section">
      <div class="exam-grid">
        ${EXAMS.map(ex => {
          const totalQ = Object.values(ex.mix).reduce((a, b) => a + b, 0);
          const best = p.examHistory.filter(h => h.examId === ex.id).sort((a, b) => (b.score / b.total) - (a.score / a.total))[0];
          return `<div class="exam-card ${ex.id === 'hsg' ? 'exam-card-hsg' : ''}">
            <div class="exam-card-head">
              <h3>${ex.title}</h3>
              <span class="exam-time">⏱ ${ex.minutes} phút</span>
            </div>
            <p>${ex.desc}</p>
            <div class="exam-meta">${totalQ} câu hỏi trắc nghiệm</div>
            ${best ? `<div class="exam-best">Điểm cao nhất: <b>${best.score}/${best.total}</b></div>` : ''}
            <button class="btn btn-primary" data-start-exam="${ex.id}">Bắt đầu làm bài</button>
          </div>`;
        }).join('')}
      </div>
    </section>
  `;
  app.querySelectorAll('[data-start-exam]').forEach(btn => {
    btn.addEventListener('click', () => go(`#/de-thi/${btn.dataset.startExam}`));
  });
}

function sampleExamQuestions(ex) {
  let picked = [];
  Object.entries(ex.mix).forEach(([diff, count]) => {
    let pool = [];
    ex.chapters.forEach(cid => pool.push(...questionsOf(cid, diff)));
    picked.push(...shuffle(pool).slice(0, count));
  });
  return shuffle(picked).map(presentable);
}

function viewExamStart(examId) {
  const ex = EXAMS.find(e => e.id === examId);
  if (!ex) { go('#/de-thi'); return; }
  const totalQ = Object.values(ex.mix).reduce((a, b) => a + b, 0);
  app.innerHTML = `
    <section class="exam-intro">
      <h1>${ex.title}</h1>
      <p>${ex.desc}</p>
      <ul class="exam-rules">
        <li>⏱ Thời gian làm bài: <b>${ex.minutes} phút</b></li>
        <li>📄 Số câu hỏi: <b>${totalQ} câu</b> trắc nghiệm</li>
        <li>🔁 Có thể xem lại và đổi đáp án trước khi nộp bài</li>
        <li>⏰ Hết giờ, bài làm sẽ <b>tự động nộp</b></li>
      </ul>
      <button class="btn btn-primary btn-lg" id="startExamBtn">🚀 Bắt đầu làm bài</button>
      <a class="btn btn-outline" href="#/de-thi">Quay lại</a>
    </section>
  `;
  document.getElementById('startExamBtn').addEventListener('click', () => {
    startQuiz({
      mode: 'exam',
      examId: ex.id,
      title: ex.title,
      accent: '#4F8EF7',
      questions: sampleExamQuestions(ex),
      timerSeconds: ex.minutes * 60,
      backHash: '#/de-thi',
    });
  });
}

// ----------------------------------------------------------------- VIEW: Tiến độ
function viewProgress() {
  const stats = P.overallStats(QUESTIONS);
  const p = P.loadProgress();
  const badges = P.BADGES;
  const earned = new Set(P.earnedBadges().map(b => b.id));
  const last7 = [...Array(7)].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return { label: d.toLocaleDateString('vi-VN', { weekday: 'short' }), value: p.days[key] || 0 };
  });
  const maxDay = Math.max(...last7.map(d => d.value), 1);

  app.innerHTML = `
    <section class="page-head">
      <h1>📊 Tiến độ học tập của em</h1>
      <p>Chuỗi ${stats.streak} ngày liên tiếp 🔥 — tiếp tục duy trì để đạt thành tích tốt hơn!</p>
    </section>

    <section class="section">
      <div class="stat-grid">
        <div class="stat-box"><span class="stat-num">${stats.done}</span><span>câu đã luyện</span></div>
        <div class="stat-box"><span class="stat-num">${stats.accuracy}%</span><span>độ chính xác</span></div>
        <div class="stat-box"><span class="stat-num">${stats.streak}</span><span>ngày liên tiếp</span></div>
        <div class="stat-box"><span class="stat-num">${stats.examCount}</span><span>đề thi đã làm</span></div>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>Hoạt động 7 ngày gần đây</h2></div>
      <div class="week-chart">
        ${last7.map(d => `<div class="week-bar"><div class="bar-fill" style="height:${Math.max(6, d.value / maxDay * 100)}%"></div><span>${d.value}</span><label>${d.label}</label></div>`).join('')}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>Tiến độ theo từng chương</h2></div>
      <div class="chapter-progress-list">
        ${CHAPTERS.map(ch => {
          const st = P.chapterStats(ch.id, QUESTIONS);
          return `<a class="chapter-progress-row" href="#/chuong/${ch.id}" style="--accent:${ch.color}">
            <span class="chapter-emoji">${ch.emoji}</span>
            <div class="cpr-info"><b>${ch.title}</b><div class="mini-bar"><span style="width:${st.percent}%"></span></div></div>
            <span class="cpr-percent">${st.percent}%</span>
          </a>`;
        }).join('')}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>Huy hiệu thành tích</h2></div>
      <div class="badge-grid">
        ${badges.map(b => `<div class="badge-item ${earned.has(b.id) ? 'earned' : ''}">
          <span class="badge-emoji">${b.emoji}</span><b>${b.name}</b><p>${b.desc}</p>
        </div>`).join('')}
      </div>
    </section>

    ${p.examHistory.length ? `<section class="section">
      <div class="section-head"><h2>Lịch sử làm đề thi</h2></div>
      <div class="table-wrap"><table class="history-table">
        <thead><tr><th>Đề thi</th><th>Điểm</th><th>Ngày</th></tr></thead>
        <tbody>${p.examHistory.slice(0, 10).map(h => `<tr><td>${h.title}</td><td><b>${h.score}/${h.total}</b></td><td>${new Date(h.ts).toLocaleDateString('vi-VN')}</td></tr>`).join('')}</tbody>
      </table></div>
    </section>` : ''}

    <section class="section" style="text-align:center">
      <button class="btn btn-outline" id="resetBtn">🗑️ Xóa toàn bộ tiến độ</button>
    </section>
  `;
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Xóa toàn bộ tiến độ học tập đã lưu trên thiết bị này?')) { P.resetProgress(); viewProgress(); }
  });
}

// ----------------------------------------------------------------- QUIZ ENGINE
let currentQuiz = null;

function startQuiz({ mode, title, accent, questions, timerSeconds, backHash, examId }) {
  const qs = mode === 'practice' ? questions.map(presentable) : questions;
  currentQuiz = {
    mode, title, accent: accent || '#4F8EF7', examId,
    questions: qs, originalQuestions: questions, index: 0, answers: {}, checked: {},
    timerSeconds, remaining: timerSeconds || null, submitted: false,
    backHash: backHash || '#/', startedAt: Date.now(),
  };
  if (!qs.length) {
    app.innerHTML = `<section class="page-head"><h1>Chưa có câu hỏi</h1><p>Chủ đề này chưa có câu hỏi phù hợp.</p><a class="btn btn-primary" href="${backHash || '#/'}">Quay lại</a></section>`;
    return;
  }
  if (mode === 'exam') startTimer();
  renderQuiz();
}

function stopTimer() {
  if (currentQuiz && currentQuiz.timerHandle) { clearInterval(currentQuiz.timerHandle); currentQuiz.timerHandle = null; }
}

function startTimer() {
  currentQuiz.timerHandle = setInterval(() => {
    currentQuiz.remaining--;
    const el = document.getElementById('examTimer');
    if (el) {
      el.textContent = fmtTime(Math.max(0, currentQuiz.remaining));
      el.classList.toggle('timer-warn', currentQuiz.remaining <= 60);
    }
    if (currentQuiz.remaining <= 0) {
      stopTimer();
      submitExam(true);
    }
  }, 1000);
}

function renderQuiz() {
  const q = currentQuiz.questions[currentQuiz.index];
  const total = currentQuiz.questions.length;
  const isExam = currentQuiz.mode === 'exam';
  const answered = currentQuiz.answers[q.id];
  const checked = currentQuiz.checked[q.id];

  app.innerHTML = `
    <section class="quiz-wrap" style="--accent:${currentQuiz.accent}">
      <div class="quiz-top">
        <div class="quiz-title">
          <button class="icon-btn" id="quizExit" aria-label="Thoát">←</button>
          <div><b>${currentQuiz.title}</b><span>Câu ${currentQuiz.index + 1} / ${total}${!isExam ? ` · ${diffLabel(q.difficulty)}` : ''}</span></div>
        </div>
        ${isExam ? `<div class="exam-timer" id="examTimer">${fmtTime(currentQuiz.remaining)}</div>` : ''}
      </div>
      <div class="quiz-progress"><span style="width:${(currentQuiz.index + 1) / total * 100}%"></span></div>

      ${isExam ? `<div class="question-palette">
        ${currentQuiz.questions.map((qq, i) => `<button class="pal-btn ${i === currentQuiz.index ? 'current' : ''} ${currentQuiz.answers[qq.id] !== undefined ? 'answered' : ''}" data-goto="${i}">${i + 1}</button>`).join('')}
      </div>` : ''}

      <div class="question-card">
        ${q.illus ? `<div class="question-illus">${q.illus}</div>` : ''}
        <h2 class="question-text">${q.q}</h2>
        <div class="options">
          ${q.options.map((opt, i) => {
            let cls = 'option';
            if (isExam) {
              if (answered === i) cls += ' selected';
            } else if (checked) {
              if (i === q.answer) cls += ' correct';
              else if (i === answered && i !== q.answer) cls += ' wrong';
            } else if (answered === i) cls += ' selected';
            return `<button class="${cls}" data-opt="${i}" ${(!isExam && checked) ? 'disabled' : ''}>
              <span class="opt-letter">${String.fromCharCode(65 + i)}</span><span>${opt}</span>
            </button>`;
          }).join('')}
        </div>
        ${(!isExam && checked) ? `<div class="explain-box ${answered === q.answer ? 'ok' : 'no'}">
          <b>${answered === q.answer ? '✅ Chính xác!' : '❌ Chưa đúng.'}</b>
          <p>${q.explain}</p>
        </div>` : ''}
      </div>

      <div class="quiz-nav">
        ${isExam ? `
          <button class="btn btn-outline" id="prevQ" ${currentQuiz.index === 0 ? 'disabled' : ''}>← Câu trước</button>
          ${currentQuiz.index === total - 1
            ? `<button class="btn btn-primary" id="submitExam">Nộp bài</button>`
            : `<button class="btn btn-primary" id="nextQ">Câu tiếp theo →</button>`}
        ` : `
          ${checked ? `<button class="btn btn-primary" id="nextQ">${currentQuiz.index === total - 1 ? 'Xem kết quả 🎉' : 'Câu tiếp theo →'}</button>` : '<span></span>'}
        `}
      </div>
    </section>
  `;

  document.getElementById('quizExit').addEventListener('click', () => {
    const back = currentQuiz.backHash || '#/';
    stopTimer(); currentQuiz = null; location.hash = back; render();
  });

  app.querySelectorAll('.option').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.opt);
      currentQuiz.answers[q.id] = i;
      if (!isExam) {
        currentQuiz.checked[q.id] = true;
        P.recordAnswer(q, i === q.answer);
      }
      renderQuiz();
    });
  });

  const nextBtn = document.getElementById('nextQ');
  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (currentQuiz.index < total - 1) { currentQuiz.index++; renderQuiz(); }
    else if (!isExam) { renderSummary(); }
  });
  const prevBtn = document.getElementById('prevQ');
  if (prevBtn) prevBtn.addEventListener('click', () => { currentQuiz.index--; renderQuiz(); });
  const submitBtn = document.getElementById('submitExam');
  if (submitBtn) submitBtn.addEventListener('click', () => {
    const unanswered = total - Object.keys(currentQuiz.answers).length;
    if (unanswered > 0 && !confirm(`Bạn còn ${unanswered} câu chưa trả lời. Vẫn muốn nộp bài?`)) return;
    stopTimer();
    submitExam(false);
  });
  app.querySelectorAll('.pal-btn').forEach(btn => btn.addEventListener('click', () => { currentQuiz.index = Number(btn.dataset.goto); renderQuiz(); }));
}

function submitExam(auto) {
  const total = currentQuiz.questions.length;
  let score = 0;
  currentQuiz.questions.forEach(q => { if (currentQuiz.answers[q.id] === q.answer) score++; });
  currentQuiz.submitted = true;
  currentQuiz.autoSubmitted = auto;
  const elapsed = Math.round((Date.now() - currentQuiz.startedAt) / 1000);
  P.recordExam({ examId: currentQuiz.examId, title: currentQuiz.title, score, total, minutes: Math.ceil(elapsed / 60) });
  renderSummary();
}

function renderSummary() {
  const total = currentQuiz.questions.length;
  const isExam = currentQuiz.mode === 'exam';
  let score = 0;
  currentQuiz.questions.forEach(q => { if (currentQuiz.answers[q.id] === q.answer) score++; });
  const percent = Math.round((score / total) * 100);
  const scoreMsg = percent >= 90 ? '🏆 Xuất sắc!' : percent >= 70 ? '🎉 Rất tốt!' : percent >= 50 ? '💪 Khá ổn, cố gắng thêm nhé!' : '📚 Cùng ôn lại và luyện thêm nào!';

  app.innerHTML = `
    <section class="summary-wrap" style="--accent:${currentQuiz.accent}">
      <div class="summary-hero">
        ${progressRing(percent, currentQuiz.accent, 120)}
        <h1>${scoreMsg}</h1>
        <p>Em trả lời đúng <b>${score}/${total}</b> câu${currentQuiz.autoSubmitted ? ' — bài đã tự động nộp khi hết giờ.' : '.'}</p>
        <div class="summary-actions">
          <button class="btn btn-primary" id="retryBtn">🔁 Làm lại</button>
          <a class="btn btn-outline" href="${currentQuiz.backHash}">Quay lại danh mục</a>
          <a class="btn btn-outline" href="#/tien-do">📊 Xem tiến độ</a>
        </div>
      </div>
      <div class="review-list">
        <h2>Xem lại chi tiết</h2>
        ${currentQuiz.questions.map((q, i) => {
          const a = currentQuiz.answers[q.id];
          const ok = a === q.answer;
          return `<div class="review-item ${ok ? 'ok' : 'no'}">
            <div class="review-head"><span>${ok ? '✅' : '❌'} Câu ${i + 1}</span><span class="tag ${diffClass(q.difficulty)}">${diffLabel(q.difficulty)}</span></div>
            <p class="review-q">${q.q}</p>
            <p class="review-answer">Đáp án của em: <b>${a !== undefined ? q.options[a] : '(chưa trả lời)'}</b>${!ok ? ` — Đáp án đúng: <b>${q.options[q.answer]}</b>` : ''}</p>
            <p class="review-explain">💡 ${q.explain}</p>
          </div>`;
        }).join('')}
      </div>
    </section>
  `;
  document.getElementById('retryBtn').addEventListener('click', () => {
    startQuiz({
      mode: currentQuiz.mode, title: currentQuiz.title, accent: currentQuiz.accent,
      timerSeconds: currentQuiz.timerSeconds, backHash: currentQuiz.backHash, examId: currentQuiz.examId,
      questions: currentQuiz.mode === 'exam' ? shuffle(currentQuiz.originalQuestions).map(presentable) : currentQuiz.originalQuestions,
    });
  });
}

// ----------------------------------------------------------------- ROUTER
function render() {
  stopTimer();
  const hash = location.hash || '#/';
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);

  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  if (parts.length === 0) { setActiveNav('home'); viewHome(); return; }

  if (parts[0] === 'chuong' && parts[1]) { setActiveNav('chuong'); viewChapter(parts[1]); return; }

  if (parts[0] === 'luyen-tap' && parts[1] && parts[2]) {
    setActiveNav('luyen-tap');
    const ch = chapterById(parts[1]);
    startQuiz({
      mode: 'practice',
      title: `${diffLabel(parts[2])} · ${ch ? ch.title : ''}`,
      accent: ch ? ch.color : '#4F8EF7',
      questions: questionsOf(parts[1], parts[2]),
      backHash: `#/chuong/${parts[1]}`,
    });
    return;
  }
  if (parts[0] === 'luyen-tap') { setActiveNav('luyen-tap'); viewPracticeHub(); return; }

  if (parts[0] === 'hsg' && parts[1]) { setActiveNav('hsg'); viewHsgHub(parts[1]); return; }
  if (parts[0] === 'hsg') { setActiveNav('hsg'); viewHsgHub(); return; }

  if (parts[0] === 'de-thi' && parts[1]) { setActiveNav('de-thi'); viewExamStart(parts[1]); return; }
  if (parts[0] === 'de-thi') { setActiveNav('de-thi'); viewExamHub(); return; }

  if (parts[0] === 'tien-do') { setActiveNav('tien-do'); viewProgress(); return; }

  setActiveNav('home'); viewHome();
}

document.body.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#/"]');
  if (!a) return;
  if (currentQuiz && currentQuiz.mode === 'exam' && !currentQuiz.submitted) {
    if (!confirm('Bạn đang làm bài thi và giờ vẫn đang chạy. Rời khỏi trang sẽ mất kết quả bài làm dở, bạn có chắc chắn muốn thoát?')) {
      e.preventDefault();
    } else {
      stopTimer();
      currentQuiz = null;
    }
  }
});

window.addEventListener('hashchange', () => { render(); });
navToggle.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
document.getElementById('year').textContent = new Date().getFullYear();

render();
