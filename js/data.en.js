// js/data.en.js — Bản dịch tiếng Anh cho nội dung chương trình học và đề thi.

export const CHAPTER_EN = {
  c1: {
    title: 'Natural numbers and sets',
    hook: 'Counting classmates, pages in a book, money for school supplies — it all starts with natural numbers!',
    theory: [
      { heading: '1. The set of natural numbers',
        html: `<p>The set of natural numbers is written <b>N</b> = {0; 1; 2; 3; 4; …}. Removing 0 gives <b>N*</b> = {1; 2; 3; …}.</p>
        <p>A set can be written by <b>listing its elements</b>: A = {0; 1; 2; 3; 4}, or by <b>describing a property</b>: A = {x ∈ N | x &lt; 5}.</p>
        <p class="reallife">🎒 In real life: the number of students in a class, notebooks in a bag, floors in a building — all natural numbers.</p>` },
      { heading: '2. Order in the set of natural numbers',
        html: `<p>On the number line, a number further to the left is always smaller. Every natural number has a next number, and (except 0) a previous one.</p>` },
      { heading: '3. The four operations and powers',
        html: `<p>A power with a natural exponent: <b>aⁿ = a × a × … × a</b> (n factors of a), where n is the exponent.</p>
        <p>Multiplying powers with the same base: <b>aᵐ × aⁿ = a^(m+n)</b>. Dividing: <b>aᵐ : aⁿ = a^(m−n)</b> (a ≠ 0, m ≥ n).</p>
        <p class="reallife">🧱 In real life: a square tile with side 3 dm has area 3² = 9 dm². A Rubik's cube with edge 3 cm has volume 3³ = 27 cm³. A cell doubles at every division: after 5 divisions there are 2⁵ = 32 cells.</p>` },
      { heading: '4. Order of operations',
        html: `<p>Without brackets: <b>powers → multiplication and division → addition and subtraction</b>.</p>
        <p>With brackets: work inside round brackets <b>( )</b> first, then square brackets <b>[ ]</b>, then curly brackets <b>{ }</b>.</p>
        <p class="reallife">🛒 In real life: Mai buys 3 notebooks at 8,000đ each and 2 pens at 5,000đ each, and hands over a 50,000đ note. Her change is:<br>50,000 − (3 × 8,000 + 2 × 5,000) = 50,000 − 34,000 = <b>16,000 đồng</b>.</p>` },
    ],
  },
  c2: {
    title: 'Divisibility of natural numbers',
    hook: 'Why can sweets, teams and bus timetables always be split evenly? The secret is divisibility!',
    theory: [
      { heading: '1. Factors and multiples',
        html: `<p>If a natural number a is divisible by b (b ≠ 0), then <b>a is a multiple of b</b>, and <b>b is a factor of a</b>. These are two ways of describing the same divisibility relationship. For example, 12 is divisible by 3, so 12 is a multiple of 3 and 3 is a factor of 12.</p>
        <p><b>To find the factors of a number:</b> divide it in turn by 1, 2, 3, …; the numbers that divide it exactly are its factors. For example: F(12) = {1; 2; 3; 4; 6; 12}.</p>
        <p><b>To find the multiples of a number:</b> multiply it in turn by 0, 1, 2, 3, … For example: M(4) = {0; 4; 8; 12; 16; 20; …}. A number has finitely many factors but infinitely many multiples.</p>
        <ul>
          <li>A <b>common factor</b> of two numbers is a factor of both numbers. For example: CF(12, 18) = {1; 2; 3; 6}.</li>
          <li>A <b>common multiple</b> of two numbers is a multiple of both numbers. For example: CM(4, 6) = {0; 12; 24; 36; …}.</li>
        </ul>
        <p>Common factors and common multiples lead us to <b>HCF</b> and <b>LCM</b> in the next section.</p>
        <p class="reallife">🍬 In real life: suppose you have 12 sweets to share equally among some friends, with none left over. The possible numbers of friends are factors of 12, such as 1, 2, 3, 4, 6 or 12.</p>` },
      { heading: '2. Divisibility tests',
        html: `<ul>
          <li>Divisible by <b>2</b>: the last digit is 0, 2, 4, 6 or 8.</li>
          <li>Divisible by <b>5</b>: the last digit is 0 or 5.</li>
          <li>Divisible by <b>3</b>: the digit sum is divisible by 3.</li>
          <li>Divisible by <b>9</b>: the digit sum is divisible by 9.</li>
        </ul>` },
      { heading: '3. Primes, composites and prime factorisation',
        html: `<p>A prime is a natural number greater than 1 with exactly two divisors: 1 and itself (2, 3, 5, 7, 11, 13…). A composite number has more than two divisors.</p>
        <p>Every composite number can be written as a product of primes — its <b>prime factorisation</b> — usually shown with a factor tree.</p>` },
      { heading: '4. HCF and LCM',
        html: `<p>The <b>highest common factor HCF(a, b)</b> is the largest common divisor of a and b. The <b>lowest common multiple LCM(a, b)</b> is the smallest non-zero common multiple. Both are found from the prime factorisations.</p>
        <p class="reallife">🎒 In real life: a teacher has 24 pens and 36 notebooks and wants to make as many identical gift bags as possible. The greatest number of bags is <b>HCF(24, 36) = 12</b>.</p>
        <p class="reallife">🚌 Bus A leaves every 15 minutes and bus B every 20 minutes; both leave at 6 o'clock. They next leave together after <b>LCM(15, 20) = 60 minutes</b>, that is at 7 o'clock.</p>` },
    ],
  },
  c3: {
    title: 'Integers',
    hook: 'Temperatures below 0°C in the mountains, the depth of a submarine, money you still owe — all of these need negative numbers!',
    theory: [
      { heading: '1. Negative numbers and the set of integers',
        html: `<p>The numbers −1, −2, −3, … are negative integers. The set of integers <b>Z</b> = {…; −3; −2; −1; 0; 1; 2; 3; …} contains the negatives, zero and the positives.</p>
        <p class="reallife">🌡️ In real life: −2°C means 2 degrees below zero. A height of −45 m means 45 m below sea level. A balance of −200,000đ means you owe 200,000 đồng.</p>` },
      { heading: '2. Comparing integers, absolute value',
        html: `<p>On the number line, an integer further left is always smaller. Every negative integer is smaller than 0 and smaller than every positive integer.</p>
        <p>The absolute value of an integer a, written |a|, is its distance from 0 on the number line. For example |−7| = 7.</p>` },
      { heading: '3. Adding, subtracting and the bracket rule',
        html: `<p>Adding integers with the same sign: add the absolute values and keep the sign. Adding integers with different signs: subtract the smaller absolute value from the larger one and keep the sign of the number with the larger absolute value.</p>
        <p>Subtraction: a − b = a + (−b).</p>
        <p><b>Bracket rule:</b> when a minus sign stands in front of a bracket, removing the bracket changes the sign of every term inside.</p>` },
      { heading: '4. Multiplying and dividing integers',
        html: `<p>Multiplying (or dividing) two integers with the <b>same sign</b> gives a <b>positive</b> result; with <b>different signs</b> the result is <b>negative</b>.</p>` },
    ],
  },
  c4: {
    title: 'Plane shapes in real life',
    hook: 'Sports pitches, floor tiles, road signs, roofs — they are all everyday plane shapes.',
    theory: [
      { heading: '1. Common plane shapes',
        html: `<p>Equilateral triangle (3 equal sides and angles), square (4 equal sides, 4 right angles), rectangle, rhombus (4 equal sides), parallelogram (two pairs of parallel sides) and isosceles trapezium.</p>` },
      { heading: '2. Perimeter and area',
        html: `<table class="theory-table">
          <tr><th>Shape</th><th>Perimeter</th><th>Area</th></tr>
          <tr><td>Square with side a</td><td>4a</td><td>a²</td></tr>
          <tr><td>Rectangle a, b</td><td>2(a+b)</td><td>a × b</td></tr>
          <tr><td>Equilateral triangle, side a</td><td>3a</td><td>—</td></tr>
          <tr><td>Rhombus, diagonals d₁, d₂</td><td>4a</td><td>(d₁ × d₂) : 2</td></tr>
          <tr><td>Parallelogram, base a, height h</td><td>—</td><td>a × h</td></tr>
          <tr><td>Trapezium, bases a and b, height h</td><td>—</td><td>(a+b) × h : 2</td></tr>
        </table>
        <p class="reallife">🏟️ In real life: a football pitch 105 m by 68 m has area 105 × 68 = 7,140 m² — exactly what you need to work out how much grass to plant!</p>` },
    ],
  },
  c5: {
    title: 'Symmetry of plane shapes',
    hook: 'Butterfly wings, leaves, toy pinwheels and brand logos — their beauty comes from symmetry.',
    theory: [
      { heading: '1. Line symmetry',
        html: `<p>A shape has a <b>line of symmetry</b> if a straight line splits it into two halves that match exactly when folded along that line.</p>
        <p class="reallife">🦋 In real life: butterfly wings, leaves, the human face (almost), and the capital letters A, H, M, T, U, V all have a line of symmetry.</p>` },
      { heading: '2. Point symmetry',
        html: `<p>A shape has a <b>centre of symmetry</b> O if turning it 180° about O gives exactly the same shape again.</p>
        <p class="reallife">🎡 In real life: pinwheels, the letters S, N and Z, parallelograms, squares and circles all have a centre of symmetry.</p>` },
    ],
  },
  c6: {
    title: 'Statistics and probability',
    hook: 'Surveying favourite sports, forecasting the weather, estimating a shooter’s accuracy — statistics and probability are everywhere.',
    theory: [
      { heading: '1. Collecting and displaying data',
        html: `<p>Collected data can be shown in a table, a picture chart or a <b>bar chart</b>, which makes comparisons easy to see at a glance.</p>` },
      { heading: '2. Experimental probability',
        html: `<p>If a trial is repeated n times and event A happens k times, the ratio <b>k/n</b> is the <b>experimental probability</b> of A. The more trials, the closer it gets to the theoretical probability.</p>
        <p class="reallife">🎯 In real life: a shooter fires 200 shots and hits the target 170 times. The experimental probability of a hit is 170/200 = 0.85.</p>` },
    ],
  },
  c7: {
    title: 'Fractions',
    hook: 'Sharing a pizza, measuring half a cup of flour, taking a quarter-hour break — fractions live in every kitchen!',
    theory: [
      { heading: '1. Meaning and basic property',
        html: `<p>A fraction <b>a/b</b> (b ≠ 0) has numerator a and denominator b. Two fractions are equal when a×d = b×c. Multiplying or dividing both numerator and denominator by the same non-zero number gives an equal fraction — that is how we simplify and find common denominators.</p>` },
      { heading: '2. Comparing fractions and the four operations',
        html: `<p>To compare fractions, rewrite them with a common denominator and compare numerators. Adding or subtracting like fractions: keep the denominator and add or subtract the numerators; for unlike fractions, find a common denominator first. Multiplying: numerator times numerator, denominator times denominator. Dividing: multiply by the reciprocal.</p>
        <p class="reallife">🥧 In real life: a pizza is cut into 8 equal slices and Nam eats 3 of them, so he has eaten 3/8 of the pizza.</p>` },
    ],
  },
  c8: {
    title: 'Decimals',
    hook: 'Prices at the market, weights on the scales, holiday discounts — decimals are the language of everyday money.',
    theory: [
      { heading: '1. Decimals and the four operations',
        html: `<p>A decimal has a whole part and a decimal part separated by a decimal point. When adding or subtracting, line up the decimal points. When multiplying or dividing, work as with whole numbers and then place the point using the rules.</p>` },
      { heading: '2. Percentages',
        html: `<p>The percentage of a compared with b is (a : b) × 100%. Percentages are everywhere in real life: discounts, bank interest, the share of marks in a test…</p>
        <p class="reallife">🏷️ In real life: a shirt priced at 250,000đ is reduced by 15%. The reduction is 250,000 × 15% = 37,500đ, so the new price is 212,500đ.</p>` },
    ],
  },
  c9: {
    title: 'Angles and parallel lines',
    hook: 'Clock hands make a new angle every minute, and two railway tracks run side by side without ever meeting.',
    theory: [
      { heading: '1. Angles and their size',
        html: `<p>An angle is formed by two rays from the same point. Angles are measured in <b>degrees (°)</b>: acute (0°–90°), right (90°), obtuse (90°–180°) and straight (180°).</p>
        <p class="reallife">🕒 In real life: at exactly 3 o'clock the hour and minute hands make a right angle of 90°.</p>` },
      { heading: '2. Parallel lines and angle bisectors',
        html: `<p>Parallel lines are lines with no point in common. The bisector of an angle is the ray between its two sides that splits it into two equal angles.</p>
        <p class="reallife">🛤️ In real life: railway tracks and the opposite sides of a rectangular window are pictures of parallel lines.</p>` },
    ],
  },
};

