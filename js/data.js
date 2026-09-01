// js/data.js
// Toàn bộ nội dung chương trình Toán 6 – bộ sách Kết nối tri thức với cuộc sống.
import * as I from './illustrations.js';

export const CHAPTERS = [
  // ============================================================= CHƯƠNG 1
  {
    id: 'c1', order: 1, book: 'Tập 1',
    title: 'Tập hợp các số tự nhiên',
    emoji: '🔢', color: '#4F8EF7',
    hook: 'Đếm số bạn trong lớp, số trang sách, số tiền mua đồ dùng học tập… tất cả đều bắt đầu từ số tự nhiên!',
    theory: [
      {
        heading: '1. Tập hợp số tự nhiên',
        html: `<p>Tập hợp các số tự nhiên được kí hiệu <b>N</b> = {0; 1; 2; 3; 4; …}. Nếu bỏ số 0 ta được tập <b>N*</b> = {1; 2; 3; …}.</p>
        <p>Một tập hợp có thể viết bằng cách <b>liệt kê phần tử</b>: A = {0; 1; 2; 3; 4}, hoặc <b>chỉ ra tính chất đặc trưng</b>: A = {x ∈ N | x < 5}.</p>
        <p class="reallife">🎒 Ví dụ thực tế: Số học sinh trong lớp, số quyển vở trong cặp, số tầng của một tòa nhà… đều là các số tự nhiên.</p>`,
      },
      {
        heading: '2. Thứ tự trong tập hợp số tự nhiên',
        html: `<p>Trên tia số, số đứng trước bao giờ cũng nhỏ hơn số đứng sau. Mỗi số tự nhiên có một số liền sau và (trừ số 0) có một số liền trước.</p>`,
        illusFn: () => I.numberLine({ min: 0, max: 10, points: [{ value: 4, color: '#4F8EF7' }, { value: 8, color: '#F2545B' }] }),
      },
      {
        heading: '3. Phép cộng, trừ, nhân, chia và lũy thừa',
        html: `<p>Lũy thừa với số mũ tự nhiên: <b>aⁿ = a × a × … × a</b> (n thừa số a), n gọi là số mũ.</p>
        <p>Nhân hai lũy thừa cùng cơ số: <b>aᵐ × aⁿ = a^(m+n)</b>. Chia hai lũy thừa cùng cơ số: <b>aᵐ : aⁿ = a^(m−n)</b> (a ≠ 0, m ≥ n).</p>
        <p class="reallife">🧱 Ví dụ thực tế: Viên gạch hình vuông cạnh 3dm có diện tích 3² = 9 dm². Khối Rubik cạnh 3cm có thể tích 3³ = 27 cm³. Một tế bào cứ sau mỗi lần phân chia thì số lượng nhân đôi: sau 5 lần chia sẽ có 2⁵ = 32 tế bào.</p>`,
      },
      {
        heading: '4. Thứ tự thực hiện phép tính',
        html: `<p>Không có ngoặc: <b>Lũy thừa → Nhân, chia → Cộng, trừ</b>.</p>
        <p>Có ngoặc: thực hiện trong ngoặc tròn <b>( )</b> trước, rồi đến ngoặc vuông <b>[ ]</b>, rồi đến ngoặc nhọn <b>{ }</b>.</p>
        <p class="reallife">🛒 Ví dụ thực tế: Mai mua 3 quyển vở giá 8 000đ và 2 cây bút giá 5 000đ, đưa cô bán hàng tờ 50 000đ. Số tiền được trả lại là:<br>50 000 − (3 × 8 000 + 2 × 5 000) = 50 000 − 34 000 = <b>16 000 đồng</b>.</p>`,
      },
    ],
  },

  // ============================================================= CHƯƠNG 2
  {
    id: 'c2', order: 2, book: 'Tập 1',
    title: 'Tính chia hết trong tập hợp số tự nhiên',
    emoji: '➗', color: '#22B27C',
    hook: 'Vì sao chia kẹo, chia đội chơi hay xếp lịch xe buýt luôn "chia đều" được? Bí quyết nằm ở tính chia hết!',
    theory: [
      {
        heading: '1. Dấu hiệu chia hết',
        html: `<ul>
          <li>Chia hết cho <b>2</b>: chữ số tận cùng là 0, 2, 4, 6, 8.</li>
          <li>Chia hết cho <b>5</b>: chữ số tận cùng là 0 hoặc 5.</li>
          <li>Chia hết cho <b>3</b>: tổng các chữ số chia hết cho 3.</li>
          <li>Chia hết cho <b>9</b>: tổng các chữ số chia hết cho 9.</li>
        </ul>`,
      },
      {
        heading: '2. Số nguyên tố, hợp số và phân tích ra thừa số nguyên tố',
        html: `<p>Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có đúng 2 ước là 1 và chính nó (2, 3, 5, 7, 11, 13…). Hợp số là số tự nhiên lớn hơn 1 có nhiều hơn 2 ước.</p>
        <p>Mọi hợp số đều viết được thành tích các thừa số nguyên tố, gọi là <b>phân tích ra thừa số nguyên tố</b>, thường trình bày bằng sơ đồ cây.</p>`,
        illusFn: () => I.factorTree(),
      },
      {
        heading: '3. Ước chung, ƯCLN – Bội chung, BCNN',
        html: `<p><b>ƯCLN(a, b)</b> là số lớn nhất trong tập hợp các ước chung của a và b. <b>BCNN(a, b)</b> là số nhỏ nhất khác 0 trong tập hợp các bội chung của a và b. Ta tìm chúng bằng cách phân tích a, b ra thừa số nguyên tố.</p>
        <p class="reallife">🎒 Ví dụ thực tế: Cô giáo có 24 cây bút và 36 quyển vở, muốn chia đều thành nhiều phần thưởng nhất có thể sao cho phần bút và vở ở mỗi phần bằng nhau. Số phần thưởng nhiều nhất chính là <b>ƯCLN(24, 36) = 12</b> phần.</p>
        <p class="reallife">🚌 Xe buýt A cứ 15 phút xuất phát một chuyến, xe buýt B cứ 20 phút xuất phát một chuyến, cả hai cùng xuất phát lúc 6 giờ. Lần tiếp theo hai xe cùng xuất phát là sau <b>BCNN(15, 20) = 60 phút</b>, tức là lúc 7 giờ.</p>`,
      },
    ],
  },

  // ============================================================= CHƯƠNG 3
  {
    id: 'c3', order: 3, book: 'Tập 1',
    title: 'Số nguyên',
    emoji: '🌡️', color: '#7C5CFC',
    hook: 'Nhiệt độ dưới 0°C ở Sa Pa, độ sâu của tàu ngầm, hay khoản tiền còn nợ ngân hàng — tất cả cần đến số âm!',
    theory: [
      {
        heading: '1. Số nguyên âm và tập hợp số nguyên',
        html: `<p>Các số −1, −2, −3, … là các số nguyên âm. Tập hợp số nguyên <b>Z</b> = {…; −3; −2; −1; 0; 1; 2; 3; …} gồm số nguyên âm, số 0 và số nguyên dương.</p>
        <p class="reallife">🌡️ Ví dụ thực tế: Nhiệt độ −2°C nghĩa là 2°C dưới 0°C. Độ cao −45m nghĩa là ở độ sâu 45m dưới mực nước biển. Số dư nợ −200 000đ nghĩa là còn nợ 200 000 đồng.</p>`,
        illusFn: () => I.thermometer({ value: -5 }),
      },
      {
        heading: '2. So sánh số nguyên, giá trị tuyệt đối',
        html: `<p>Trên trục số, số nguyên bên trái luôn nhỏ hơn số nguyên bên phải. Mọi số nguyên âm đều nhỏ hơn 0 và nhỏ hơn mọi số nguyên dương.</p>
        <p>Giá trị tuyệt đối của số nguyên a, kí hiệu |a|, là khoảng cách từ điểm a đến điểm 0 trên trục số. Ví dụ |−7| = 7.</p>`,
        illusFn: () => I.numberLine({ min: -6, max: 6, points: [{ value: -4, color: '#7C5CFC' }, { value: 3, color: '#F2545B' }] }),
      },
      {
        heading: '3. Phép cộng, trừ và quy tắc dấu ngoặc',
        html: `<p>Cộng hai số nguyên cùng dấu: cộng hai giá trị tuyệt đối rồi giữ nguyên dấu. Cộng hai số nguyên khác dấu: lấy giá trị tuyệt đối lớn trừ giá trị tuyệt đối nhỏ, dấu là dấu của số có giá trị tuyệt đối lớn hơn.</p>
        <p>Phép trừ: a − b = a + (−b).</p>
        <p><b>Quy tắc dấu ngoặc:</b> khi bỏ ngoặc có dấu "−" đứng trước, phải đổi dấu tất cả các số hạng trong ngoặc.</p>`,
      },
      {
        heading: '4. Phép nhân, chia số nguyên',
        html: `<p>Nhân (chia) hai số nguyên <b>cùng dấu</b> được kết quả <b>dương</b>; nhân (chia) hai số nguyên <b>khác dấu</b> được kết quả <b>âm</b>.</p>`,
      },
    ],
  },

  // ============================================================= CHƯƠNG 4
  {
    id: 'c4', order: 4, book: 'Tập 1',
    title: 'Một số hình phẳng trong thực tiễn',
    emoji: '📐', color: '#F79A3E',
    hook: 'Sân bóng, viên gạch lát nền, biển báo giao thông, mái nhà… đều mang hình dạng các hình phẳng quen thuộc.',
    theory: [
      {
        heading: '1. Các hình phẳng thường gặp',
        html: `<p>Tam giác đều (3 cạnh, 3 góc bằng nhau), hình vuông (4 cạnh bằng nhau, 4 góc vuông), hình chữ nhật, hình thoi (4 cạnh bằng nhau), hình bình hành (2 cặp cạnh đối song song), hình thang cân.</p>`,
        illusFn: () => I.polygonShape({ type: 'trapezoid', color: '#F79A3E' }),
      },
      {
        heading: '2. Chu vi và diện tích',
        html: `<table class="theory-table">
          <tr><th>Hình</th><th>Chu vi</th><th>Diện tích</th></tr>
          <tr><td>Hình vuông cạnh a</td><td>4a</td><td>a²</td></tr>
          <tr><td>Hình chữ nhật a, b</td><td>2(a+b)</td><td>a × b</td></tr>
          <tr><td>Tam giác đều cạnh a</td><td>3a</td><td>—</td></tr>
          <tr><td>Hình thoi, 2 đường chéo d₁, d₂</td><td>4a</td><td>(d₁ × d₂) : 2</td></tr>
          <tr><td>Hình bình hành, đáy a, cao h</td><td>—</td><td>a × h</td></tr>
          <tr><td>Hình thang, đáy lớn a, đáy nhỏ b, cao h</td><td>—</td><td>(a+b) × h : 2</td></tr>
        </table>
        <p class="reallife">🏟️ Ví dụ thực tế: Sân bóng đá hình chữ nhật dài 105m, rộng 68m có diện tích 105 × 68 = 7 140 m² — đủ để tính lượng cỏ cần trồng!</p>`,
      },
    ],
  },

  // ============================================================= CHƯƠNG 5
  {
    id: 'c5', order: 5, book: 'Tập 1',
    title: 'Tính đối xứng của hình phẳng',
    emoji: '🦋', color: '#EF5DA8',
    hook: 'Cánh bướm, chiếc lá, chong chóng đồ chơi hay logo thương hiệu — vẻ đẹp của chúng đến từ tính đối xứng.',
    theory: [
      {
        heading: '1. Đối xứng trục',
        html: `<p>Một hình có <b>trục đối xứng</b> nếu có một đường thẳng chia hình đó thành hai phần mà khi "gấp" theo đường thẳng ấy, hai phần trùng khít lên nhau.</p>
        <p class="reallife">🦋 Ví dụ thực tế: Cánh bướm, chiếc lá, khuôn mặt người (gần đúng), chữ cái A, H, M, T, U, V… đều có trục đối xứng.</p>`,
        illusFn: () => I.symmetryAxis(),
      },
      {
        heading: '2. Đối xứng tâm',
        html: `<p>Một hình có <b>tâm đối xứng</b> O nếu khi quay hình đó 180° quanh O thì hình thu được chồng khít lên hình ban đầu.</p>
        <p class="reallife">🎡 Ví dụ thực tế: Chong chóng, chữ cái S, N, Z, hình bình hành, hình vuông, hình tròn đều có tâm đối xứng.</p>`,
        illusFn: () => I.symmetryCenter(),
      },
    ],
  },

  // ============================================================= CHƯƠNG 6
  {
    id: 'c6', order: 6, book: 'Tập 1',
    title: 'Một số yếu tố thống kê và xác suất',
    emoji: '📊', color: '#17B6C4',
    hook: 'Khảo sát môn thể thao yêu thích, dự đoán thời tiết, hay ước lượng khả năng trúng bia — thống kê và xác suất có mặt khắp nơi.',
    theory: [
      {
        heading: '1. Thu thập và biểu diễn dữ liệu',
        html: `<p>Dữ liệu thu thập được có thể trình bày bằng bảng số liệu, biểu đồ tranh hoặc <b>biểu đồ cột</b> để dễ dàng so sánh trực quan.</p>`,
        illusFn: () => I.barChart({ data: [{ label: 'Bóng đá', value: 8, color: '#17B6C4' }, { label: 'Cầu lông', value: 5, color: '#4F8EF7' }, { label: 'Bơi', value: 4, color: '#F79A3E' }, { label: 'Bóng bàn', value: 3, color: '#EF5DA8' }] }),
      },
      {
        heading: '2. Xác suất thực nghiệm',
        html: `<p>Thực hiện một phép thử n lần, nếu biến cố A xảy ra k lần thì tỉ số <b>k/n</b> gọi là <b>xác suất thực nghiệm</b> của biến cố A. Số lần thử càng lớn, xác suất thực nghiệm càng gần với xác suất lí thuyết.</p>
        <p class="reallife">🎯 Ví dụ thực tế: Một xạ thủ bắn 200 phát, trúng bia 170 phát. Xác suất thực nghiệm bắn trúng bia là 170/200 = 0,85.</p>`,
        illusFn: () => I.pieSpinner({ segments: [{ value: 3, color: '#17B6C4', label: 'Xanh' }, { value: 2, color: '#F2545B', label: 'Đỏ' }, { value: 1, color: '#F79A3E', label: 'Vàng' }] }),
      },
    ],
  },

  // ============================================================= CHƯƠNG 7
  {
    id: 'c7', order: 7, book: 'Tập 2',
    title: 'Phân số',
    emoji: '🍕', color: '#F2545B',
    hook: 'Chia bánh pizza cho cả nhà, đong 1/2 cốc bột làm bánh, hay 1/4 giờ nghỉ giải lao — phân số ở khắp căn bếp!',
    theory: [
      {
        heading: '1. Khái niệm và tính chất cơ bản',
        html: `<p>Phân số <b>a/b</b> (b ≠ 0) gồm tử số a và mẫu số b. Hai phân số bằng nhau nếu a×d = b×c. Nhân hoặc chia cả tử và mẫu với cùng một số khác 0 ta được phân số bằng phân số đã cho (dùng để rút gọn, quy đồng).</p>`,
        illusFn: () => I.fractionCircle({ n: 3, d: 8, color: '#F2545B' }),
      },
      {
        heading: '2. So sánh và các phép tính với phân số',
        html: `<p>Muốn so sánh hai phân số, ta quy đồng mẫu số rồi so sánh tử số. Cộng, trừ hai phân số cùng mẫu: giữ nguyên mẫu, cộng/trừ tử. Khác mẫu: quy đồng trước. Nhân hai phân số: tử nhân tử, mẫu nhân mẫu. Chia phân số: nhân với phân số nghịch đảo.</p>
        <p class="reallife">🥧 Ví dụ thực tế: Một chiếc bánh pizza cắt làm 8 phần bằng nhau, Nam ăn 3 phần tức là ăn 3/8 chiếc bánh.</p>`,
      },
    ],
  },

  // ============================================================= CHƯƠNG 8
  {
    id: 'c8', order: 8, book: 'Tập 2',
    title: 'Số thập phân',
    emoji: '💰', color: '#A56CF2',
    hook: 'Giá tiền ngoài chợ, cân nặng trên bàn cân, hay phần trăm giảm giá dịp lễ — số thập phân gắn liền với chuyện tiền nong hàng ngày.',
    theory: [
      {
        heading: '1. Số thập phân và các phép tính',
        html: `<p>Số thập phân gồm phần nguyên và phần thập phân, ngăn cách bởi dấu phẩy. Khi cộng, trừ số thập phân, đặt tính sao cho dấu phẩy thẳng cột. Khi nhân, chia, thực hiện như số tự nhiên rồi đặt dấu phẩy theo quy tắc.</p>`,
        illusFn: () => I.percentGrid({ percent: 65, color: '#A56CF2' }),
      },
      {
        heading: '2. Tỉ số phần trăm',
        html: `<p>Tỉ số phần trăm của a và b là (a : b) × 100%. Đây là công cụ dùng rất nhiều trong thực tế: tính giảm giá, lãi suất ngân hàng, tỉ lệ phần trăm điểm số...</p>
        <p class="reallife">🏷️ Ví dụ thực tế: Một chiếc áo giá 250 000đ được giảm giá 15%. Số tiền được giảm là 250 000 × 15% = 37 500đ, giá sau khi giảm là 212 500đ.</p>`,
      },
    ],
  },

  // ============================================================= CHƯƠNG 9
  {
    id: 'c9', order: 9, book: 'Tập 2',
    title: 'Hai đường thẳng song song. Góc',
    emoji: '📏', color: '#E0A106',
    hook: 'Kim đồng hồ tạo thành góc mỗi phút trôi qua, hai thanh ray xe lửa chạy song song mãi không giao nhau.',
    theory: [
      {
        heading: '1. Góc và số đo góc',
        html: `<p>Góc được tạo bởi hai tia chung gốc. Đơn vị đo góc là <b>độ (°)</b>. Phân loại: góc nhọn (0°–90°), góc vuông (90°), góc tù (90°–180°), góc bẹt (180°).</p>
        <p class="reallife">🕒 Ví dụ thực tế: Lúc 3 giờ đúng, kim giờ và kim phút tạo thành một góc vuông 90°.</p>`,
        illusFn: () => I.clockFace({ hour: 3, minute: 0 }),
      },
      {
        heading: '2. Hai đường thẳng song song và tia phân giác',
        html: `<p>Hai đường thẳng song song là hai đường thẳng không có điểm chung. Tia phân giác của một góc là tia nằm giữa hai cạnh của góc và chia góc đó thành hai góc bằng nhau.</p>
        <p class="reallife">🛤️ Ví dụ thực tế: Hai thanh ray xe lửa, hai cạnh đối của một khung cửa sổ hình chữ nhật là hình ảnh của hai đường thẳng song song.</p>`,
        illusFn: () => I.parallelLines(),
      },
    ],
  },
];

