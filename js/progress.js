// js/progress.js
// Lưu trữ và quản lý tiến độ học tập của học sinh (localStorage — không cần đăng nhập).

const KEY = 'toan6-tiendo-v1';

function today() {
  return new Date().toISOString().slice(0, 10);
}

function blank() {
  return {
    answered: {},       // questionId -> { correct, wrong, attempts, firstTry, difficulty, chapter, ts }
    examHistory: [],     // [{ examId, title, score, total, minutes, ts, correctIds, wrongIds }]
    days: {},             // 'YYYY-MM-DD' -> số câu đã làm trong ngày
    lastActive: null,
    streak: 0,
  };
}

// Dữ liệu lưu từ phiên bản cũ chỉ có { correct } — suy ra số lần sai để không
// mất tiến độ của học sinh khi nâng cấp.
function normalize(a) {
  if (!a) return null;
  if (typeof a.wrong === 'number') return a;
  return { ...a, wrong: a.correct ? 0 : 1, attempts: 1, firstTry: !!a.correct };
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    const data = JSON.parse(raw);
    return { ...blank(), ...data };
  } catch (e) {
    return blank();
  }
}

export function saveProgress(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* ignore quota / private mode */ }
}

function touchStreak(p) {
  const t = today();
  if (p.lastActive === t) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  const yStr = y.toISOString().slice(0, 10);
  p.streak = p.lastActive === yStr ? (p.streak || 0) + 1 : 1;
  p.lastActive = t;
}

// countDay = false khi ghi từng câu của một đề thi, vì recordExam đã cộng cả đề
// vào biểu đồ ngày rồi — nếu cộng thêm sẽ bị tính hai lần.
export function recordAnswer(question, isCorrect, countDay = true) {
  const p = loadProgress();
  const prev = normalize(p.answered[question.id]);
  p.answered[question.id] = {
    correct: isCorrect,
    wrong: (prev?.wrong || 0) + (isCorrect ? 0 : 1),   // cộng dồn số lần làm sai
    attempts: (prev?.attempts || 0) + 1,
    firstTry: prev ? prev.firstTry : isCorrect,        // có đúng ngay lần đầu không
    difficulty: question.difficulty, chapter: question.chapter, ts: Date.now(),
  };
  if (countDay) {
    const t = today();
    p.days[t] = (p.days[t] || 0) + 1;
  }
  touchStreak(p);
  saveProgress(p);
  return p;
}

export function recordExam(result) {
  const p = loadProgress();
  p.examHistory.unshift({ ...result, ts: Date.now() });
  p.examHistory = p.examHistory.slice(0, 30);
  const t = today();
  p.days[t] = (p.days[t] || 0) + (result.total || 0);
  touchStreak(p);
  saveProgress(p);
  return p;
}

export const STAR_MAX = 5;

/**
 * Xếp hạng sao dựa trên SỐ LẦN LÀM SAI trên mỗi câu đã luyện.
 * Không sai lần nào → 5⭐. Càng sai nhiều thì càng ít sao.
 * Chưa làm hết số câu của chương thì chưa thể đạt sao tối đa.
 */
export function starsFor(done, total, wrong) {
  if (!done) return 0;
  const rate = wrong / done;                       // số lần sai trung bình mỗi câu
  const byMistakes = rate === 0 ? 5 : rate <= 0.1 ? 4 : rate <= 0.25 ? 3 : rate <= 0.5 ? 2 : 1;
  if (!total) return byMistakes;
  const byCompletion = Math.max(1, Math.ceil((done / total) * STAR_MAX));
  return Math.min(byMistakes, byCompletion);
}

export function chapterStats(chapterId, allQuestions) {
  const p = loadProgress();
  const qs = allQuestions.filter(q => q.chapter === chapterId);
  let done = 0, correct = 0, wrong = 0, flawless = 0;
  qs.forEach(q => {
    const a = normalize(p.answered[q.id]);
    if (a) { done++; if (a.correct) correct++; wrong += a.wrong; if (a.firstTry) flawless++; }
  });
  return {
    total: qs.length, done, correct, wrong, flawless,
    percent: qs.length ? Math.round((done / qs.length) * 100) : 0,
    stars: starsFor(done, qs.length, wrong),
  };
}

