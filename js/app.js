// js/app.js — Điều hướng (router) và toàn bộ giao diện của trang web Toán 6.
import { CHAPTERS, QUESTIONS, EXAMS, chapterById, questionsOf } from './data.js?v=__BUILD_ID__';
import * as P from './progress.js?v=__BUILD_ID__';
import { LESSON_SCENES } from './lessons.js?v=__BUILD_ID__';
import { AnimPlayer } from './anim.js?v=__BUILD_ID__';
import { t, tf, getLang, setLang, toggleLang, locale, playerStrings } from './i18n.js?v=__BUILD_ID__';

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
  const out = { ...q, options, answer };
  // Bản dịch phải xáo theo đúng thứ tự mới, nếu không chỉ số đáp án đúng sẽ
  // trỏ sai phương án khi đang xem bằng tiếng Anh.
  if (Array.isArray(q.options_en)) out.options_en = order.map(i => q.options_en[i]);
  return out;
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function diffLabel(d) {
  return { easy: t('diffEasy'), medium: t('diffMedium'), hard: t('diffHard'), hsg: t('diffHsg') }[d] || d;
}
function bookLabel(ch) { return ch.order <= 6 ? t('book1') : t('book2'); }
function chapTag(ch) { return `${bookLabel(ch)} · ${t('chapterWord')} ${ch.order}`; }
function diffClass(d) {
  return { easy: 'tag-easy', medium: 'tag-medium', hard: 'tag-hard', hsg: 'tag-hsg' }[d] || '';
}

/** Dải sao ⭐ thể hiện mức hoàn thành (0–5). */
function starRow(n, size = '') {
  const stars = [...Array(P.STAR_MAX)].map((_, i) =>
    `<span class="star ${i < n ? 'on' : 'off'}">${i < n ? '⭐' : '☆'}</span>`).join('');
  return `<span class="star-row ${size}" role="img" aria-label="${n}/${P.STAR_MAX}">${stars}</span>`;
}
function starMessage(n) {
  return n === 0 ? t('starNone') : t(`star${n}`);
}