// Gắn illus (chuỗi SVG) vào từng theory block dựa trên illusFn khai báo ở trên.
CHAPTERS.forEach(ch => ch.theory.forEach(t => { if (t.illusFn) { t.illus = t.illusFn(); } }));

function mcq(id, chapter, difficulty, q, options, answer, explain, illus) {
  return { id, chapter, difficulty, type: 'mcq', q, options, answer, explain, illus };
}

export const QUESTIONS = [
  // ================= CHƯƠNG 1 =================
  mcq('c1-e1', 'c1', 'easy', 'Tập hợp các số tự nhiên lớn hơn 2 và nhỏ hơn 6 là:', ['{2;3;4;5;6}', '{3;4;5}', '{2;3;4;5}', '{3;4;5;6}'], 1, 'x thỏa 2 < x < 6 nên x ∈ {3; 4; 5} (không lấy 2 và 6 vì dấu “<” là không tính hai đầu mút).'),
  mcq('c1-e2', 'c1', 'easy', 'Tính giá trị biểu thức: 25 + 15 × 2', ['80', '55', '90', '40'], 1, 'Nhân trước, cộng sau: 15 × 2 = 30, rồi 25 + 30 = 55.'),
  mcq('c1-e3', 'c1', 'easy', 'Số La Mã của số 14 là:', ['XIIII', 'XIV', 'XVI', 'IXV'], 1, '14 = 10 + 4 = X + IV = XIV.'),
  mcq('c1-e4', 'c1', 'easy', 'Kết quả của 5² là:', ['10', '25', '52', '15'], 1, '5² = 5 × 5 = 25.'),
  mcq('c1-m1', 'c1', 'medium', 'Tính giá trị biểu thức: 3² × 4 − 20 : 5', ['32', '28', '40', '16'], 0, '3² × 4 = 9 × 4 = 36; 20 : 5 = 4; 36 − 4 = 32.'),
  mcq('c1-m2', 'c1', 'medium', 'Lan mua 4 quyển vở giá 7 000đ/quyển và 1 hộp bút giá 25 000đ, đưa cô bán hàng 100 000đ. Số tiền được trả lại là:', ['47 000đ', '53 000đ', '43 000đ', '75 000đ'], 0, 'Tiền mua: 4×7 000 + 25 000 = 28 000 + 25 000 = 53 000đ. Tiền trả lại: 100 000 − 53 000 = 47 000đ.'),
  mcq('c1-m3', 'c1', 'medium', 'Viết tập hợp B các số tự nhiên x sao cho 10 < x ≤ 15 bằng cách liệt kê phần tử:', ['{10;11;12;13;14;15}', '{11;12;13;14;15}', '{11;12;13;14}', '{10;11;12;13;14}'], 1, 'x > 10 (không lấy 10) và x ≤ 15 (lấy 15) nên B = {11; 12; 13; 14; 15}.'),
  mcq('c1-m4', 'c1', 'medium', 'Viết kết quả phép tính 2³ × 2⁴ dưới dạng một lũy thừa:', ['2⁷', '2¹²', '4⁷', '2¹'], 0, 'Nhân hai lũy thừa cùng cơ số: cộng số mũ → 2³⁺⁴ = 2⁷ = 128.'),
  mcq('c1-h1', 'c1', 'hard', 'Tính: 100 − [(25 − 5) × 2 + 3²]', ['51', '49', '60', '40'], 0, 'Trong [ ]: (25−5)×2 + 3² = 20×2 + 9 = 40 + 9 = 49. Rồi 100 − 49 = 51.'),
  mcq('c1-h2', 'c1', 'hard', 'Một khối lập phương có cạnh 4cm. Thể tích khối lập phương đó (V = cạnh³) là:', ['16 cm³', '64 cm³', '12 cm³', '48 cm³'], 1, 'V = 4³ = 4×4×4 = 64 cm³.'),
  mcq('c1-h3', 'c1', 'hard', 'Tìm số tự nhiên x, biết 2ˣ = 32.', ['x = 4', 'x = 5', 'x = 6', 'x = 16'], 1, '2⁵ = 32 nên x = 5.'),
  mcq('c1-g1', 'c1', 'hsg', 'So sánh 2³⁰⁰ và 3²⁰⁰.', ['2³⁰⁰ < 3²⁰⁰', '2³⁰⁰ > 3²⁰⁰', '2³⁰⁰ = 3²⁰⁰', 'Không so sánh được'], 0, 'Đưa về cùng số mũ 100: 2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰; 3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰. Vì 8 < 9 nên 8¹⁰⁰ < 9¹⁰⁰, tức 2³⁰⁰ < 3²⁰⁰.'),
  mcq('c1-g2', 'c1', 'hsg', 'Tính tổng S = 2⁰ + 2¹ + 2² + … + 2¹⁰.', ['2047', '1024', '2048', '2046'], 0, 'Với tổng dạng này, S = 2¹¹ − 1 = 2048 − 1 = 2047 (nhân S với 2 rồi trừ S ta khử được các số hạng giống nhau).'),
  mcq('c1-g3', 'c1', 'hsg', 'Chữ số tận cùng của 7²⁰²³ là:', ['1', '7', '9', '3'], 3, 'Chữ số tận cùng của 7ⁿ lặp lại theo chu kì 4: 7,9,3,1. Vì 2023 chia 4 dư 3 nên chữ số tận cùng là số thứ 3 trong chu kì, tức là 3.'),

  // ================= CHƯƠNG 2 =================
  mcq('c2-e1', 'c2', 'easy', 'Số nào sau đây chia hết cho cả 2 và 5?', ['120', '123', '125', '122'], 0, 'Số chia hết cho cả 2 và 5 phải có chữ số tận cùng là 0. Chỉ có 120 thỏa mãn.'),
  mcq('c2-e2', 'c2', 'easy', 'Số 471 chia hết cho số nào trong các số sau?', ['2', '3', '5', '9'], 1, 'Tổng các chữ số: 4+7+1 = 12, chia hết cho 3 (nhưng không chia hết cho 9) nên 471 chia hết cho 3.'),
  mcq('c2-e3', 'c2', 'easy', 'Số nào sau đây là số nguyên tố?', ['21', '29', '33', '51'], 1, '29 chỉ có hai ước là 1 và 29 nên là số nguyên tố. Các số còn lại đều là hợp số (21=3×7, 33=3×11, 51=3×17).'),
  mcq('c2-e4', 'c2', 'easy', 'ƯCLN(12, 18) bằng:', ['2', '4', '6', '36'], 2, '12 = 2²×3; 18 = 2×3². ƯCLN = 2×3 = 6.'),
  mcq('c2-m1', 'c2', 'medium', 'Phân tích số 60 ra thừa số nguyên tố:', ['2² × 3 × 5', '2 × 3 × 10', '2² × 15', '4 × 3 × 5'], 0, '60 = 2×30 = 2×2×15 = 2²×3×5.'),
  mcq('c2-m2', 'c2', 'medium', 'BCNN(4, 6) bằng:', ['24', '12', '2', '18'], 1, '4 = 2²; 6 = 2×3. BCNN = 2²×3 = 12.'),
  mcq('c2-m3', 'c2', 'medium', 'Một lớp có 32 học sinh nam và 24 học sinh nữ, muốn chia thành các tổ có số nam, số nữ đều nhau. Số tổ nhiều nhất có thể chia là:', ['4 tổ', '6 tổ', '8 tổ', '12 tổ'], 2, 'Số tổ nhiều nhất chính là ƯCLN(32, 24) = 8 tổ.'),
  mcq('c2-m4', 'c2', 'medium', 'Có bao nhiêu số tự nhiên khác 0, nhỏ hơn 50 vừa chia hết cho 3 vừa chia hết cho 5?', ['1 số', '2 số', '3 số', '4 số'], 2, 'Chia hết cho cả 3 và 5 nghĩa là chia hết cho 15. Các số đó là 15, 30, 45 → có 3 số.'),
  mcq('c2-h1', 'c2', 'hard', 'An cứ 4 ngày trực nhật một lần, Bình cứ 6 ngày trực nhật một lần. Hôm nay cả hai cùng trực. Hỏi ít nhất sau bao nhiêu ngày hai bạn lại cùng trực?', ['10 ngày', '12 ngày', '24 ngày', '8 ngày'], 1, 'Số ngày cần tìm là BCNN(4, 6) = 12 ngày.'),
  mcq('c2-h2', 'c2', 'hard', 'ƯCLN và BCNN của 36 và 60 lần lượt là:', ['12 và 180', '6 và 360', '12 và 360', '18 và 180'], 0, '36 = 2²×3²; 60 = 2²×3×5. ƯCLN = 2²×3 = 12. BCNN = 2²×3²×5 = 180.'),
  mcq('c2-h3', 'c2', 'hard', 'Một số tự nhiên chia hết cho 9 khi:', ['Chữ số tận cùng chia hết cho 9', 'Tổng các chữ số chia hết cho 9', 'Số đó là số lẻ', 'Tổng các chữ số chia hết cho 3'], 1, 'Dấu hiệu chia hết cho 9: tổng các chữ số của số đó chia hết cho 9.'),
  mcq('c2-g1', 'c2', 'hsg', 'Số tự nhiên nhỏ nhất có 3 chữ số vừa chia hết cho 4, vừa chia hết cho 5 nhưng không chia hết cho 3 là:', ['100', '120', '110', '105'], 0, 'Chia hết cho cả 4 và 5 nghĩa là chia hết cho 20. Số có 3 chữ số nhỏ nhất chia hết cho 20 là 100; tổng chữ số 1+0+0=1 không chia hết cho 3 → thỏa mãn.'),
  mcq('c2-g2', 'c2', 'hsg', 'Tìm số tự nhiên x nhỏ nhất lớn hơn 20, biết ƯCLN(x, 18) = 6.', ['24', '21', '30', '36'], 0, 'x = 6k với k không chia hết cho 3 (để ƯCLN đúng bằng 6). x > 20 → k ≥ 4, chọn k = 4 (không chia hết 3) → x = 24. Kiểm tra: ƯCLN(24,18) = 6 ✓.'),
  mcq('c2-g3', 'c2', 'hsg', 'Tổng nhỏ nhất của 3 số nguyên tố liên tiếp mà tổng đó cũng là một số nguyên tố:', ['2+3+5 = 10', '3+5+7 = 15', '5+7+11 = 23', '7+11+13 = 31'], 2, '2+3+5=10 (không nguyên tố), 3+5+7=15 (không nguyên tố), 5+7+11=23 là số nguyên tố → đây là bộ ba nhỏ nhất thỏa mãn.'),

  // ================= CHƯƠNG 3 =================
  mcq('c3-e1', 'c3', 'easy', 'Nhiệt độ tại đỉnh núi là −8°C. Ở chân núi nhiệt độ cao hơn 12°C. Nhiệt độ ở chân núi là:', ['−20°C', '4°C', '20°C', '−4°C'], 1, '−8 + 12 = 4. Vậy nhiệt độ ở chân núi là 4°C.', () => I.thermometer({ value: 4 })),
  mcq('c3-e2', 'c3', 'easy', 'So sánh −7 và −3:', ['−7 > −3', '−7 < −3', '−7 = −3', 'Không so sánh được'], 1, 'Trên trục số, −7 nằm bên trái −3 nên −7 < −3.', () => I.numberLine({ min: -8, max: 0, points: [{ value: -7, color: '#7C5CFC' }, { value: -3, color: '#F2545B' }] })),
  mcq('c3-e3', 'c3', 'easy', '|−15| bằng:', ['−15', '15', '0', '1/15'], 1, 'Giá trị tuyệt đối của một số nguyên luôn không âm: |−15| = 15.'),
  mcq('c3-e4', 'c3', 'easy', 'Tính (−8) + (−5):', ['−13', '13', '−3', '3'], 0, 'Cộng hai số nguyên âm: cộng hai giá trị tuyệt đối rồi đặt dấu “−”: −(8+5) = −13.'),
  mcq('c3-m1', 'c3', 'medium', 'Tính 12 − 20:', ['8', '−8', '32', '−32'], 1, '12 − 20 = 12 + (−20) = −8.'),
  mcq('c3-m2', 'c3', 'medium', 'Tính (−3) × 7:', ['21', '−21', '10', '−10'], 1, 'Nhân hai số khác dấu được kết quả âm: (−3) × 7 = −21.'),
  mcq('c3-m3', 'c3', 'medium', 'Bỏ dấu ngoặc rồi tính: 15 − (8 − 20)', ['27', '3', '−27', '−3'], 0, '15 − (8 − 20) = 15 − 8 + 20 = 27.'),
  mcq('c3-m4', 'c3', 'medium', 'Một tàu ngầm đang ở độ sâu 45m so với mực nước biển. Tàu nổi lên thêm 20m. Vị trí hiện tại của tàu là:', ['Sâu 65m', 'Sâu 25m', 'Cao 25m so với mặt biển', 'Sâu 20m'], 1, 'Biểu diễn: (−45) + 20 = −25, tức tàu đang ở độ sâu 25m so với mực nước biển.'),
  mcq('c3-h1', 'c3', 'hard', 'Tính: (−25) × (−4) : (−10)', ['10', '−10', '100', '−100'], 1, '(−25) × (−4) = 100 (cùng dấu, kết quả dương). 100 : (−10) = −10 (khác dấu, kết quả âm).'),
  mcq('c3-h2', 'c3', 'hard', 'Tìm x, biết x + (−15) = 7.', ['x = −8', 'x = 8', 'x = 22', 'x = −22'], 2, 'x = 7 − (−15) = 7 + 15 = 22.'),
  mcq('c3-h3', 'c3', 'hard', 'Tính tổng: (−3) + (−2) + (−1) + 0 + 1 + 2 + 3 + 4 + 5', ['9', '0', '5', '15'], 0, 'Các cặp (−3,3),(−2,2),(−1,1) triệt tiêu nhau (=0), còn lại 0 + 4 + 5 = 9.'),
  mcq('c3-g1', 'c3', 'hsg', 'Tính tổng: S = 1 − 2 + 3 − 4 + … + 99 − 100.', ['−50', '50', '0', '−100'], 0, 'Nhóm thành 50 cặp: (1−2)+(3−4)+…+(99−100), mỗi cặp bằng −1, có 50 cặp nên S = 50×(−1) = −50.'),
  mcq('c3-g2', 'c3', 'hsg', 'Tìm số nguyên x, biết |x − 3| = 5.', ['x = 8', 'x = 8 hoặc x = −2', 'x = −2', 'x = 2 hoặc x = 8'], 1, '|x−3| = 5 nghĩa là x − 3 = 5 hoặc x − 3 = −5, suy ra x = 8 hoặc x = −2.'),
  mcq('c3-g3', 'c3', 'hsg', 'Tính nhanh: (−1) + 2 + (−3) + 4 + … + (−99) + 100', ['50', '−50', '100', '0'], 0, 'Ghép cặp (−1+2)=1, (−3+4)=1,…,(−99+100)=1, có 50 cặp, tổng = 50.'),

  // ================= CHƯƠNG 4 =================
  mcq('c4-e1', 'c4', 'easy', 'Một sân hình chữ nhật dài 30m, rộng 20m. Chu vi của sân là:', ['50m', '100m', '600m', '60m'], 1, 'Chu vi hình chữ nhật = 2×(dài+rộng) = 2×(30+20) = 100m.'),
  mcq('c4-e2', 'c4', 'easy', 'Hình vuông có cạnh 5cm. Diện tích hình vuông đó là:', ['20 cm²', '25 cm²', '10 cm²', '15 cm²'], 1, 'Diện tích hình vuông = cạnh² = 5² = 25 cm².'),
  mcq('c4-e3', 'c4', 'easy', 'Tam giác đều có cạnh 6cm. Chu vi tam giác đó là:', ['12cm', '18cm', '36cm', '24cm'], 1, 'Chu vi tam giác đều = 3 × cạnh = 3 × 6 = 18cm.'),
  mcq('c4-e4', 'c4', 'easy', 'Hình có 4 cạnh bằng nhau và 4 góc vuông được gọi là:', ['Hình thoi', 'Hình chữ nhật', 'Hình vuông', 'Hình bình hành'], 2, 'Hình vuông là hình có 4 cạnh bằng nhau và 4 góc đều là góc vuông.'),
  mcq('c4-m1', 'c4', 'medium', 'Mảnh vườn hình chữ nhật dài 15m, rộng 8m. Diện tích mảnh vườn là:', ['46 m²', '23 m²', '120 m²', '110 m²'], 2, 'Diện tích = dài × rộng = 15 × 8 = 120 m².'),
  mcq('c4-m2', 'c4', 'medium', 'Hình thoi có hai đường chéo dài 8cm và 6cm. Diện tích hình thoi là:', ['48 cm²', '24 cm²', '14 cm²', '28 cm²'], 1, 'Diện tích hình thoi = (d₁×d₂):2 = (8×6):2 = 48:2 = 24 cm².'),
  mcq('c4-m3', 'c4', 'medium', 'Hình bình hành có đáy 12cm, chiều cao 5cm. Diện tích là:', ['17 cm²', '34 cm²', '60 cm²', '120 cm²'], 2, 'Diện tích hình bình hành = đáy × chiều cao = 12 × 5 = 60 cm².'),
  mcq('c4-m4', 'c4', 'medium', 'Một khung ảnh hình vuông có chu vi 48cm. Diện tích khung ảnh đó là:', ['144 cm²', '96 cm²', '576 cm²', '12 cm²'], 0, 'Cạnh = 48:4 = 12cm. Diện tích = 12² = 144 cm².'),
  mcq('c4-h1', 'c4', 'hard', 'Hình thang cân có đáy lớn 10cm, đáy nhỏ 6cm, chiều cao 4cm. Diện tích hình thang là:', ['32 cm²', '64 cm²', '40 cm²', '16 cm²'], 0, 'Diện tích = (đáy lớn+đáy nhỏ)×cao : 2 = (10+6)×4:2 = 64:2 = 32 cm².'),
  mcq('c4-h2', 'c4', 'hard', 'Một sân bóng hình chữ nhật có chu vi 340m, chiều dài hơn chiều rộng 30m. Diện tích sân bóng là:', ['7000 m²', '6800 m²', '5600 m²', '17000 m²'], 0, 'Nửa chu vi = 170 = dài+rộng; dài−rộng=30 → dài=100m, rộng=70m. Diện tích = 100×70 = 7000 m².'),
  mcq('c4-h3', 'c4', 'hard', 'Người ta lát gạch hình vuông cạnh 50cm cho sân hình chữ nhật 10m × 6m. Cần bao nhiêu viên gạch?', ['120 viên', '240 viên', '600 viên', '2400 viên'], 1, 'Diện tích sân = 10×6 = 60m² = 600 000 cm². Một viên gạch = 50×50 = 2500 cm². Số viên = 600 000 : 2500 = 240 viên.'),
  mcq('c4-g1', 'c4', 'hsg', 'Mảnh đất hình thang cân có đáy lớn gấp đôi đáy nhỏ, chiều cao 8m, diện tích 96m². Độ dài hai đáy là:', ['Đáy nhỏ 8m, đáy lớn 16m', 'Đáy nhỏ 6m, đáy lớn 12m', 'Đáy nhỏ 10m, đáy lớn 20m', 'Đáy nhỏ 4m, đáy lớn 8m'], 0, 'Gọi đáy nhỏ là a, đáy lớn 2a: (a+2a)×8:2=96 → 3a×4=96 → a=8. Đáy nhỏ 8m, đáy lớn 16m.'),
  mcq('c4-g2', 'c4', 'hsg', 'Một hình vuông có diện tích bằng diện tích hình chữ nhật 9cm × 16cm. Cạnh hình vuông đó là:', ['10cm', '12cm', '13cm', '14cm'], 1, 'Diện tích hình chữ nhật = 9×16 = 144 cm². Cạnh hình vuông = căn bậc hai của 144 = 12cm.'),
  mcq('c4-g3', 'c4', 'hsg', 'Hình bình hành có diện tích 84cm², chiều cao 7cm. Nếu tăng đáy thêm 2cm (giữ nguyên chiều cao) thì diện tích mới là:', ['86 cm²', '91 cm²', '98 cm²', '112 cm²'], 2, 'Đáy cũ = 84:7 = 12cm. Đáy mới = 14cm. Diện tích mới = 14×7 = 98 cm².'),

  // ================= CHƯƠNG 5 =================
  mcq('c5-e1', 'c5', 'easy', 'Hình nào sau đây có trục đối xứng?', ['Hình vuông', 'Hình bình hành (không đặc biệt)', 'Hình thang thường', 'Tứ giác bất kì'], 0, 'Hình vuông có 4 trục đối xứng (2 đường chéo và 2 đường trung trực của cạnh). Hình bình hành thường không có trục đối xứng.', () => I.polygonShape({ type: 'square', color: '#EF5DA8' })),
  mcq('c5-e2', 'c5', 'easy', 'Chữ cái nào sau đây có trục đối xứng dọc?', ['A', 'F', 'G', 'N'], 0, 'Chữ A có một trục đối xứng thẳng đứng chia chữ thành hai nửa đối xứng.'),
  mcq('c5-e3', 'c5', 'easy', 'Tam giác đều có bao nhiêu trục đối xứng?', ['1', '2', '3', 'Vô số'], 2, 'Tam giác đều có 3 trục đối xứng, mỗi trục đi qua một đỉnh và trung điểm cạnh đối diện.'),
  mcq('c5-e4', 'c5', 'easy', 'Hình tròn có tâm đối xứng không?', ['Có, tâm chính là tâm hình tròn', 'Không có', 'Chỉ có trục đối xứng', 'Tùy bán kính'], 0, 'Hình tròn có tâm đối xứng chính là tâm của nó (và có vô số trục đối xứng đi qua tâm).'),
  mcq('c5-m1', 'c5', 'medium', 'Chữ cái nào sau đây có tâm đối xứng?', ['S', 'A', 'B', 'C'], 0, 'Chữ S khi quay 180° quanh tâm của nó sẽ trùng với chính nó, nên có tâm đối xứng.'),
  mcq('c5-m2', 'c5', 'medium', 'Hình vuông có bao nhiêu trục đối xứng?', ['2', '3', '4', '8'], 2, 'Hình vuông có 4 trục đối xứng: 2 đường chéo và 2 đường nối trung điểm các cặp cạnh đối.'),
  mcq('c5-m3', 'c5', 'medium', 'Hình bình hành (không đặc biệt) có tâm đối xứng không?', ['Có', 'Không', 'Chỉ khi là hình vuông', 'Không xác định'], 0, 'Giao điểm hai đường chéo của hình bình hành chính là tâm đối xứng của nó.'),
  mcq('c5-m4', 'c5', 'medium', 'Lục giác đều có bao nhiêu trục đối xứng?', ['3', '4', '6', '8'], 2, 'Lục giác đều có 6 trục đối xứng (3 trục qua các cặp đỉnh đối diện, 3 trục qua trung điểm các cặp cạnh đối diện).'),
  mcq('c5-h1', 'c5', 'hard', 'Trong các hình: hình chữ nhật, hình thoi, hình thang cân, hình bình hành — hình nào KHÔNG có tâm đối xứng?', ['Hình chữ nhật', 'Hình thoi', 'Hình thang cân', 'Hình bình hành'], 2, 'Hình thang cân chỉ có trục đối xứng (đường nối trung điểm hai đáy), không có tâm đối xứng. Ba hình còn lại đều có tâm đối xứng là giao điểm hai đường chéo.'),
  mcq('c5-h2', 'c5', 'hard', 'Biển báo giao thông hình tam giác đều có:', ['3 trục đối xứng và có tâm đối xứng', '3 trục đối xứng, không có tâm đối xứng', '1 trục đối xứng, có tâm đối xứng', 'Không có trục và tâm đối xứng'], 1, 'Tam giác đều có 3 trục đối xứng nhưng quay 180° quanh trọng tâm không trùng khít với chính nó, nên không có tâm đối xứng.'),
  mcq('c5-h3', 'c5', 'hard', 'Trong các chữ cái H, O, S, F, chữ nào vừa có trục đối xứng vừa có tâm đối xứng?', ['S và F', 'H và O', 'Chỉ có F', 'Chỉ có S'], 1, 'H và O đều có trục đối xứng ngang, dọc và đồng thời có tâm đối xứng. S chỉ có tâm đối xứng (không trục), F không có cả hai.'),
  mcq('c5-g1', 'c5', 'hsg', 'Một hình có đúng 2 trục đối xứng vuông góc với nhau thì hình đó chắc chắn có tâm đối xứng tại giao điểm hai trục. Nhận định này:', ['Đúng', 'Sai', 'Chỉ đúng với hình vuông', 'Không thể kết luận'], 0, 'Đây là một tính chất hình học: khi có 2 trục đối xứng vuông góc, phép đối xứng qua trục 1 rồi qua trục 2 tương đương phép quay 180° quanh giao điểm, nên giao điểm đó là tâm đối xứng.'),
  mcq('c5-g2', 'c5', 'hsg', 'Chữ cái in hoa nào vừa có trục đối xứng ngang, vừa có trục đối xứng dọc, đồng thời có tâm đối xứng?', ['N', 'H', 'S', 'F'], 1, 'Chữ H có cả trục đối xứng ngang, trục đối xứng dọc, và tâm đối xứng tại giao điểm hai trục. N chỉ có tâm đối xứng, S chỉ có tâm, F không có gì.'),
  mcq('c5-g3', 'c5', 'hsg', 'Lấy một tam giác đều rồi quay quanh tâm liên tiếp các góc 120° để tạo hoa văn. Hình tạo thành có tâm đối xứng theo nghĩa "quay 180° trùng khít" không?', ['Có', 'Không', 'Chỉ khi tam giác vuông', 'Không xác định'], 1, 'Đối xứng tâm yêu cầu quay đúng 180° thì trùng khít. Hình được tạo bởi các phép quay 120° có tính đối xứng quay bậc 3, nhưng quay 180° thì không trùng với hình ban đầu, nên không có tâm đối xứng theo định nghĩa đã học.'),

  // ================= CHƯƠNG 6 =================
  mcq('c6-e1', 'c6', 'easy', 'Khảo sát môn thể thao yêu thích của 20 bạn: Bóng đá 8, Cầu lông 5, Bơi 4, Bóng bàn 3. Môn được yêu thích nhất là:', ['Cầu lông', 'Bóng đá', 'Bơi', 'Bóng bàn'], 1, 'Bóng đá có số lượt bình chọn cao nhất (8 bạn) nên là môn được yêu thích nhất.'),
  mcq('c6-e2', 'c6', 'easy', 'Tung một đồng xu 50 lần, thấy có 28 lần xuất hiện mặt Sấp. Xác suất thực nghiệm xuất hiện mặt Sấp là:', ['0,5', '0,56', '0,28', '28'], 1, 'Xác suất thực nghiệm = số lần xuất hiện : tổng số lần thử = 28 : 50 = 0,56.'),
  mcq('c6-e3', 'c6', 'easy', 'Gieo một con xúc xắc 30 lần, mặt 6 chấm xuất hiện 5 lần. Xác suất thực nghiệm xuất hiện mặt 6 chấm là:', ['1/6', '1/5', '1/30', '5/6'], 0, 'Xác suất thực nghiệm = số lần xuất hiện : tổng số lần thử = 5 : 30 = 1/6.'),
  mcq('c6-e4', 'c6', 'easy', 'Biểu đồ cột thường được dùng để:', ['Viết công thức toán học', 'So sánh trực quan số liệu giữa các đối tượng', 'Tính chu vi hình học', 'Giải phương trình'], 1, 'Biểu đồ cột giúp so sánh trực quan số liệu giữa nhiều đối tượng khác nhau bằng chiều cao các cột.'),
  mcq('c6-m1', 'c6', 'medium', 'Trong khảo sát 20 bạn, có 8 bạn thích bóng đá. Tỉ lệ phần trăm bạn thích bóng đá là:', ['8%', '40%', '20%', '80%'], 1, 'Tỉ lệ = 8/20 × 100% = 40%.'),
  mcq('c6-m2', 'c6', 'medium', 'Gieo một con xúc xắc 100 lần, số lần xuất hiện mặt chẵn (2,4,6) là 54 lần. Xác suất thực nghiệm xuất hiện mặt chẵn là:', ['0,46', '0,54', '0,5', '0,6'], 1, 'Xác suất thực nghiệm = 54 : 100 = 0,54.'),
  mcq('c6-m3', 'c6', 'medium', 'Một hộp có bi xanh và đỏ. Lấy ngẫu nhiên có hoàn lại 40 lần thấy 24 lần bi đỏ. Xác suất thực nghiệm lấy được bi xanh là:', ['0,6', '0,4', '0,24', '0,16'], 1, 'Số lần lấy được bi xanh = 40 − 24 = 16. Xác suất = 16 : 40 = 0,4.'),
  mcq('c6-m4', 'c6', 'medium', 'Bốn lớp 6A, 6B, 6C, 6D có số học sinh giỏi lần lượt là 10, 8, 12, 6. Trên biểu đồ cột, lớp có cột cao nhất là:', ['6A', '6B', '6C', '6D'], 2, 'Lớp 6C có 12 học sinh giỏi, nhiều nhất trong 4 lớp, nên có cột cao nhất.', () => I.barChart({ data: [{ label: '6A', value: 10, color: '#4F8EF7' }, { label: '6B', value: 8, color: '#22B27C' }, { label: '6C', value: 12, color: '#17B6C4' }, { label: '6D', value: 6, color: '#F79A3E' }] })),
  mcq('c6-h1', 'c6', 'hard', 'Bảng điểm kiểm tra của 30 học sinh: điểm 10 có 3 bạn, điểm 9 có 5 bạn, điểm 8 có 10 bạn, điểm 7 có 8 bạn, điểm 6 có 4 bạn. Tỉ lệ % học sinh đạt điểm giỏi (từ 8 trở lên) là:', ['50%', '60%', '18%', '40%'], 1, 'Số học sinh giỏi = 3+5+10 = 18. Tỉ lệ = 18/30 × 100% = 60%.'),
  mcq('c6-h2', 'c6', 'hard', 'Một xạ thủ bắn 200 lần, trúng bia 170 lần. Xác suất thực nghiệm bắn trúng bia (làm tròn 2 chữ số thập phân) là:', ['0,17', '0,85', '0,80', '1,18'], 1, 'Xác suất thực nghiệm = 170 : 200 = 0,85.'),
  mcq('c6-h3', 'c6', 'hard', 'Gieo đồng xu 2 lần liên tiếp, lặp lại 80 lượt, có 18 lượt cả 2 lần đều Ngửa. Xác suất thực nghiệm của biến cố "cả hai lần đều Ngửa" là:', ['0,18', '0,225', '0,25', '0,9'], 1, 'Xác suất thực nghiệm = 18 : 80 = 0,225.'),
  mcq('c6-g1', 'c6', 'hsg', 'Xác suất thực nghiệm của một biến cố sau n lần thử càng gần xác suất lí thuyết khi:', ['n càng nhỏ', 'n càng lớn', 'n là số chẵn', 'Không phụ thuộc vào n'], 1, 'Số lần thử n càng lớn thì xác suất thực nghiệm càng ổn định và gần với xác suất lí thuyết.'),
  mcq('c6-g2', 'c6', 'hsg', 'Gieo một con xúc xắc n lần, mặt 1 chấm xuất hiện 24 lần với tần suất thực nghiệm là 0,2. Giá trị n là:', ['100', '120', '96', '150'], 1, 'n = số lần xuất hiện : tần suất = 24 : 0,2 = 120.'),
  mcq('c6-g3', 'c6', 'hsg', 'Một hộp có nhiều bi 3 màu, tổng cộng 40 viên. Qua 80 lần lấy có hoàn lại: đỏ 32 lần, xanh 28 lần, còn lại vàng. Ước lượng số bi vàng có trong hộp:', ['10 viên', '20 viên', '8 viên', '15 viên'], 0, 'Số lần lấy vàng = 80−32−28 = 20 lần, tần suất = 20/80 = 0,25. Ước lượng số bi vàng ≈ 0,25 × 40 = 10 viên.'),

  // ================= CHƯƠNG 7 =================
  mcq('c7-e1', 'c7', 'easy', 'Rút gọn phân số 8/12 về phân số tối giản:', ['4/6', '2/3', '1/2', '8/12'], 1, 'ƯCLN(8,12)=4. 8:4=2, 12:4=3, vậy phân số tối giản là 2/3.', () => I.fractionBar({ n: 2, d: 3, color: '#F2545B' })),
  mcq('c7-e2', 'c7', 'easy', 'So sánh 3/4 và 5/6, phân số nào lớn hơn?', ['3/4', '5/6', 'Bằng nhau', 'Không so sánh được'], 1, 'Quy đồng: 3/4=9/12; 5/6=10/12. Vì 10/12 > 9/12 nên 5/6 lớn hơn.'),
  mcq('c7-e3', 'c7', 'easy', 'Tính 1/3 + 1/6:', ['2/9', '1/2', '2/6', '1/9'], 1, 'Quy đồng mẫu 6: 1/3=2/6. 2/6+1/6=3/6=1/2.'),
  mcq('c7-e4', 'c7', 'easy', 'Một chiếc bánh pizza chia làm 8 phần bằng nhau, Nam ăn 3 phần. Nam đã ăn số phần bánh là:', ['3/8', '8/3', '3/5', '5/8'], 0, 'Ăn 3 trong 8 phần bằng nhau, viết dưới dạng phân số là 3/8.', () => I.fractionCircle({ n: 3, d: 8, color: '#F79A3E' })),
  mcq('c7-m1', 'c7', 'medium', 'Tính 2/5 × 5/6:', ['10/30', '1/3', '2/6', '7/11'], 1, '2/5 × 5/6 = 10/30 = 1/3 (rút gọn).'),
  mcq('c7-m2', 'c7', 'medium', 'Tính 3/4 : 1/2:', ['3/8', '3/2', '2/3', '6/4'], 1, '3/4 : 1/2 = 3/4 × 2/1 = 6/4 = 3/2.'),
  mcq('c7-m3', 'c7', 'medium', 'Một lớp có 40 học sinh, số học sinh nam bằng 3/5 tổng số. Số học sinh nam là:', ['20', '24', '15', '30'], 1, 'Số học sinh nam = 40 × 3/5 = 24.'),
  mcq('c7-m4', 'c7', 'medium', 'Viết hỗn số 2¾ dưới dạng phân số:', ['9/4', '11/4', '7/4', '8/4'], 1, '2¾ = (2×4+3)/4 = 11/4.'),
  mcq('c7-h1', 'c7', 'hard', 'Tính: 1/2 + 1/3 − 1/6', ['1/3', '2/3', '1/6', '5/6'], 1, 'Quy đồng mẫu 6: 3/6 + 2/6 − 1/6 = 4/6 = 2/3.'),
  mcq('c7-h2', 'c7', 'hard', 'Một bể nước, lần đầu bơm được 2/5 bể, lần sau bơm thêm 1/3 bể. Phần bể còn lại chưa có nước là:', ['4/15', '11/15', '2/15', '1/5'], 0, 'Đã bơm: 2/5+1/3 = 6/15+5/15 = 11/15. Còn lại: 1 − 11/15 = 4/15.'),
  mcq('c7-h3', 'c7', 'hard', 'Tìm x, biết x × 2/3 = 4/9.', ['x = 2/3', 'x = 8/27', 'x = 6/9', 'x = 2/9'], 0, 'x = (4/9) : (2/3) = 4/9 × 3/2 = 12/18 = 2/3.'),
  mcq('c7-g1', 'c7', 'hsg', 'Tính nhanh: 1/(1×2) + 1/(2×3) + 1/(3×4) + … + 1/(9×10)', ['9/10', '1/10', '1/90', '10/9'], 0, 'Dùng 1/(n(n+1)) = 1/n − 1/(n+1), tổng "kính viễn vọng" triệt tiêu các số hạng giữa: kết quả = 1 − 1/10 = 9/10.'),
  mcq('c7-g2', 'c7', 'hsg', 'So sánh 2023/2024 và 2024/2025, phân số nào lớn hơn?', ['2023/2024', '2024/2025', 'Bằng nhau', 'Không thể so sánh'], 1, '1 − 2023/2024 = 1/2024; 1 − 2024/2025 = 1/2025. Vì 1/2024 > 1/2025 nên 2023/2024 < 2024/2025, tức 2024/2025 lớn hơn.'),
  mcq('c7-g3', 'c7', 'hsg', 'Một phân số a/b có a/b = 3/5 sau khi rút gọn và b − a = 12. Phân số ban đầu (chưa rút gọn) là:', ['18/30', '9/15', '15/25', '6/10'], 0, 'a=3k, b=5k, b−a=2k=12→k=6. Vậy a=18, b=30, phân số ban đầu là 18/30 (rút gọn được 3/5).'),

  // ================= CHƯƠNG 8 =================
  mcq('c8-e1', 'c8', 'easy', 'So sánh 3,45 và 3,5, số nào lớn hơn?', ['3,45', '3,5', 'Bằng nhau', 'Không so sánh được'], 1, 'So hàng phần mười: 3,45 có 4 phần mười; 3,5 có 5 phần mười. Vì 5 > 4 nên 3,5 lớn hơn.'),
  mcq('c8-e2', 'c8', 'easy', 'Tính 12,5 + 7,3:', ['19,8', '18,8', '20,8', '19,3'], 0, 'Đặt tính thẳng dấu phẩy: 12,5 + 7,3 = 19,8.'),
  mcq('c8-e3', 'c8', 'easy', 'Làm tròn số 7,86 đến hàng đơn vị:', ['7', '8', '7,9', '8,0'], 1, 'Chữ số hàng phần mười là 8 (≥5) nên làm tròn hàng đơn vị lên: 7,86 ≈ 8.'),
  mcq('c8-e4', 'c8', 'easy', 'Một quyển sách giá 45 000đ được giảm giá 20%. Số tiền được giảm là:', ['9 000đ', '900đ', '4 500đ', '90 000đ'], 0, 'Số tiền giảm = 45 000 × 20% = 45 000 × 0,2 = 9 000đ.'),
  mcq('c8-m1', 'c8', 'medium', 'Tính 6,4 × 2,5:', ['14', '16', '15', '16,4'], 1, '64 × 25 = 1600, có tổng 2 chữ số thập phân ở hai thừa số nên kết quả: 6,4 × 2,5 = 16,00 = 16.'),
  mcq('c8-m2', 'c8', 'medium', 'Tính 15,6 : 4:', ['3,9', '3,6', '4,1', '39'], 0, '15,6 : 4 = 3,9.'),
  mcq('c8-m3', 'c8', 'medium', 'Một chiếc áo giá 250 000đ, giảm giá 15%. Giá sau khi giảm là:', ['235 000đ', '212 500đ', '37 500đ', '200 000đ'], 1, 'Tiền giảm = 250 000 × 15% = 37 500đ. Giá sau giảm = 250 000 − 37 500 = 212 500đ.'),
  mcq('c8-m4', 'c8', 'medium', 'Điểm 4 bài kiểm tra của Mai là 8; 7,5; 9; 8,5. Điểm trung bình là:', ['8', '8,25', '8,5', '33'], 1, 'Tổng điểm = 8+7,5+9+8,5 = 33. Trung bình = 33 : 4 = 8,25.'),
  mcq('c8-h1', 'c8', 'hard', 'Một cửa hàng nhập giá 80 000đ/sản phẩm, bán ra lãi 25% so với giá nhập. Giá bán là:', ['100 000đ', '105 000đ', '20 000đ', '90 000đ'], 0, 'Giá bán = 80 000 × (1 + 25%) = 80 000 × 1,25 = 100 000đ.'),
  mcq('c8-h2', 'c8', 'hard', 'Tính giá trị biểu thức: 12,5 × 4 − 6,8 : 2', ['46,6', '43,2', '50', '44,1'], 0, '12,5×4 = 50; 6,8:2 = 3,4; 50 − 3,4 = 46,6.'),
  mcq('c8-h3', 'c8', 'hard', 'Một bể chứa 850 lít nước, đã dùng hết 32%. Số lít nước còn lại trong bể là:', ['272 lít', '578 lít', '818 lít', '600 lít'], 1, 'Còn lại = 850 × (1 − 32%) = 850 × 0,68 = 578 lít.'),
  mcq('c8-g1', 'c8', 'hsg', 'Giá một mặt hàng tăng 20% rồi lại giảm 20% so với giá mới. So với giá ban đầu, giá cuối cùng bằng:', ['100%', '96%', '104%', '90%'], 1, 'Giá cuối = giá đầu × 1,2 × 0,8 = giá đầu × 0,96 = 96% giá ban đầu (không phải bằng giá ban đầu!).'),
  mcq('c8-g2', 'c8', 'hsg', 'Một người gửi tiết kiệm 10 000 000đ với lãi suất 6%/năm (lãi đơn). Sau 2 năm, tổng số tiền cả gốc lẫn lãi là:', ['10 600 000đ', '11 200 000đ', '12 000 000đ', '10 120 000đ'], 1, 'Lãi mỗi năm = 10 000 000 × 6% = 600 000đ. Sau 2 năm: lãi = 1 200 000đ. Tổng = 10 000 000 + 1 200 000 = 11 200 000đ.'),
  mcq('c8-g3', 'c8', 'hsg', 'Một lớp có 40% học sinh Giỏi, 35% học sinh Khá, còn lại là Trung bình. Biết số học sinh Trung bình là 6 em, lớp đó có bao nhiêu học sinh?', ['20', '24', '30', '18'], 1, 'Tỉ lệ Trung bình = 100% − 40% − 35% = 25%. Tổng số học sinh = 6 : 25% = 6 : 0,25 = 24 học sinh.'),

  // ================= CHƯƠNG 9 =================
  mcq('c9-e1', 'c9', 'easy', 'Góc có số đo 75° là góc:', ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'], 0, 'Góc nhọn có số đo trong khoảng từ 0° đến 90°. 75° < 90° nên là góc nhọn.', () => I.angleDiagram({ degrees: 75 })),
  mcq('c9-e2', 'c9', 'easy', 'Góc có số đo 120° là góc:', ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'], 2, 'Góc tù có số đo trong khoảng từ 90° đến 180°. 120° thỏa mãn nên là góc tù.', () => I.angleDiagram({ degrees: 120, label: '120°' })),
  mcq('c9-e3', 'c9', 'easy', 'Lúc 3 giờ đúng, kim giờ và kim phút tạo thành góc bao nhiêu độ?', ['60°', '90°', '120°', '180°'], 1, 'Lúc 3 giờ đúng, kim phút chỉ số 12, kim giờ chỉ số 3, tạo thành góc vuông 90°.', () => I.clockFace({ hour: 3, minute: 0 })),
  mcq('c9-e4', 'c9', 'easy', 'Hai đường ray xe lửa là hình ảnh minh họa cho:', ['Hai đường thẳng cắt nhau', 'Hai đường thẳng song song', 'Hai đường thẳng trùng nhau', 'Một góc bẹt'], 1, 'Hai đường ray luôn cách đều nhau và không bao giờ giao nhau, đó là hình ảnh của hai đường thẳng song song.', () => I.parallelLines()),
  mcq('c9-m1', 'c9', 'medium', 'Một góc có số đo 130°. Tia phân giác chia góc đó thành hai góc bằng nhau, mỗi góc có số đo:', ['65°', '60°', '70°', '130°'], 0, 'Tia phân giác chia đôi góc: 130° : 2 = 65°.'),
  mcq('c9-m2', 'c9', 'medium', 'Góc bẹt có số đo bằng:', ['90°', '100°', '180°', '360°'], 2, 'Góc bẹt có hai cạnh là hai tia đối nhau, số đo bằng 180°.'),
  mcq('c9-m3', 'c9', 'medium', 'Lúc 6 giờ đúng, kim giờ và kim phút tạo thành góc bao nhiêu độ?', ['90°', '150°', '180°', '120°'], 2, 'Lúc 6 giờ đúng, hai kim tạo thành một góc bẹt 180° (hai kim ngược chiều nhau).', () => I.clockFace({ hour: 6, minute: 0 })),
  mcq('c9-m4', 'c9', 'medium', 'Cho góc xOy = 80°, tia Oz là tia phân giác của góc xOy. Số đo góc xOz là:', ['20°', '40°', '80°', '160°'], 1, 'Tia phân giác chia đôi góc: 80° : 2 = 40°.'),
  mcq('c9-h1', 'c9', 'hard', 'Lúc 9 giờ đúng, kim giờ và kim phút tạo thành góc bao nhiêu độ?', ['270°', '90°', '45°', '180°'], 1, 'Mỗi khoảng số ứng 30°, kim giờ chỉ số 9, kim phút chỉ số 12, chênh nhau 3 khoảng ứng 90° (lấy góc nhỏ hơn giữa hai cách tính 90° và 270°).', () => I.clockFace({ hour: 9, minute: 0 })),
  mcq('c9-h2', 'c9', 'hard', 'Hai góc A và B là hai góc kề bù (tổng bằng 180°). Biết góc A = 65°, số đo góc B là:', ['25°', '115°', '105°', '95°'], 1, 'Kề bù: A + B = 180°. B = 180° − 65° = 115°.'),
  mcq('c9-h3', 'c9', 'hard', 'Hai đường thẳng song song bị cắt bởi đường thẳng thứ ba. Một góc trong cùng phía có số đo 70°. Góc trong cùng phía còn lại có số đo:', ['70°', '110°', '20°', '90°'], 1, 'Hai góc trong cùng phía có tổng bằng 180°: 180° − 70° = 110°.'),
  mcq('c9-g1', 'c9', 'hsg', 'Vào lúc 3 giờ đúng, hai kim đồng hồ tạo với nhau một góc vuông (90°). Vào lúc 9 giờ đúng thì hai kim tạo thành góc:', ['90°', '180°', '270°', '45°'], 0, 'Vị trí hai kim lúc 9 giờ đối xứng với lúc 3 giờ qua số 12, nên góc giữa hai kim vẫn là 90° (lấy góc nhỏ hơn).', () => I.clockFace({ hour: 9, minute: 0 })),
  mcq('c9-g2', 'c9', 'hsg', 'Ba tia chung gốc Ox, Oy, Oz, trong đó Oy nằm giữa Ox và Oz. Biết góc xOy = 35°, góc yOz = 40°. Số đo góc xOz là:', ['5°', '75°', '70°', '80°'], 1, 'Vì Oy nằm giữa Ox và Oz nên góc xOz = góc xOy + góc yOz = 35° + 40° = 75°.'),
  mcq('c9-g3', 'c9', 'hsg', 'Hai góc phụ nhau (tổng bằng 90°) hơn kém nhau 20°. Số đo hai góc đó là:', ['30° và 60°', '35° và 55°', '40° và 50°', '25° và 65°'], 1, 'Góc lớn = (90°+20°):2 = 55°; góc nhỏ = 90°−55° = 35°.'),
];

// Chuẩn hoá: gắn illus (SVG) nếu question có trường thứ 8 dạng function (đặt trong mảng options thay bằng cách khác ở trên).
QUESTIONS.forEach(q => {
  if (typeof q.illus === 'function') q.illus = q.illus();
});

export function chapterById(id) { return CHAPTERS.find(c => c.id === id); }
export function questionsOf(chapterId, difficulty) {
  return QUESTIONS.filter(q => q.chapter === chapterId && (!difficulty || q.difficulty === difficulty));
}

export const EXAMS = [
  { id: 'kt15-1', title: 'Kiểm tra 15 phút — Số & Chia hết', minutes: 15, chapters: ['c1', 'c2'], mix: { easy: 5, medium: 4, hard: 1 }, desc: 'Ôn nhanh tập hợp số tự nhiên và tính chia hết.' },
  { id: 'giuaky1', title: 'Kiểm tra giữa học kì I', minutes: 45, chapters: ['c1', 'c2', 'c3'], mix: { easy: 7, medium: 8, hard: 5 }, desc: 'Số tự nhiên, chia hết và số nguyên.' },
  { id: 'cuoiky1', title: 'Kiểm tra cuối học kì I', minutes: 60, chapters: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'], mix: { easy: 8, medium: 10, hard: 7 }, desc: 'Tổng hợp toàn bộ chương trình học kì I.' },
  { id: 'giuaky2', title: 'Kiểm tra giữa học kì II', minutes: 45, chapters: ['c7', 'c8'], mix: { easy: 7, medium: 8, hard: 5 }, desc: 'Phân số và số thập phân.' },
  { id: 'cuoiky2', title: 'Kiểm tra cuối học kì II — Tổng hợp cả năm', minutes: 90, chapters: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'], mix: { easy: 10, medium: 12, hard: 8 }, desc: 'Đề tổng ôn tập toàn bộ chương trình Toán 6.' },
  { id: 'hsg', title: 'Đề thi Học sinh giỏi Toán 6', minutes: 90, chapters: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'], mix: { hsg: 18 }, desc: 'Thử sức với các bài toán nâng cao, tư duy — dành cho học sinh giỏi.' },
];