export const EXAM_EN = {
  'kt15-1': { title: '15-minute test — Numbers & divisibility', desc: 'A quick review of natural numbers and divisibility.' },
  giuaky1: { title: 'Mid-term test, semester 1', desc: 'Natural numbers, divisibility and integers.' },
  cuoiky1: { title: 'End-of-semester 1 exam', desc: 'Everything covered in the first semester.' },
  giuaky2: { title: 'Mid-term test, semester 2', desc: 'Fractions and decimals.' },
  cuoiky2: { title: 'End-of-year exam — whole syllabus', desc: 'A full revision paper covering the entire Grade 6 course.' },
  hsg: { title: 'Gifted-student exam, Grade 6 maths', desc: 'Challenging problems that stretch your thinking — for gifted-student training.' },
};

// Ngân hàng câu hỏi tiếng Anh: id -> [câu hỏi, [4 phương án — GIỮ NGUYÊN THỨ TỰ], lời giải]
export const QUESTION_EN = {
  // ---------------- Chương 1
  'c1-e1': ['The set of natural numbers greater than 2 and less than 6 is:', ['{2;3;4;5;6}', '{3;4;5}', '{2;3;4;5}', '{3;4;5;6}'],
    'x must satisfy 2 &lt; x &lt; 6, so x ∈ {3; 4; 5} — the strict inequality signs leave out both 2 and 6.'],
  'c1-e2': ['Work out: 25 + 15 × 2', ['80', '55', '90', '40'], 'Multiply first, then add: 15 × 2 = 30, and 25 + 30 = 55.'],
  'c1-e3': ['The Roman numeral for 14 is:', ['XIIII', 'XIV', 'XVI', 'IXV'], '14 = 10 + 4 = X + IV = XIV.'],
  'c1-e4': ['The value of 5² is:', ['10', '25', '52', '15'], '5² = 5 × 5 = 25.'],
  'c1-m1': ['Work out: 3² × 4 − 20 : 5', ['32', '28', '40', '16'], '3² × 4 = 9 × 4 = 36; 20 : 5 = 4; so 36 − 4 = 32.'],
  'c1-m2': ['Lan buys 4 notebooks at 7,000đ each and a pen case at 25,000đ, and hands over 100,000đ. Her change is:',
    ['47,000đ', '53,000đ', '43,000đ', '75,000đ'], 'Cost: 4×7,000 + 25,000 = 28,000 + 25,000 = 53,000đ. Change: 100,000 − 53,000 = 47,000đ.'],
  'c1-m3': ['List the elements of the set B of natural numbers x with 10 &lt; x ≤ 15:',
    ['{10;11;12;13;14;15}', '{11;12;13;14;15}', '{11;12;13;14}', '{10;11;12;13;14}'],
    'x &gt; 10 (10 not included) and x ≤ 15 (15 included), so B = {11; 12; 13; 14; 15}.'],
  'c1-m4': ['Write 2³ × 2⁴ as a single power:', ['2⁷', '2¹²', '4⁷', '2¹'], 'Multiplying powers with the same base means adding exponents: 2³⁺⁴ = 2⁷ = 128.'],
  'c1-h1': ['Work out: 100 − [(25 − 5) × 2 + 3²]', ['51', '49', '60', '40'], 'Inside the brackets: (25−5)×2 + 3² = 20×2 + 9 = 49. Then 100 − 49 = 51.'],
  'c1-h2': ['A cube has edge 4 cm. Its volume (V = edge³) is:', ['16 cm³', '64 cm³', '12 cm³', '48 cm³'], 'V = 4³ = 4×4×4 = 64 cm³.'],
  'c1-h3': ['Find the natural number x such that 2ˣ = 32.', ['x = 4', 'x = 5', 'x = 6', 'x = 16'], '2⁵ = 32, so x = 5.'],
  'c1-g1': ['Compare 2³⁰⁰ and 3²⁰⁰.', ['2³⁰⁰ &lt; 3²⁰⁰', '2³⁰⁰ &gt; 3²⁰⁰', '2³⁰⁰ = 3²⁰⁰', 'They cannot be compared'],
    'Rewrite both with exponent 100: 2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰ and 3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰. Since 8 &lt; 9, we get 2³⁰⁰ &lt; 3²⁰⁰.'],
  'c1-g2': ['Find the sum S = 2⁰ + 2¹ + 2² + … + 2¹⁰.', ['2047', '1024', '2048', '2046'],
    'For a sum like this, S = 2¹¹ − 1 = 2048 − 1 = 2047 (double S and subtract S — all the middle terms cancel).'],
  'c1-g3': ['What is the last digit of 7²⁰²³?', ['1', '7', '9', '3'],
    'The last digit of 7ⁿ repeats in a cycle of 4: 7, 9, 3, 1. Since 2023 leaves remainder 3 when divided by 4, the last digit is the third one in the cycle, namely 3.'],

  // ---------------- Chương 2
  'c2-e1': ['Which number is divisible by both 2 and 5?', ['120', '123', '125', '122'], 'A number divisible by both 2 and 5 must end in 0. Only 120 does.'],
  'c2-e2': ['471 is divisible by which of these numbers?', ['2', '3', '5', '9'], 'Digit sum: 4+7+1 = 12, which is divisible by 3 (but not by 9), so 471 is divisible by 3.'],
  'c2-e3': ['Which of these is a prime number?', ['21', '29', '33', '51'], '29 has only the divisors 1 and 29, so it is prime. The others are composite (21=3×7, 33=3×11, 51=3×17).'],
  'c2-e4': ['HCF(12, 18) equals:', ['2', '4', '6', '36'], 'CF(12, 18) = {1; 2; 3; 6}, so HCF(12, 18) = 6 — the largest of the common factors.'],
  'c2-m1': ['Write 60 as a product of prime factors:', ['2² × 3 × 5', '2 × 3 × 10', '2² × 15', '4 × 3 × 5'], '60 = 2×30 = 2×2×15 = 2²×3×5.'],
  'c2-m2': ['LCM(4, 6) equals:', ['24', '12', '2', '18'], 'CM(4, 6) = {0; 12; 24; …}, so LCM(4, 6) = 12 — the smallest non-zero common multiple.'],
  'c2-m3': ['A class has 32 boys and 24 girls to be split into groups with equal numbers of boys and of girls. The greatest possible number of groups is:',
    ['4 groups', '6 groups', '8 groups', '12 groups'], 'The number of groups must be a common factor of 32 and 24 so that both the boys and the girls can be divided equally. Since we need the greatest possible number of groups, we use HCF(32, 24) = 8.'],
  'c2-m4': ['How many non-zero natural numbers below 50 are divisible by both 3 and 5?', ['1 number', '2 numbers', '3 numbers', '4 numbers'],
    'Divisible by both 3 and 5 means divisible by 15: the numbers are 15, 30 and 45 — three of them.'],
  'c2-h1': ['An is on duty every 4 days and Binh every 6 days. Today they are on duty together. After how many days will they next be on duty together?',
    ['10 days', '12 days', '24 days', '8 days'], 'The number of days until they are next on duty together must be a common multiple of 4 and 6. Since we need the least number of days, we use LCM(4, 6) = 12 days.'],
  'c2-h2': ['The HCF and the LCM of 36 and 60 are:', ['12 and 180', '6 and 360', '12 and 360', '18 and 180'],
    '36 = 2²×3² and 60 = 2²×3×5. HCF = 2²×3 = 12. LCM = 2²×3²×5 = 180.'],
  'c2-h3': ['A natural number is divisible by 9 when:', ['Its last digit is divisible by 9', 'The sum of its digits is divisible by 9', 'The number is odd', 'The sum of its digits is divisible by 3'],
    'Divisibility test for 9: the sum of the digits must be divisible by 9.'],
  'c2-g1': ['The smallest three-digit number that is divisible by 4 and by 5 but not by 3 is:', ['100', '120', '110', '105'],
    'Divisible by both 4 and 5 means divisible by 20. The smallest three-digit multiple of 20 is 100, and its digit sum 1+0+0 = 1 is not divisible by 3 — so it works.'],
  'c2-g2': ['Find the smallest natural number x greater than 20 with HCF(x, 18) = 6.', ['24', '21', '30', '36'],
    'x = 6k where k is not a multiple of 3 (so the HCF is exactly 6). x &gt; 20 gives k ≥ 4; take k = 4 to get x = 24. Check: HCF(24, 18) = 6 ✓'],
  'c2-g3': ['What is the smallest sum of three consecutive primes that is itself prime?', ['2+3+5 = 10', '3+5+7 = 15', '5+7+11 = 23', '7+11+13 = 31'],
    '2+3+5 = 10 (not prime), 3+5+7 = 15 (not prime), 5+7+11 = 23 which is prime — so this is the smallest such triple.'],

  // ---------------- Chương 3
  'c3-e1': ['The temperature at a mountain top is −8°C. At the foot of the mountain it is 12° warmer. The temperature at the foot is:',
    ['−20°C', '4°C', '20°C', '−4°C'], '−8 + 12 = 4, so it is 4°C at the foot of the mountain.'],
  'c3-e2': ['Compare −7 and −3:', ['−7 &gt; −3', '−7 &lt; −3', '−7 = −3', 'They cannot be compared'], 'On the number line −7 lies to the left of −3, so −7 &lt; −3.'],
  'c3-e3': ['|−15| equals:', ['−15', '15', '0', '1/15'], 'An absolute value is never negative: |−15| = 15.'],
  'c3-e4': ['Work out (−8) + (−5):', ['−13', '13', '−3', '3'], 'Adding two negative numbers: add the absolute values and keep the minus sign: −(8+5) = −13.'],
  'c3-m1': ['Work out 12 − 20:', ['8', '−8', '32', '−32'], '12 − 20 = 12 + (−20) = −8.'],
  'c3-m2': ['Work out (−3) × 7:', ['21', '−21', '10', '−10'], 'Multiplying numbers with different signs gives a negative result: (−3) × 7 = −21.'],
  'c3-m3': ['Remove the brackets and work out: 15 − (8 − 20)', ['27', '3', '−27', '−3'], '15 − (8 − 20) = 15 − 8 + 20 = 27.'],
  'c3-m4': ['A submarine is 45 m below sea level and rises 20 m. Where is it now?',
    ['65 m deep', '25 m deep', '25 m above the sea', '20 m deep'], 'In numbers: (−45) + 20 = −25, so the submarine is now 25 m below sea level.'],
  'c3-h1': ['Work out: (−25) × (−4) : (−10)', ['10', '−10', '100', '−100'], '(−25) × (−4) = 100 (same signs → positive). Then 100 : (−10) = −10 (different signs → negative).'],
  'c3-h2': ['Find x, given x + (−15) = 7.', ['x = −8', 'x = 8', 'x = 22', 'x = −22'], 'x = 7 − (−15) = 7 + 15 = 22.'],
  'c3-h3': ['Work out the sum: (−3) + (−2) + (−1) + 0 + 1 + 2 + 3 + 4 + 5', ['9', '0', '5', '15'],
    'The pairs (−3, 3), (−2, 2) and (−1, 1) cancel out, leaving 0 + 4 + 5 = 9.'],
  'c3-g1': ['Find the sum S = 1 − 2 + 3 − 4 + … + 99 − 100.', ['−50', '50', '0', '−100'],
    'Group into 50 pairs: (1−2)+(3−4)+…+(99−100). Each pair is −1, and there are 50 pairs, so S = −50.'],
  'c3-g2': ['Find the integer x with |x − 3| = 5.', ['x = 8', 'x = 8 or x = −2', 'x = −2', 'x = 2 or x = 8'],
    '|x−3| = 5 means x − 3 = 5 or x − 3 = −5, giving x = 8 or x = −2.'],
  'c3-g3': ['Work out quickly: (−1) + 2 + (−3) + 4 + … + (−99) + 100', ['50', '−50', '100', '0'],
    'Pair them up: (−1+2) = 1, (−3+4) = 1, …, (−99+100) = 1. There are 50 pairs, so the sum is 50.'],

  // ---------------- Chương 4
  'c4-e1': ['A rectangular yard is 30 m long and 20 m wide. Its perimeter is:', ['50m', '100m', '600m', '60m'],
    'Perimeter of a rectangle = 2×(length+width) = 2×(30+20) = 100 m.'],
  'c4-e2': ['A square has side 5 cm. Its area is:', ['20 cm²', '25 cm²', '10 cm²', '15 cm²'], 'Area of a square = side² = 5² = 25 cm².'],
  'c4-e3': ['An equilateral triangle has side 6 cm. Its perimeter is:', ['12cm', '18cm', '36cm', '24cm'], 'Perimeter = 3 × side = 3 × 6 = 18 cm.'],
  'c4-e4': ['A shape with four equal sides and four right angles is called:', ['A rhombus', 'A rectangle', 'A square', 'A parallelogram'],
    'A square has four equal sides and four right angles.'],
  'c4-m1': ['A rectangular garden is 15 m long and 8 m wide. Its area is:', ['46 m²', '23 m²', '120 m²', '110 m²'], 'Area = length × width = 15 × 8 = 120 m².'],
  'c4-m2': ['A rhombus has diagonals of 8 cm and 6 cm. Its area is:', ['48 cm²', '24 cm²', '14 cm²', '28 cm²'],
    'Area of a rhombus = (d₁×d₂):2 = (8×6):2 = 48:2 = 24 cm².'],
  'c4-m3': ['A parallelogram has base 12 cm and height 5 cm. Its area is:', ['17 cm²', '34 cm²', '60 cm²', '120 cm²'],
    'Area of a parallelogram = base × height = 12 × 5 = 60 cm².'],
  'c4-m4': ['A square picture frame has perimeter 48 cm. Its area is:', ['144 cm²', '96 cm²', '576 cm²', '12 cm²'],
    'Side = 48:4 = 12 cm, so the area is 12² = 144 cm².'],
  'c4-h1': ['An isosceles trapezium has bases 10 cm and 6 cm and height 4 cm. Its area is:', ['32 cm²', '64 cm²', '40 cm²', '16 cm²'],
    'Area = (long base + short base) × height : 2 = (10+6)×4:2 = 64:2 = 32 cm².'],
  'c4-h2': ['A rectangular football pitch has perimeter 340 m and is 30 m longer than it is wide. Its area is:',
    ['7000 m²', '6800 m²', '5600 m²', '17000 m²'],
    'Half the perimeter is 170 = length + width; length − width = 30, so length = 100 m and width = 70 m. Area = 100 × 70 = 7,000 m².'],
  'c4-h3': ['Square tiles of side 50 cm are laid on a rectangular yard 10 m by 6 m. How many tiles are needed?',
    ['120 tiles', '240 tiles', '600 tiles', '2400 tiles'],
    'Yard area = 10×6 = 60 m² = 600,000 cm². One tile = 50×50 = 2,500 cm². Number of tiles = 600,000 : 2,500 = 240.'],
  'c4-g1': ['An isosceles trapezium of area 96 m² has height 8 m and its long base is twice its short base. The two bases are:',
    ['Short 8 m, long 16 m', 'Short 6 m, long 12 m', 'Short 10 m, long 20 m', 'Short 4 m, long 8 m'],
    'Let the short base be a and the long base 2a: (a+2a)×8:2 = 96 → 3a×4 = 96 → a = 8. So the bases are 8 m and 16 m.'],
  'c4-g2': ['A square has the same area as a 9 cm × 16 cm rectangle. The side of the square is:', ['10cm', '12cm', '13cm', '14cm'],
    'The rectangle has area 9×16 = 144 cm², and the square root of 144 is 12, so the side is 12 cm.'],
  'c4-g3': ['A parallelogram has area 84 cm² and height 7 cm. If the base is increased by 2 cm (same height), the new area is:',
    ['86 cm²', '91 cm²', '98 cm²', '112 cm²'], 'Old base = 84:7 = 12 cm, new base = 14 cm, so the new area is 14×7 = 98 cm².'],

  // ---------------- Chương 5
  'c5-e1': ['Which shape has a line of symmetry?', ['A square', 'A general parallelogram', 'A scalene trapezium', 'Any quadrilateral'],
    'A square has 4 lines of symmetry (its two diagonals and the two lines through midpoints of opposite sides). A general parallelogram has none.'],
  'c5-e2': ['Which capital letter has a vertical line of symmetry?', ['A', 'F', 'G', 'N'], 'The letter A has a vertical line of symmetry splitting it into two matching halves.'],
  'c5-e3': ['How many lines of symmetry does an equilateral triangle have?', ['1', '2', '3', 'Infinitely many'],
    'It has 3 — each one passes through a vertex and the midpoint of the opposite side.'],
  'c5-e4': ['Does a circle have a centre of symmetry?', ['Yes, its own centre', 'No', 'Only lines of symmetry', 'It depends on the radius'],
    'A circle has a centre of symmetry at its centre (and infinitely many lines of symmetry through it).'],
  'c5-m1': ['Which capital letter has a centre of symmetry?', ['S', 'A', 'B', 'C'], 'Turning the letter S through 180° about its centre gives the same letter, so it has point symmetry.'],
  'c5-m2': ['How many lines of symmetry does a square have?', ['2', '3', '4', '8'],
    'Four: the two diagonals and the two lines joining midpoints of opposite sides.'],
  'c5-m3': ['Does a general parallelogram have a centre of symmetry?', ['Yes', 'No', 'Only if it is a square', 'Cannot be determined'],
    'The point where its diagonals cross is a centre of symmetry.'],
  'c5-m4': ['How many lines of symmetry does a regular hexagon have?', ['3', '4', '6', '8'],
    'Six: three through pairs of opposite vertices and three through midpoints of opposite sides.'],
  'c5-h1': ['Among a rectangle, a rhombus, an isosceles trapezium and a parallelogram, which has NO centre of symmetry?',
    ['The rectangle', 'The rhombus', 'The isosceles trapezium', 'The parallelogram'],
    'An isosceles trapezium only has a line of symmetry (through the midpoints of the two parallel sides). The other three have a centre of symmetry where their diagonals meet.'],
  'c5-h2': ['A triangular road sign in the shape of an equilateral triangle has:',
    ['3 lines of symmetry and a centre of symmetry', '3 lines of symmetry and no centre of symmetry', '1 line of symmetry and a centre of symmetry', 'Neither lines nor a centre of symmetry'],
    'An equilateral triangle has 3 lines of symmetry, but turning it 180° about its centre does not give the same picture, so it has no centre of symmetry.'],
  'c5-h3': ['Among the letters H, O, S and F, which have BOTH a line of symmetry and a centre of symmetry?',
    ['S and F', 'H and O', 'Only F', 'Only S'],
    'H and O have horizontal and vertical lines of symmetry as well as a centre of symmetry. S has only a centre, and F has neither.'],
  'c5-g1': ['"A shape with exactly two perpendicular lines of symmetry must have a centre of symmetry where they cross." This statement is:',
    ['True', 'False', 'True only for squares', 'Impossible to decide'],
    'It is a geometric fact: reflecting in one line and then in the perpendicular line is the same as a 180° turn about their intersection, so that point is a centre of symmetry.'],
  'c5-g2': ['Which capital letter has a horizontal line of symmetry, a vertical line of symmetry AND a centre of symmetry?',
    ['N', 'H', 'S', 'F'], 'H has both lines of symmetry and a centre of symmetry where they cross. N and S have only a centre, F has neither.'],
  'c5-g3': ['A pattern is made by turning an equilateral triangle about its centre through 120° again and again. Does the pattern have a centre of symmetry (i.e. a 180° turn maps it onto itself)?',
    ['Yes', 'No', 'Only for a right-angled triangle', 'Cannot be determined'],
    'Point symmetry needs a turn of exactly 180° to match. This pattern has three-fold rotational symmetry (120°), and a 180° turn does not map it onto itself, so it has no centre of symmetry.'],

  // ---------------- Chương 6
  'c6-e1': ['A survey of 20 students about their favourite sport gives: football 8, badminton 5, swimming 4, table tennis 3. The most popular sport is:',
    ['Badminton', 'Football', 'Swimming', 'Table tennis'], 'Football has the most votes (8 students), so it is the most popular.'],
  'c6-e2': ['A coin is tossed 50 times and lands tails 28 times. The experimental probability of tails is:', ['0.5', '0.56', '0.28', '28'],
    'Experimental probability = number of successes : number of trials = 28 : 50 = 0.56.'],
  'c6-e3': ['A dice is rolled 30 times and shows a six 5 times. The experimental probability of rolling a six is:', ['1/6', '1/5', '1/30', '5/6'],
    'Experimental probability = successes : trials = 5 : 30 = 1/6.'],
  'c6-e4': ['A bar chart is normally used to:', ['Write mathematical formulas', 'Compare quantities at a glance', 'Find the perimeter of a shape', 'Solve equations'],
    'Bar charts let you compare quantities for several categories by looking at the heights of the bars.'],
  'c6-m1': ['Of the 20 students surveyed, 8 chose football. What percentage is that?', ['8%', '40%', '20%', '80%'], 'Percentage = 8/20 × 100% = 40%.'],
  'c6-m2': ['A dice is rolled 100 times and an even number (2, 4 or 6) comes up 54 times. The experimental probability of an even number is:',
    ['0.46', '0.54', '0.5', '0.6'], 'Experimental probability = 54 : 100 = 0.54.'],
  'c6-m3': ['A box holds blue and red marbles. In 40 draws with replacement, a red marble came out 24 times. The experimental probability of drawing blue is:',
    ['0.6', '0.4', '0.24', '0.16'], 'Blue was drawn 40 − 24 = 16 times, so the probability is 16 : 40 = 0.4.'],
  'c6-m4': ['Classes 6A, 6B, 6C and 6D have 10, 8, 12 and 6 top students. On a bar chart, the tallest bar belongs to:', ['6A', '6B', '6C', '6D'],
    'Class 6C has 12 top students, the most of the four, so its bar is the tallest.'],
  'c6-h1': ['Test scores of 30 students: three scored 10, five scored 9, ten scored 8, eight scored 7 and four scored 6. What percentage scored 8 or above?',
    ['50%', '60%', '18%', '40%'], 'Students scoring 8 or more: 3+5+10 = 18. Percentage = 18/30 × 100% = 60%.'],
  'c6-h2': ['A shooter fires 200 shots and hits the target 170 times. The experimental probability of a hit (to 2 decimal places) is:',
    ['0.17', '0.85', '0.80', '1.18'], 'Experimental probability = 170 : 200 = 0.85.'],
  'c6-h3': ['A coin is tossed twice in a row, and this is repeated 80 times. Both tosses were heads on 18 occasions. The experimental probability of "two heads" is:',
    ['0.18', '0.225', '0.25', '0.9'], 'Experimental probability = 18 : 80 = 0.225.'],
  'c6-g1': ['The experimental probability of an event after n trials gets closer to the theoretical probability when:',
    ['n is smaller', 'n is larger', 'n is an even number', 'It does not depend on n'],
    'The more trials you carry out, the more stable the experimental probability becomes and the closer it gets to the theoretical value.'],
  'c6-g2': ['A dice is rolled n times. A one comes up 24 times, a relative frequency of 0.2. What is n?', ['100', '120', '96', '150'],
    'n = number of successes : relative frequency = 24 : 0.2 = 120.'],
  'c6-g3': ['A box holds 40 marbles in three colours. In 80 draws with replacement: red 32 times, blue 28 times, the rest yellow. Estimate how many yellow marbles are in the box:',
    ['10 marbles', '20 marbles', '8 marbles', '15 marbles'],
    'Yellow was drawn 80−32−28 = 20 times, a relative frequency of 20/80 = 0.25. Estimated yellow marbles ≈ 0.25 × 40 = 10.'],

  // ---------------- Chương 7
  'c7-e1': ['Write 8/12 in its simplest form:', ['4/6', '2/3', '1/2', '8/12'], 'HCF(8,12) = 4. Then 8:4 = 2 and 12:4 = 3, so the simplest form is 2/3.'],
  'c7-e2': ['Which is larger, 3/4 or 5/6?', ['3/4', '5/6', 'They are equal', 'They cannot be compared'],
    'With a common denominator: 3/4 = 9/12 and 5/6 = 10/12. Since 10/12 &gt; 9/12, the larger fraction is 5/6.'],
  'c7-e3': ['Work out 1/3 + 1/6:', ['2/9', '1/2', '2/6', '1/9'], 'Common denominator 6: 1/3 = 2/6, so 2/6 + 1/6 = 3/6 = 1/2.'],
  'c7-e4': ['A pizza is cut into 8 equal slices and Nam eats 3 of them. The fraction he has eaten is:', ['3/8', '8/3', '3/5', '5/8'],
    'He ate 3 out of 8 equal parts, which is written 3/8.'],
  'c7-m1': ['Work out 2/5 × 5/6 (give your answer in its simplest form):', ['7/11', '1/3', '37/30', '12/25'],
    'Multiply numerators and denominators: 2/5 × 5/6 = (2×5)/(5×6) = 10/30 = 1/3 after simplifying.'],
  'c7-m2': ['Work out 3/4 : 1/2 (give your answer in its simplest form):', ['3/8', '3/2', '2/3', '1/4'],
    'Dividing by a fraction means multiplying by its reciprocal: 3/4 : 1/2 = 3/4 × 2/1 = 6/4 = 3/2 after simplifying.'],
  'c7-m3': ['A class has 40 students and 3/5 of them are boys. How many boys are there?', ['20', '24', '15', '30'], 'Number of boys = 40 × 3/5 = 24.'],
  'c7-m4': ['Write the mixed number 2¾ as an improper fraction:', ['9/4', '11/4', '7/4', '8/4'], '2¾ = (2×4+3)/4 = 11/4.'],
  'c7-h1': ['Work out: 1/2 + 1/3 − 1/6', ['1/3', '2/3', '1/6', '5/6'], 'Common denominator 6: 3/6 + 2/6 − 1/6 = 4/6 = 2/3.'],
  'c7-h2': ['A tank is filled 2/5 full, then another 1/3 of the tank is pumped in. What fraction of the tank is still empty?',
    ['4/15', '11/15', '2/15', '1/5'], 'Filled: 2/5 + 1/3 = 6/15 + 5/15 = 11/15. Empty: 1 − 11/15 = 4/15.'],
  'c7-h3': ['Find x, given x × 2/3 = 4/9.', ['x = 2/3', 'x = 8/27', 'x = 3/2', 'x = 2/9'], 'x = (4/9) : (2/3) = 4/9 × 3/2 = 12/18 = 2/3.'],
  'c7-g1': ['Work out quickly: 1/(1×2) + 1/(2×3) + 1/(3×4) + … + 1/(9×10)', ['9/10', '1/10', '1/90', '10/9'],
    'Use 1/(n(n+1)) = 1/n − 1/(n+1). The sum telescopes — all middle terms cancel — leaving 1 − 1/10 = 9/10.'],
  'c7-g2': ['Which is larger, 2023/2024 or 2024/2025?', ['2023/2024', '2024/2025', 'They are equal', 'They cannot be compared'],
    '1 − 2023/2024 = 1/2024 and 1 − 2024/2025 = 1/2025. Since 1/2024 &gt; 1/2025, we take more away from 1 in the first case, so 2023/2024 &lt; 2024/2025.'],
  'c7-g3': ['A fraction a/b simplifies to 3/5 and b − a = 12. The original fraction is:', ['18/30', '9/15', '15/25', '6/10'],
    'a = 3k and b = 5k, so b − a = 2k = 12 and k = 6. Then a = 18 and b = 30, giving the fraction 18/30 (which simplifies to 3/5).'],

  // ---------------- Chương 8
  'c8-e1': ['Which is larger, 3.45 or 3.5?', ['3.45', '3.5', 'They are equal', 'They cannot be compared'],
    'Compare tenths: 3.45 has 4 tenths and 3.5 has 5 tenths. Since 5 &gt; 4, the larger number is 3.5.'],
  'c8-e2': ['Work out 12.5 + 7.3:', ['19.8', '18.8', '20.8', '19.3'], 'Line up the decimal points: 12.5 + 7.3 = 19.8.'],
  'c8-e3': ['Round 7.86 to the nearest whole number:', ['7', '8', '7.9', '9'], 'The tenths digit is 8 (≥5), so we round up: 7.86 ≈ 8.'],
  'c8-e4': ['A book costs 45,000đ and is reduced by 20%. How much is taken off?', ['9,000đ', '900đ', '4,500đ', '90,000đ'],
    'Reduction = 45,000 × 20% = 45,000 × 0.2 = 9,000đ.'],
  'c8-m1': ['Work out 6.4 × 2.5:', ['14', '16', '15', '16.4'], '64 × 25 = 1600, and the two factors have two decimal places in total, so 6.4 × 2.5 = 16.00 = 16.'],
  'c8-m2': ['Work out 15.6 : 4:', ['3.9', '3.6', '4.1', '39'], '15.6 : 4 = 3.9.'],
  'c8-m3': ['A shirt costs 250,000đ and is reduced by 15%. The new price is:', ['235,000đ', '212,500đ', '37,500đ', '200,000đ'],
    'Reduction = 250,000 × 15% = 37,500đ, so the new price is 250,000 − 37,500 = 212,500đ.'],
  'c8-m4': ['Mai scores 8; 7.5; 9 and 8.5 in four tests. Her mean score is:', ['8', '8.25', '8.5', '33'],
    'Total = 8+7.5+9+8.5 = 33, so the mean is 33 : 4 = 8.25.'],
  'c8-h1': ['A shop buys an item for 80,000đ and sells it at a 25% profit on the cost price. The selling price is:',
    ['100,000đ', '105,000đ', '20,000đ', '90,000đ'], 'Selling price = 80,000 × (1 + 25%) = 80,000 × 1.25 = 100,000đ.'],
  'c8-h2': ['Work out: 12.5 × 4 − 6.8 : 2', ['46.6', '43.2', '50', '44.1'], '12.5×4 = 50 and 6.8:2 = 3.4, so 50 − 3.4 = 46.6.'],
  'c8-h3': ['A tank holds 850 litres of water and 32% has been used. How much is left?', ['272 litres', '578 litres', '818 litres', '600 litres'],
    'Remaining = 850 × (1 − 32%) = 850 × 0.68 = 578 litres.'],
  'c8-g1': ['A price rises by 20% and is then reduced by 20% of the new price. Compared with the original price, the final price is:',
    ['100%', '96%', '104%', '90%'], 'Final price = original × 1.2 × 0.8 = original × 0.96 = 96% of the original — not the same as before!'],
  'c8-g2': ['Someone saves 10,000,000đ at 6% simple interest per year. After 2 years the total (capital plus interest) is:',
    ['10,600,000đ', '11,200,000đ', '12,000,000đ', '10,120,000đ'],
    'Yearly interest = 10,000,000 × 6% = 600,000đ, so after 2 years the interest is 1,200,000đ and the total is 11,200,000đ.'],
  'c8-g3': ['In a class, 40% of students are top grade, 35% are good and the rest are average. If 6 students are average, how many students are in the class?',
    ['20', '24', '30', '18'], 'Average = 100% − 40% − 35% = 25%, so the class has 6 : 0.25 = 24 students.'],

  // ---------------- Chương 9
  'c9-e1': ['An angle of 75° is:', ['An acute angle', 'A right angle', 'An obtuse angle', 'A straight angle'],
    'An acute angle measures between 0° and 90°, and 75° &lt; 90°, so it is acute.'],
  'c9-e2': ['An angle of 120° is:', ['An acute angle', 'A right angle', 'An obtuse angle', 'A straight angle'],
    'An obtuse angle measures between 90° and 180°, so 120° is obtuse.'],
  'c9-e3': ['At exactly 3 o\'clock, what is the angle between the hour hand and the minute hand?', ['60°', '90°', '120°', '180°'],
    'At 3 o\'clock the minute hand points at 12 and the hour hand at 3, making a right angle of 90°.'],
  'c9-e4': ['Two railway tracks are a picture of:', ['Two intersecting lines', 'Two parallel lines', 'Two identical lines', 'A straight angle'],
    'The tracks stay the same distance apart and never meet — that is what parallel lines look like.'],
  'c9-m1': ['An angle of 130° is cut into two equal angles by its bisector. Each of them measures:', ['65°', '60°', '70°', '130°'],
    'A bisector halves the angle: 130° : 2 = 65°.'],
  'c9-m2': ['A straight angle measures:', ['90°', '100°', '180°', '360°'], 'Its two sides are opposite rays, so it measures 180°.'],
  'c9-m3': ['At exactly 6 o\'clock, what is the angle between the two hands?', ['90°', '150°', '180°', '120°'],
    'At 6 o\'clock the hands point in opposite directions, forming a straight angle of 180°.'],
  'c9-m4': ['Angle xOy = 80° and ray Oz is its bisector. Angle xOz measures:', ['20°', '40°', '80°', '160°'], 'The bisector halves the angle: 80° : 2 = 40°.'],
  'c9-h1': ['At exactly 9 o\'clock, what is the angle between the two hands?', ['270°', '90°', '45°', '180°'],
    'Each hour mark is 30°. The hands are 3 marks apart, giving 90° (we take the smaller of 90° and 270°).'],
  'c9-h2': ['Angles A and B are adjacent supplementary angles (they add to 180°). If A = 65°, then B is:', ['25°', '115°', '105°', '95°'],
    'A + B = 180°, so B = 180° − 65° = 115°.'],
  'c9-h3': ['Two parallel lines are cut by a third line. One pair of co-interior angles includes an angle of 70°. The other co-interior angle is:',
    ['70°', '110°', '20°', '90°'], 'Co-interior angles add up to 180°, so the other one is 180° − 70° = 110°.'],
  'c9-g1': ['At 3 o\'clock the two clock hands make a right angle of 90°. At 9 o\'clock they make an angle of:', ['90°', '180°', '270°', '45°'],
    'The positions at 9 o\'clock mirror those at 3 o\'clock about the 12, so the angle between the hands is again 90° (taking the smaller angle).'],
  'c9-g2': ['Rays Ox, Oy and Oz share the vertex O, with Oy between Ox and Oz. Given angle xOy = 35° and angle yOz = 40°, angle xOz is:',
    ['5°', '75°', '70°', '80°'], 'Because Oy lies between the other two rays, angle xOz = angle xOy + angle yOz = 35° + 40° = 75°.'],
  'c9-g3': ['Two complementary angles (adding to 90°) differ by 20°. The two angles are:', ['30° and 60°', '35° and 55°', '40° and 50°', '25° and 65°'],
    'Larger angle = (90°+20°):2 = 55°, so the smaller one is 90° − 55° = 35°.'],
};
