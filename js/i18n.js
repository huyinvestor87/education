// js/i18n.js — Chuyển đổi ngôn ngữ Việt / Anh cho toàn bộ giao diện và nội dung.
const KEY = 'toan6-lang-v1';

let current = 'vi';
try { const v = localStorage.getItem(KEY); if (v === 'en' || v === 'vi') current = v; } catch (e) {}

export function getLang() { return current; }
export function isEn() { return current === 'en'; }
export function setLang(l) {
  current = l === 'en' ? 'en' : 'vi';
  try { localStorage.setItem(KEY, current); } catch (e) {}
  try { document.documentElement.lang = current === 'en' ? 'en' : 'vi'; } catch (e) {}
}
export function toggleLang() { setLang(current === 'en' ? 'vi' : 'en'); return current; }

/** Chọn giữa hai chuỗi theo ngôn ngữ hiện tại (dùng trong hoạt hình). */
export function L(vi, en) { return current === 'en' && en !== undefined ? en : vi; }

/** Lấy trường dữ liệu song ngữ: tf(chuong,'title') → title hoặc title_en. */
export function tf(obj, field) {
  if (!obj) return '';
  if (current === 'en') {
    const v = obj[field + '_en'];
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return obj[field];
}

export function locale() { return current === 'en' ? 'en-US' : 'vi-VN'; }

const STR = {
  vi: {
    langOther: 'EN', brandName: 'Toán 6 Vui',
    navHome: 'Trang chủ', navPractice: 'Luyện tập', navHsg: 'Học sinh giỏi', navExam: 'Đề thi', navProgress: 'Tiến độ',
    footer: 'Nội dung bám sát SGK Toán 6 — bộ sách <b>Kết nối tri thức với cuộc sống</b>. Học mà chơi, chơi mà học! 🎓',

    heroEyebrow: '📘 Bộ sách Kết nối tri thức với cuộc sống',
    heroTitle: 'Học Toán 6 thật vui,<br>hiểu sâu — nhớ lâu!',
    heroLead: 'Kiến thức trực quan bằng hình ảnh sinh động, gắn liền ví dụ thực tế mỗi ngày: đi chợ, đo sân bóng, xem đồng hồ… Luyện tập từ dễ đến khó, sẵn sàng chinh phục kỳ thi học sinh giỏi!',
    heroCtaPractice: '🚀 Bắt đầu luyện tập', heroCtaExam: '⏱️ Làm đề thi thử',
    statStreakDays: 'ngày liên tiếp 🔥', statDone: 'câu đã luyện', statAccuracy: 'độ chính xác', statBadges: 'huy hiệu 🏅',
    statWrong: 'lần làm sai ❌',
    starHead: 'Mức hoàn thành', starWrongTimes: 'lần sai',
    starNone: 'Chưa có dữ liệu — làm vài câu để nhận sao nhé!',
    star1: 'Cần cố gắng thêm nhé!', star2: 'Đang tiến bộ rồi!', star3: 'Khá tốt!',
    star4: 'Rất giỏi!', star5: 'Xuất sắc — không sai câu nào!',
    starRuleHead: 'Cách tính sao',
    starRule: 'Sao được tính theo số lần làm sai trên mỗi câu đã luyện: không sai lần nào ⭐⭐⭐⭐⭐, dưới 0,1 lần sai/câu ⭐⭐⭐⭐, dưới 0,25 ⭐⭐⭐, dưới 0,5 ⭐⭐, nhiều hơn nữa ⭐. Phải luyện hết số câu của chương mới đạt được sao tối đa.',
    sessionWrong: 'Số lần làm sai trong lượt này:',
    chaptersHead: '9 chương học — bám sát SGK Kết nối tri thức',
    chaptersSub: 'Nhấn vào một chương để xem lý thuyết trực quan, ví dụ thực tế và bắt đầu luyện tập.',
    chapterWord: 'Chương', book1: 'Tập 1', book2: 'Tập 2',
    watchBadge: '▶️ Có bài giảng hoạt hình',
    featuresHead: 'Vì sao học sinh sẽ thích học Toán ở đây?',
    f1t: 'Bài giảng hoạt hình', f1d: 'Mỗi chương là một đoạn phim hoạt hình có thuyết minh: pizza được chia, tàu ngầm nổi lên, kim đồng hồ mở góc…',
    f2t: 'Gắn với đời sống', f2d: 'Ví dụ thực tế: đi chợ, đo sân bóng, xem nhiệt độ, tính giảm giá — Toán học ở ngay xung quanh em.',
    f3t: 'Luyện từ dễ đến khó', f3d: 'Ba mức Dễ – Trung bình – Khó cho từng chủ đề, cùng ngân hàng câu hỏi Học sinh giỏi.',
    f4t: 'Đề thi có đếm giờ', f4d: 'Rèn tốc độ làm bài với các đề kiểm tra và đề thi thử bấm giờ như thi thật.',
    f5t: 'Theo dõi tiến độ', f5d: 'Biểu đồ tiến độ, chuỗi ngày học, huy hiệu thành tích giúp em luôn có động lực.',
    f6t: 'Luyện thi HSG', f6d: 'Bài toán nâng cao, tư duy logic — chuẩn bị tốt cho các kỳ thi học sinh giỏi.',
    ctaBandH: 'Xem tiến độ học tập của em', ctaBandP: 'Theo dõi số câu đã làm đúng, thời gian luyện tập và các huy hiệu đã đạt được.',
    ctaBandBtn: '📊 Xem tiến độ',

    watchLesson: 'Xem bài giảng hoạt hình', scenesWord: 'cảnh',
    practiceHere: 'Luyện tập ngay — Chương', questionsWord: 'câu hỏi',
    hsgTry: '🏆 Thử sức bài nâng cao Học sinh giỏi', allChapters: 'Tất cả chương',

    practiceHubTitle: '🎯 Luyện tập theo chủ đề',
    practiceHubSub: 'Chọn một chương và mức độ để bắt đầu luyện tập. Câu hỏi có phản hồi tức thì cùng lời giải chi tiết.',

    hsgTitle: '🏆 Luyện thi Học sinh giỏi',
    hsgSub: 'Những bài toán nâng cao đòi hỏi tư duy linh hoạt — luyện tập theo từng chương, hoặc thử sức với đề thi HSG tổng hợp có tính giờ.',
    hsgExamBtn: '⏱️ Làm đề thi Học sinh giỏi (90 phút)', hsgCount: 'bài nâng cao', hsgPrefix: 'Nâng cao HSG',

    examHubTitle: '⏱️ Đề thi thử có đếm giờ',
    examHubSub: 'Rèn luyện tốc độ và bản lĩnh phòng thi. Đồng hồ đếm ngược sẽ tự nộp bài khi hết giờ.',
    minutesWord: 'phút', mcqCount: 'câu hỏi trắc nghiệm', bestScore: 'Điểm cao nhất', startExam: 'Bắt đầu làm bài',
    ruleTime: '⏱ Thời gian làm bài', ruleCount: '📄 Số câu hỏi', ruleQuestions: 'câu',
    ruleReview: '🔁 Có thể xem lại và đổi đáp án trước khi nộp bài',
    ruleAuto: '⏰ Hết giờ, bài làm sẽ <b>tự động nộp</b>',
    startNow: '🚀 Bắt đầu làm bài', back: 'Quay lại',

    progressTitle: '📊 Tiến độ học tập của em',
    progressSubA: 'Chuỗi', progressSubB: 'ngày liên tiếp 🔥 — tiếp tục duy trì để đạt thành tích tốt hơn!',
    statExams: 'đề thi đã làm', weekHead: 'Hoạt động 7 ngày gần đây',
    chapterProgressHead: 'Tiến độ theo từng chương', badgeHead: 'Huy hiệu thành tích',
    historyHead: 'Lịch sử làm đề thi', thExam: 'Đề thi', thScore: 'Điểm', thDate: 'Ngày',
    resetBtn: '🗑️ Xóa toàn bộ tiến độ', resetConfirm: 'Xóa toàn bộ tiến độ học tập đã lưu trên thiết bị này?',

    exit: 'Thoát', questionWord: 'Câu', of: '/',
    correct: '✅ Chính xác!', wrong: '❌ Chưa đúng.',
    prevQ: '← Câu trước', nextQ: 'Câu tiếp theo →', submitExam: 'Nộp bài', seeResult: 'Xem kết quả 🎉',
    noQuestions: 'Chưa có câu hỏi', noQuestionsSub: 'Chủ đề này chưa có câu hỏi phù hợp.',
    unansweredA: 'Bạn còn', unansweredB: 'câu chưa trả lời. Vẫn muốn nộp bài?',
    examExitConfirm: 'Bạn đang làm bài thi và giờ vẫn đang chạy. Thoát ra sẽ mất kết quả bài làm dở, bạn có chắc chắn muốn thoát?',

    msgExcellent: '🏆 Xuất sắc!', msgGreat: '🎉 Rất tốt!', msgOk: '💪 Khá ổn, cố gắng thêm nhé!', msgWork: '📚 Cùng ôn lại và luyện thêm nào!',
    youGotA: 'Em trả lời đúng', youGotB: 'câu', autoSubmitted: ' — bài đã tự động nộp khi hết giờ.',
    retry: '🔁 Làm lại', backToList: 'Quay lại danh mục', reviewHead: 'Xem lại chi tiết',
    yourAnswer: 'Đáp án của em:', notAnswered: '(chưa trả lời)', correctAnswer: 'Đáp án đúng:',

    diffEasy: 'Dễ', diffMedium: 'Trung bình', diffHard: 'Khó', diffHsg: 'Nâng cao HSG',

    plScene: 'Cảnh', plVoice: 'Bật/tắt giọng đọc', plPlay: 'Phát', plPrev: 'Cảnh trước', plNext: 'Cảnh sau',
    plReplay: 'Xem lại', plNextScene: 'Chuyển cảnh tiếp theo',
    plEndTitle: '🎉 Hết bài giảng rồi!', plEndText: 'Em đã xem xong. Giờ luyện tập để nhớ thật lâu nhé!',
    plPracticeNow: 'Luyện tập ngay',
  },

  en: {
    langOther: 'VI', brandName: 'Math 6 Fun',
    navHome: 'Home', navPractice: 'Practice', navHsg: 'Gifted', navExam: 'Exams', navProgress: 'Progress',
    footer: 'Content follows the Vietnamese Grade 6 maths curriculum — <b>Kết nối tri thức với cuộc sống</b> textbook series. Learn by playing! 🎓',

    heroEyebrow: '📘 Grade 6 maths — Connecting Knowledge with Life',
    heroTitle: 'Grade 6 maths made fun —<br>understand it, remember it!',
    heroLead: 'Every idea is shown with lively pictures and real-life examples: shopping, measuring a football pitch, reading a clock… Practise from easy to hard and get ready for the gifted-student exam!',
    heroCtaPractice: '🚀 Start practising', heroCtaExam: '⏱️ Take a mock exam',
    statStreakDays: 'day streak 🔥', statDone: 'questions done', statAccuracy: 'accuracy', statBadges: 'badges 🏅',
    statWrong: 'wrong attempts ❌',
    starHead: 'Completion level', starWrongTimes: 'wrong',
    starNone: 'Nothing yet — answer a few questions to earn stars!',
    star1: 'Keep practising!', star2: 'You are getting there!', star3: 'Pretty good!',
    star4: 'Really good!', star5: 'Outstanding — not a single mistake!',
    starRuleHead: 'How stars are worked out',
    starRule: 'Stars come from how many wrong attempts you make per question practised: no mistakes ⭐⭐⭐⭐⭐, under 0.1 wrong per question ⭐⭐⭐⭐, under 0.25 ⭐⭐⭐, under 0.5 ⭐⭐, more than that ⭐. You must practise every question in the chapter to reach the top rating.',
    sessionWrong: 'Wrong attempts this round:',
    chaptersHead: '9 chapters — matching the Grade 6 textbook',
    chaptersSub: 'Tap a chapter for visual theory, real-life examples and practice.',
    chapterWord: 'Chapter', book1: 'Book 1', book2: 'Book 2',
    watchBadge: '▶️ Animated lesson inside',
    featuresHead: 'Why students enjoy maths here',
    f1t: 'Animated lessons', f1d: 'Each chapter is a narrated cartoon: a pizza being shared, a submarine rising, clock hands opening an angle…',
    f2t: 'Rooted in real life', f2d: 'Real examples: shopping, measuring a pitch, reading temperatures, working out discounts — maths is all around you.',
    f3t: 'Easy to hard', f3d: 'Three levels — Easy, Medium, Hard — for every topic, plus a gifted-student question bank.',
    f4t: 'Timed mock exams', f4d: 'Build exam speed and nerve with countdown-timed tests, just like the real thing.',
    f5t: 'Progress tracking', f5d: 'Progress charts, day streaks and achievement badges keep you motivated.',
    f6t: 'Gifted-student prep', f6d: 'Challenging, logic-heavy problems to get you ready for competitions.',
    ctaBandH: 'See how you are doing', ctaBandP: 'Track correct answers, study time and the badges you have earned.',
    ctaBandBtn: '📊 View progress',

    watchLesson: 'Watch the animated lesson', scenesWord: 'scenes',
    practiceHere: 'Practise now — Chapter', questionsWord: 'questions',
    hsgTry: '🏆 Try the gifted-student challenges', allChapters: 'All chapters',

    practiceHubTitle: '🎯 Practice by topic',
    practiceHubSub: 'Pick a chapter and a level to begin. Every question gives instant feedback with a full explanation.',

    hsgTitle: '🏆 Gifted-student training',
    hsgSub: 'Challenging problems that need flexible thinking — practise chapter by chapter, or try the full timed gifted-student paper.',
    hsgExamBtn: '⏱️ Take the gifted-student exam (90 min)', hsgCount: 'challenge problems', hsgPrefix: 'Challenge',

    examHubTitle: '⏱️ Timed mock exams',
    examHubSub: 'Build speed and exam confidence. The countdown submits your paper automatically when time is up.',
    minutesWord: 'min', mcqCount: 'multiple-choice questions', bestScore: 'Best score', startExam: 'Start the exam',
    ruleTime: '⏱ Time allowed', ruleCount: '📄 Number of questions', ruleQuestions: 'questions',
    ruleReview: '🔁 You can review and change answers before submitting',
    ruleAuto: '⏰ When time runs out, your paper is <b>submitted automatically</b>',
    startNow: '🚀 Start the exam', back: 'Back',

    progressTitle: '📊 Your learning progress',
    progressSubA: 'A', progressSubB: 'day streak 🔥 — keep it going to do even better!',
    statExams: 'exams taken', weekHead: 'Activity over the last 7 days',
    chapterProgressHead: 'Progress by chapter', badgeHead: 'Achievement badges',
    historyHead: 'Exam history', thExam: 'Exam', thScore: 'Score', thDate: 'Date',
    resetBtn: '🗑️ Erase all progress', resetConfirm: 'Erase all learning progress saved on this device?',

    exit: 'Exit', questionWord: 'Question', of: '/',
    correct: '✅ Correct!', wrong: '❌ Not quite.',
    prevQ: '← Previous', nextQ: 'Next question →', submitExam: 'Submit', seeResult: 'See results 🎉',
    noQuestions: 'No questions yet', noQuestionsSub: 'There are no questions for this topic yet.',
    unansweredA: 'You still have', unansweredB: 'unanswered questions. Submit anyway?',
    examExitConfirm: 'Your exam is still running. Leaving now will lose your answers — are you sure you want to exit?',

    msgExcellent: '🏆 Outstanding!', msgGreat: '🎉 Very good!', msgOk: '💪 Not bad — keep going!', msgWork: '📚 Let us review and practise more!',
    youGotA: 'You answered', youGotB: 'correctly', autoSubmitted: ' — submitted automatically when time ran out.',
    retry: '🔁 Try again', backToList: 'Back to list', reviewHead: 'Detailed review',
    yourAnswer: 'Your answer:', notAnswered: '(not answered)', correctAnswer: 'Correct answer:',

    diffEasy: 'Easy', diffMedium: 'Medium', diffHard: 'Hard', diffHsg: 'Challenge',

    plScene: 'Scene', plVoice: 'Narration on/off', plPlay: 'Play', plPrev: 'Previous scene', plNext: 'Next scene',
    plReplay: 'Replay', plNextScene: 'Next scene coming up',
    plEndTitle: '🎉 That is the end of the lesson!', plEndText: 'You have watched it all. Now practise so it sticks!',
    plPracticeNow: 'Practise now',
  },
};

export function t(key) {
  const d = STR[current] || STR.vi;
  return d[key] !== undefined ? d[key] : (STR.vi[key] !== undefined ? STR.vi[key] : key);
}

export function playerStrings() {
  return {
    back: t('back'), voice: t('plVoice'), play: t('plPlay'), prevScene: t('plPrev'), nextScene: t('plNext'),
    replay: t('plReplay'), scene: t('plScene'), endTitle: t('plEndTitle'), endText: t('plEndText'),
    practiceNow: t('plPracticeNow'),
  };
}