function go(hash) {
  if (currentQuiz && currentQuiz.mode === 'exam' && !currentQuiz.submitted) {
    if (!confirm(t('examExitConfirm'))) return;
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
        <p class="eyebrow">${t('heroEyebrow')}</p>
        <h1>${t('heroTitle')}</h1>
        <p class="lead">${t('heroLead')}</p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-lg" href="#/luyen-tap">${t('heroCtaPractice')}</a>
          <a class="btn btn-outline btn-lg" href="#/de-thi">${t('heroCtaExam')}</a>
        </div>
        ${stats.done > 0 ? `<div class="hero-stats">
          <div><b>${stats.streak}</b><span>${t('statStreakDays')}</span></div>
          <div><b>${stats.done}</b><span>${t('statDone')}</span></div>
          <div><b>${stats.accuracy}%</b><span>${t('statAccuracy')}</span></div>
          <div><b>${badges.length}</b><span>${t('statBadges')}</span></div>
        </div>` : ''}
      </div>
      <div class="hero-art" aria-hidden="true">🧮 📐 🍕 🌡️ 📊 🦋</div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>${t('chaptersHead')}</h2>
        <p>${t('chaptersSub')}</p>
      </div>
      <div class="chapter-grid">
        ${CHAPTERS.map(ch => {
          const st = P.chapterStats(ch.id, QUESTIONS);
          return `<a class="chapter-card" href="#/chuong/${ch.id}" style="--accent:${ch.color}">
            <div class="chapter-card-top">
              <span class="chapter-emoji">${ch.emoji}</span>
              ${progressRing(st.percent, ch.color, 48)}
            </div>
            <div class="chapter-tag">${chapTag(ch)}</div>
            <h3>${tf(ch, 'title')}</h3>
            <p>${tf(ch, 'hook')}</p>
            ${LESSON_SCENES[ch.id] ? `<span class="watch-badge">${t('watchBadge')}</span>` : ''}
          </a>`;
        }).join('')}
      </div>
    </section>

    <section class="section feature-section">
      <div class="section-head">
        <h2>${t('featuresHead')}</h2>
      </div>
      <div class="feature-grid">
        <div class="feature"><span>🎬</span><h3>${t('f1t')}</h3><p>${t('f1d')}</p></div>
        <div class="feature"><span>🛒</span><h3>${t('f2t')}</h3><p>${t('f2d')}</p></div>
        <div class="feature"><span>🎯</span><h3>${t('f3t')}</h3><p>${t('f3d')}</p></div>
        <div class="feature"><span>⏱️</span><h3>${t('f4t')}</h3><p>${t('f4d')}</p></div>
        <div class="feature"><span>📈</span><h3>${t('f5t')}</h3><p>${t('f5d')}</p></div>
        <div class="feature"><span>🏆</span><h3>${t('f6t')}</h3><p>${t('f6d')}</p></div>
      </div>
    </section>

    <section class="section cta-band">
      <div>
        <h2>${t('ctaBandH')}</h2>
        <p>${t('ctaBandP')}</p>
      </div>
      <a class="btn btn-primary btn-lg" href="#/tien-do">${t('ctaBandBtn')}</a>
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
        <div class="chapter-tag light">${chapTag(ch)}</div>
        <h1>${tf(ch, 'title')}</h1>
        <p>${tf(ch, 'hook')}</p>
        ${LESSON_SCENES[ch.id] ? `<a class="btn btn-watch" href="#/bai-giang/${ch.id}">▶️ ${t('watchLesson')} (${LESSON_SCENES[ch.id].length} ${t('scenesWord')})</a>` : ''}
      </div>
    </section>

    <section class="section">
      <div class="theory-list">
        ${ch.theory.map(sec => `
          <article class="theory-card">
            <h3>${tf(sec, 'heading')}</h3>
            <div class="theory-content">
              <div class="theory-text">${tf(sec, 'html')}</div>
              ${sec.illus ? `<div class="theory-illus">${sec.illus}</div>` : ''}
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="section practice-cta" style="--accent:${ch.color}">
      <h2>${t('practiceHere')} ${ch.order}</h2>
      <div class="diff-grid">
        ${diffs.map(d => {
          const qs = questionsOf(id, d);
          const st = qs.length ? Math.round(qs.filter(q => P.loadProgress().answered[q.id]?.correct).length / qs.length * 100) : 0;
          return `<a class="diff-card ${diffClass(d)}" href="#/luyen-tap/${id}/${d}">
            <span class="diff-name">${diffLabel(d)}</span>
            <span class="diff-count">${qs.length} ${t('questionsWord')}</span>
            <div class="mini-bar"><span style="width:${st}%"></span></div>
          </a>`;
        }).join('')}
      </div>
      ${hasHsg ? `<a class="btn btn-hsg" href="#/hsg/${id}">${t('hsgTry')}</a>` : ''}
    </section>

    <nav class="chapter-pager">
      ${prev ? `<a href="#/chuong/${prev.id}">← ${tf(prev, 'title')}</a>` : '<span></span>'}
      <a href="#/" class="pager-home">${t('allChapters')}</a>
      ${next ? `<a href="#/chuong/${next.id}">${tf(next, 'title')} →</a>` : '<span></span>'}
    </nav>
  `;
}

// ----------------------------------------------------------------- VIEW: Trung tâm luyện tập
function viewPracticeHub() {
  app.innerHTML = `
    <section class="page-head">
      <h1>${t('practiceHubTitle')}</h1>
      <p>${t('practiceHubSub')}</p>
    </section>
    <section class="section">
      <div class="practice-hub-grid">
        ${CHAPTERS.map(ch => `
          <div class="hub-card" style="--accent:${ch.color}">
            <div class="hub-card-head">
              <span class="chapter-emoji">${ch.emoji}</span>
              <div><div class="chapter-tag">${chapTag(ch)}</div><h3>${tf(ch, 'title')}</h3></div>
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
      title: `${t('hsgPrefix')} · ${tf(chapterById(chapterId), 'title')}`,
      accent: chapterById(chapterId).color,
      questions: questionsOf(chapterId, 'hsg'),
      backHash: '#/hsg',
    });
    return;
  }
  app.innerHTML = `
    <section class="page-head hsg-head">
      <h1>${t('hsgTitle')}</h1>
      <p>${t('hsgSub')}</p>
      <a class="btn btn-primary btn-lg" href="#/de-thi/hsg">${t('hsgExamBtn')}</a>
    </section>
    <section class="section">
      <div class="practice-hub-grid">
        ${CHAPTERS.map(ch => {
          const n = questionsOf(ch.id, 'hsg').length;
          if (!n) return '';
          return `<a class="hub-card hub-card-link" style="--accent:${ch.color}" href="#/hsg/${ch.id}">
            <div class="hub-card-head">
              <span class="chapter-emoji">${ch.emoji}</span>
              <div><div class="chapter-tag">${t('chapterWord')} ${ch.order}</div><h3>${tf(ch, 'title')}</h3></div>
            </div>
            <span class="chip tag-hsg">${n} ${t('hsgCount')} →</span>
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
      <h1>${t('examHubTitle')}</h1>
      <p>${t('examHubSub')}</p>
    </section>
    <section class="section">
      <div class="exam-grid">
        ${EXAMS.map(ex => {
          const totalQ = Object.values(ex.mix).reduce((a, b) => a + b, 0);
          const best = p.examHistory.filter(h => h.examId === ex.id).sort((a, b) => (b.score / b.total) - (a.score / a.total))[0];
          return `<div class="exam-card ${ex.id === 'hsg' ? 'exam-card-hsg' : ''}">
            <div class="exam-card-head">
              <h3>${tf(ex, 'title')}</h3>
              <span class="exam-time">⏱ ${ex.minutes} ${t('minutesWord')}</span>
            </div>
            <p>${tf(ex, 'desc')}</p>
            <div class="exam-meta">${totalQ} ${t('mcqCount')}</div>
            ${best ? `<div class="exam-best">${t('bestScore')}: <b>${best.score}/${best.total}</b></div>` : ''}
            <button class="btn btn-primary" data-start-exam="${ex.id}">${t('startExam')}</button>
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
      <h1>${tf(ex, 'title')}</h1>
      <p>${tf(ex, 'desc')}</p>
      <ul class="exam-rules">
        <li>${t('ruleTime')}: <b>${ex.minutes} ${t('minutesWord')}</b></li>
        <li>${t('ruleCount')}: <b>${totalQ} ${t('ruleQuestions')}</b></li>
        <li>${t('ruleReview')}</li>
        <li>${t('ruleAuto')}</li>
      </ul>
      <button class="btn btn-primary btn-lg" id="startExamBtn">${t('startNow')}</button>
      <a class="btn btn-outline" href="#/de-thi">${t('back')}</a>
    </section>
  `;
  document.getElementById('startExamBtn').addEventListener('click', () => {
    startQuiz({
      mode: 'exam',
      examId: ex.id,
      title: tf(ex, 'title'),
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
    return { label: d.toLocaleDateString(locale(), { weekday: 'short' }), value: p.days[key] || 0 };
  });
  const maxDay = Math.max(...last7.map(d => d.value), 1);

  app.innerHTML = `
    <section class="page-head">
      <h1>${t('progressTitle')}</h1>
      <p>${t('progressSubA')} ${stats.streak} ${t('progressSubB')}</p>
    </section>

    <section class="section">
      <div class="stat-grid">
        <div class="stat-box"><span class="stat-num">${stats.done}</span><span>${t('statDone')}</span></div>
        <div class="stat-box"><span class="stat-num">${stats.accuracy}%</span><span>${t('statAccuracy')}</span></div>
        <div class="stat-box"><span class="stat-num">${stats.wrong}</span><span>${t('statWrong')}</span></div>
        <div class="stat-box"><span class="stat-num">${stats.streak}</span><span>${t('statStreakDays')}</span></div>
        <div class="stat-box"><span class="stat-num">${stats.examCount}</span><span>${t('statExams')}</span></div>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>${t('starHead')}</h2></div>
      <div class="star-hero">
        ${starRow(stats.stars, 'big')}
        <b>${starMessage(stats.stars)}</b>
        <p>${stats.done} ${t('statDone')} · ${stats.wrong} ${t('starWrongTimes')}</p>
        <details class="star-rule"><summary>${t('starRuleHead')}</summary><p>${t('starRule')}</p></details>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>${t('weekHead')}</h2></div>
      <div class="week-chart">
        ${last7.map(d => `<div class="week-bar"><div class="bar-fill" style="height:${Math.max(6, d.value / maxDay * 100)}%"></div><span>${d.value}</span><label>${d.label}</label></div>`).join('')}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>${t('chapterProgressHead')}</h2></div>
      <div class="chapter-progress-list">
        ${CHAPTERS.map(ch => {
          const st = P.chapterStats(ch.id, QUESTIONS);
          return `<a class="chapter-progress-row" href="#/chuong/${ch.id}" style="--accent:${ch.color}">
            <span class="chapter-emoji">${ch.emoji}</span>
            <div class="cpr-info">
              <b>${tf(ch, 'title')}</b>
              <div class="mini-bar"><span style="width:${st.percent}%"></span></div>
              <span class="cpr-stars">${starRow(st.stars)} <small>${st.wrong} ${t('starWrongTimes')}</small></span>
            </div>
            <span class="cpr-percent">${st.percent}%</span>
          </a>`;
        }).join('')}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>${t('badgeHead')}</h2></div>
      <div class="badge-grid">
        ${badges.map(b => `<div class="badge-item ${earned.has(b.id) ? 'earned' : ''}">
          <span class="badge-emoji">${b.emoji}</span><b>${tf(b, 'name')}</b><p>${tf(b, 'desc')}</p>
        </div>`).join('')}
      </div>
    </section>

    ${p.examHistory.length ? `<section class="section">
      <div class="section-head"><h2>${t('historyHead')}</h2></div>
      <div class="table-wrap"><table class="history-table">
        <thead><tr><th>${t('thExam')}</th><th>${t('thScore')}</th><th>${t('thDate')}</th></tr></thead>
        <tbody>${p.examHistory.slice(0, 10).map(h => `<tr><td>${h.title}</td><td><b>${h.score}/${h.total}</b></td><td>${new Date(h.ts).toLocaleDateString(locale())}</td></tr>`).join('')}</tbody>
      </table></div>
    </section>` : ''}

    <section class="section" style="text-align:center">
      <button class="btn btn-outline" id="resetBtn">${t('resetBtn')}</button>
    </section>
  `;
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm(t('resetConfirm'))) { P.resetProgress(); viewProgress(); }
  });
}

// ----------------------------------------------------------------- VIEW: Bài giảng hoạt hình
function viewLesson(chapterId) {
  const ch = chapterById(chapterId);
  const scenes = LESSON_SCENES[chapterId];
  if (!ch || !scenes) { go('#/'); return; }
  currentPlayer = new AnimPlayer({
    mount: app,
    scenes,
    accent: ch.color,
    title: `${ch.emoji} ${tf(ch, 'title')}`,
    backHash: `#/chuong/${chapterId}`,
    practiceHash: `#/luyen-tap/${chapterId}/easy`,
    lang: getLang(),
    strings: playerStrings(),
  });
  currentPlayer.render();
}

// ----------------------------------------------------------------- QUIZ ENGINE
let currentQuiz = null;
let currentPlayer = null;

function startQuiz({ mode, title, accent, questions, timerSeconds, backHash, examId }) {
  const qs = mode === 'practice' ? questions.map(presentable) : questions;
  currentQuiz = {
    mode, title, accent: accent || '#4F8EF7', examId,
    questions: qs, originalQuestions: questions, index: 0, answers: {}, checked: {},
    timerSeconds, remaining: timerSeconds || null, submitted: false,
    backHash: backHash || '#/', startedAt: Date.now(),
  };
  if (!qs.length) {
    app.innerHTML = `<section class="page-head"><h1>${t('noQuestions')}</h1><p>${t('noQuestionsSub')}</p><a class="btn btn-primary" href="${backHash || '#/'}">${t('back')}</a></section>`;
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
          <button class="icon-btn" id="quizExit" aria-label="${t('exit')}">←</button>
          <div><b>${currentQuiz.title}</b><span>${t('questionWord')} ${currentQuiz.index + 1} / ${total}${!isExam ? ` · ${diffLabel(q.difficulty)}` : ''}</span></div>
        </div>
        ${isExam ? `<div class="exam-timer" id="examTimer">${fmtTime(currentQuiz.remaining)}</div>` : ''}
      </div>
      <div class="quiz-progress"><span style="width:${(currentQuiz.index + 1) / total * 100}%"></span></div>

      ${isExam ? `<div class="question-palette">
        ${currentQuiz.questions.map((qq, i) => `<button class="pal-btn ${i === currentQuiz.index ? 'current' : ''} ${currentQuiz.answers[qq.id] !== undefined ? 'answered' : ''}" data-goto="${i}">${i + 1}</button>`).join('')}
      </div>` : ''}

      <div class="question-card">
        ${q.illus ? `<div class="question-illus">${q.illus}</div>` : ''}
        <h2 class="question-text">${tf(q, 'q')}</h2>
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
              <span class="opt-letter">${String.fromCharCode(65 + i)}</span><span>${(tf(q, 'options') || q.options)[i]}</span>
            </button>`;
          }).join('')}
        </div>
        ${(!isExam && checked) ? `<div class="explain-box ${answered === q.answer ? 'ok' : 'no'}">
          <b>${answered === q.answer ? t('correct') : t('wrong')}</b>
          <p>${tf(q, 'explain')}</p>
        </div>` : ''}
      </div>

      <div class="quiz-nav">
        ${isExam ? `
          <button class="btn btn-outline" id="prevQ" ${currentQuiz.index === 0 ? 'disabled' : ''}>${t('prevQ')}</button>
          ${currentQuiz.index === total - 1
            ? `<button class="btn btn-primary" id="submitExam">${t('submitExam')}</button>`
            : `<button class="btn btn-primary" id="nextQ">${t('nextQ')}</button>`}
        ` : `
          ${checked ? `<button class="btn btn-primary" id="nextQ">${currentQuiz.index === total - 1 ? t('seeResult') : t('nextQ')}</button>` : '<span></span>'}
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
    if (unanswered > 0 && !confirm(`${t('unansweredA')} ${unanswered} ${t('unansweredB')}`)) return;
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
  // Câu sai trong đề thi cũng là làm sai — ghi nhận để đếm vào xếp hạng sao.
  // Chỉ tính những câu học sinh thực sự có chọn đáp án.
  currentQuiz.questions.forEach(q => {
    if (currentQuiz.answers[q.id] !== undefined) P.recordAnswer(q, currentQuiz.answers[q.id] === q.answer, false);
  });
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
  const scoreMsg = percent >= 90 ? t('msgExcellent') : percent >= 70 ? t('msgGreat') : percent >= 50 ? t('msgOk') : t('msgWork');
  const wrongThisRound = total - score;
  const stars = P.starsFor(total, total, wrongThisRound);

  app.innerHTML = `
    <section class="summary-wrap" style="--accent:${currentQuiz.accent}">
      <div class="summary-hero">
        ${progressRing(percent, currentQuiz.accent, 120)}
        <h1>${scoreMsg}</h1>
        <p>${t('youGotA')} <b>${score}/${total}</b> ${t('youGotB')}${currentQuiz.autoSubmitted ? t('autoSubmitted') : '.'}</p>
        <div class="summary-stars">
          ${starRow(stars, 'big')}
          <p>${t('sessionWrong')} <b>${wrongThisRound}</b></p>
        </div>
        <div class="summary-actions">
          <button class="btn btn-primary" id="retryBtn">${t('retry')}</button>
          <a class="btn btn-outline" href="${currentQuiz.backHash}">${t('backToList')}</a>
          <a class="btn btn-outline" href="#/tien-do">${t('ctaBandBtn')}</a>
        </div>
      </div>
      <div class="review-list">
        <h2>${t('reviewHead')}</h2>
        ${currentQuiz.questions.map((q, i) => {
          const a = currentQuiz.answers[q.id];
          const ok = a === q.answer;
          return `<div class="review-item ${ok ? 'ok' : 'no'}">
            <div class="review-head"><span>${ok ? '✅' : '❌'} ${t('questionWord')} ${i + 1}</span><span class="tag ${diffClass(q.difficulty)}">${diffLabel(q.difficulty)}</span></div>
            <p class="review-q">${tf(q, 'q')}</p>
            <p class="review-answer">${t('yourAnswer')} <b>${a !== undefined ? (tf(q, 'options') || q.options)[a] : t('notAnswered')}</b>${!ok ? ` — ${t('correctAnswer')} <b>${(tf(q, 'options') || q.options)[q.answer]}</b>` : ''}</p>
            <p class="review-explain">💡 ${tf(q, 'explain')}</p>
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
  if (currentPlayer) { currentPlayer.destroy(); currentPlayer = null; }
  const hash = location.hash || '#/';
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);

  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  if (parts.length === 0) { setActiveNav('home'); viewHome(); return; }

  if (parts[0] === 'chuong' && parts[1]) { setActiveNav('chuong'); viewChapter(parts[1]); return; }

  if (parts[0] === 'bai-giang' && parts[1]) { setActiveNav('bai-giang'); viewLesson(parts[1]); return; }

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
function applyStaticI18n() {
  document.documentElement.lang = getLang() === 'en' ? 'en' : 'vi';
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  const brand = document.getElementById('brandName');
  if (brand) brand.textContent = t('brandName');
  const foot = document.getElementById('footerText');
  if (foot) foot.innerHTML = t('footer');
  const ll = document.getElementById('langLabel');
  if (ll) ll.textContent = t('langOther');
}

const langBtn = document.getElementById('langToggle');
if (langBtn) langBtn.addEventListener('click', () => {
  if (currentQuiz && currentQuiz.mode === 'exam' && !currentQuiz.submitted && !confirm(t('examExitConfirm'))) return;
  toggleLang();
  applyStaticI18n();
  if (currentQuiz && !currentQuiz.submitted) { stopTimer(); currentQuiz = null; }
  render();
});

applyStaticI18n();
document.getElementById('year').textContent = new Date().getFullYear();

render();
