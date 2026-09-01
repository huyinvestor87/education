// js/progress.js
// Lưu trữ và quản lý tiến độ học tập của học sinh (localStorage — không cần đăng nhập).

const KEY = 'toan6-tiendo-v1';

function today() {
  return new Date().toISOString().slice(0, 10);
}

function blank() {
  return {
    answered: {},       // questionId -> { correct: bool, difficulty, chapter, ts }
    examHistory: [],     // [{ examId, title, score, total, minutes, ts, correctIds, wrongIds }]
    days: {},             // 'YYYY-MM-DD' -> số câu đã làm trong ngày
    lastActive: null,
    streak: 0,
  };
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

export function recordAnswer(question, isCorrect) {
  const p = loadProgress();
  p.answered[question.id] = { correct: isCorrect, difficulty: question.difficulty, chapter: question.chapter, ts: Date.now() };
  const t = today();
  p.days[t] = (p.days[t] || 0) + 1;
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

export function chapterStats(chapterId, allQuestions) {
  const p = loadProgress();
  const qs = allQuestions.filter(q => q.chapter === chapterId);
  let done = 0, correct = 0;
  qs.forEach(q => {
    const a = p.answered[q.id];
    if (a) { done++; if (a.correct) correct++; }
  });
  return { total: qs.length, done, correct, percent: qs.length ? Math.round((done / qs.length) * 100) : 0 };
}

export function overallStats(allQuestions) {
  const p = loadProgress();
  const totalQ = allQuestions.length;
  const doneIds = Object.keys(p.answered);
  const done = doneIds.length;
  const correct = doneIds.filter(id => p.answered[id].correct).length;
  const examCount = p.examHistory.length;
  const avgExamScore = examCount ? Math.round(p.examHistory.reduce((s, e) => s + (e.score / e.total) * 100, 0) / examCount) : 0;
  return { totalQ, done, correct, accuracy: done ? Math.round((correct / done) * 100) : 0, streak: p.streak || 0, examCount, avgExamScore };
}

export const BADGES = [
  { id: 'first-step', name: 'Bước chân đầu tiên', emoji: '🌱', desc: 'Hoàn thành bài luyện tập đầu tiên', test: (p) => Object.keys(p.answered).length >= 1 },
  { id: 'ten-done', name: 'Chăm chỉ', emoji: '📚', desc: 'Làm đúng 10 câu hỏi', test: (p) => Object.values(p.answered).filter(a => a.correct).length >= 10 },
  { id: 'fifty-done', name: 'Cày cuốc', emoji: '🔥', desc: 'Làm đúng 50 câu hỏi', test: (p) => Object.values(p.answered).filter(a => a.correct).length >= 50 },
  { id: 'streak3', name: 'Kiên trì 3 ngày', emoji: '🗓️', desc: 'Học liên tục 3 ngày', test: (p) => (p.streak || 0) >= 3 },
  { id: 'streak7', name: 'Bền bỉ 7 ngày', emoji: '🏅', desc: 'Học liên tục 7 ngày', test: (p) => (p.streak || 0) >= 7 },
  { id: 'first-exam', name: 'Thí sinh nhí', emoji: '📝', desc: 'Hoàn thành một đề thi thử', test: (p) => p.examHistory.length >= 1 },
  { id: 'exam10', name: 'Điểm 10 trọn vẹn', emoji: '💯', desc: 'Đạt điểm tuyệt đối trong một đề thi', test: (p) => p.examHistory.some(e => e.score === e.total && e.total > 0) },
  { id: 'hsg-brave', name: 'Dũng sĩ HSG', emoji: '🏆', desc: 'Hoàn thành một đề thi Học sinh giỏi', test: (p) => p.examHistory.some(e => e.examId === 'hsg') },
];

export function earnedBadges() {
  const p = loadProgress();
  return BADGES.filter(b => b.test(p));
}

export function resetProgress() {
  saveProgress(blank());
}