export function overallStats(allQuestions) {
  const p = loadProgress();
  const totalQ = allQuestions.length;
  const entries = Object.values(p.answered).map(normalize);
  const done = entries.length;
  const correct = entries.filter(a => a.correct).length;
  const wrong = entries.reduce((s, a) => s + a.wrong, 0);
  const examCount = p.examHistory.length;
  const avgExamScore = examCount ? Math.round(p.examHistory.reduce((s, e) => s + (e.score / e.total) * 100, 0) / examCount) : 0;
  return {
    totalQ, done, correct, wrong,
    accuracy: done ? Math.round((correct / done) * 100) : 0,
    stars: starsFor(done, totalQ, wrong),
    streak: p.streak || 0, examCount, avgExamScore,
  };
}

/** Tổng số lần làm sai của một danh sách câu hỏi bất kì (dùng cho màn kết quả). */
export function wrongCountOf(questionIds) {
  const p = loadProgress();
  return questionIds.reduce((s, id) => s + (normalize(p.answered[id])?.wrong || 0), 0);
}

export const BADGES = [
  { id: 'first-step', name: 'Bước chân đầu tiên', name_en: 'First step', emoji: '🌱', desc: 'Hoàn thành bài luyện tập đầu tiên', desc_en: 'Finish your first practice question', test: (p) => Object.keys(p.answered).length >= 1 },
  { id: 'ten-done', name: 'Chăm chỉ', name_en: 'Hard worker', emoji: '📚', desc: 'Làm đúng 10 câu hỏi', desc_en: 'Answer 10 questions correctly', test: (p) => Object.values(p.answered).filter(a => a.correct).length >= 10 },
  { id: 'fifty-done', name: 'Cày cuốc', name_en: 'On fire', emoji: '🔥', desc: 'Làm đúng 50 câu hỏi', desc_en: 'Answer 50 questions correctly', test: (p) => Object.values(p.answered).filter(a => a.correct).length >= 50 },
  { id: 'streak3', name: 'Kiên trì 3 ngày', name_en: '3-day streak', emoji: '🗓️', desc: 'Học liên tục 3 ngày', desc_en: 'Study three days in a row', test: (p) => (p.streak || 0) >= 3 },
  { id: 'streak7', name: 'Bền bỉ 7 ngày', name_en: '7-day streak', emoji: '🏅', desc: 'Học liên tục 7 ngày', desc_en: 'Study seven days in a row', test: (p) => (p.streak || 0) >= 7 },
  { id: 'first-exam', name: 'Thí sinh nhí', name_en: 'Exam rookie', emoji: '📝', desc: 'Hoàn thành một đề thi thử', desc_en: 'Complete one mock exam', test: (p) => p.examHistory.length >= 1 },
  { id: 'exam10', name: 'Điểm 10 trọn vẹn', name_en: 'Perfect score', emoji: '💯', desc: 'Đạt điểm tuyệt đối trong một đề thi', desc_en: 'Get full marks on an exam', test: (p) => p.examHistory.some(e => e.score === e.total && e.total > 0) },
  { id: 'hsg-brave', name: 'Dũng sĩ HSG', name_en: 'Challenge hero', emoji: '🏆', desc: 'Hoàn thành một đề thi Học sinh giỏi', desc_en: 'Complete a gifted-student exam', test: (p) => p.examHistory.some(e => e.examId === 'hsg') },
  { id: 'first-try-20', name: 'Chuẩn không cần chỉnh', name_en: 'Right first time', emoji: '🎯', desc: 'Làm đúng ngay lần đầu 20 câu', desc_en: 'Get 20 questions right on the first try', test: (p) => Object.values(p.answered).map(normalize).filter(a => a.firstTry).length >= 20 },
  { id: 'comeback', name: 'Sửa sai giỏi', name_en: 'Bounce back', emoji: '💪', desc: 'Làm lại đúng 5 câu từng bị sai', desc_en: 'Fix five questions you once got wrong', test: (p) => Object.values(p.answered).map(normalize).filter(a => a.correct && a.wrong > 0).length >= 5 },
];

export function earnedBadges() {
  const p = loadProgress();
  return BADGES.filter(b => b.test(p));
}

export function resetProgress() {
  saveProgress(blank());
}
