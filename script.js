// قاعدة بيانات الأسئلة (يمكنك إضافة المزيد هنا)
const questions = [
    {
        question: "ما هي عاصمة المملكة العربية السعودية؟",
        options: ["جدة", "الرياض", "مكة المكرمة", "الدمام"],
        answer: 1, // الإجابة الصحيحة هي الثانية (فهرس 1)
        prize: 100
    },
    {
        question: "كم عدد القارات في العالم؟",
        options: ["5", "6", "7", "8"],
        answer: 2, // الإجابة الصحيحة هي الثالثة (فهرس 2) - آسيا، أفريقيا، أمريكا ش، أمريكا ج، أنتاركتيكا، أوروبا، أستراليا
        prize: 500
    },
    {
        question: "أي من هذه الكواكب هو الأقرب للشمس؟",
        options: ["الزهرة", "الأرض", "عطارد", "المريخ"],
        answer: 2,
        prize: 1000
    },
    {
        question: "من هو مؤلف 'البؤساء'؟",
        options: ["فيكتور هوغو", "تشارلز ديكنز", "وليام شكسبير", "نجيب محفوظ"],
        answer: 0,
        prize: 5000
    },
    {
        question: "ما هو العنصر الكيميائي الذي رمزه O؟",
        options: ["الذهب", "الفضة", "الأكسجين", "الحديد"],
        answer: 2,
        prize: 10000
    }
    // يمكنك نسخ ولصق المزيد من الأسئلة هنا بنفس التنسيق
];

let currentQuestionIndex = 0;
let currentPrizeMoney = 0;
let isAnsweringLocked = false; // لمنع الضغط المتكرر

// عناصر HTML التي سنتحكم بها
const questionTextBtn = document.getElementById('question-text');
const prizeMoneyDisplay = document.getElementById('prize-money');
const nextPrizeDisplay = document.getElementById('next-prize');
const gameArea = document.getElementById('game-area');
const endScreen = document.getElementById('end-screen');
const finalScoreDisplay = document.getElementById('final-score');
const optionBtns = [
    document.getElementById('opt0'),
    document.getElementById('opt1'),
    document.getElementById('opt2'),
    document.getElementById('opt3')
];

// بدء اللعبة
function startGame() {
    currentQuestionIndex = 0;
    currentPrizeMoney = 0;
    isAnsweringLocked = false;
    prizeMoneyDisplay.innerText = 0;
    endScreen.classList.add('hidden');
    gameArea.classList.remove('hidden');
    showQuestion();
}

// عرض السؤال الحالي
function showQuestion() {
    resetButtons();
    let q = questions[currentQuestionIndex];
    questionTextBtn.innerText = q.question;
    nextPrizeDisplay.innerText = q.prize;
    
    for(let i=0; i<4; i++) {
        optionBtns[i].innerText = q.options[i];
    }
    isAnsweringLocked = false;
}

// إعادة ضبط ألوان الأزرار
function resetButtons() {
    const btns = document.querySelectorAll('.answer-btn');
    btns.forEach(btn => {
        btn.classList.remove('correct', 'wrong');
    });
}

// التحقق من الإجابة
function checkAnswer(selectedIndex) {
    if (isAnsweringLocked) return;
    isAnsweringLocked = true;

    const correctIndex = questions[currentQuestionIndex].answer;
    const btns = document.querySelectorAll('.answer-btn');

    if (selectedIndex === correctIndex) {
        // إجابة صحيحة
        btns[selectedIndex].classList.add('correct');
        currentPrizeMoney = questions[currentQuestionIndex].prize;
        prizeMoneyDisplay.innerText = currentPrizeMoney;

        // الانتقال للسؤال التالي بعد ثانية
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                endGame("مبروك! لقد أنهيت جميع الأسئلة.");
            }
        }, 1500);

    } else {
        // إجابة خاطئة
        btns[selectedIndex].classList.add('wrong');
        btns[correctIndex].classList.add('correct'); // إظهار الإجابة الصحيحة
        setTimeout(() => {
            endGame("للأسف، إجابة خاطئة.");
        }, 1500);
    }
}

// إنهاء اللعبة
function endGame(message) {
    gameArea.classList.add('hidden');
    endScreen.classList.remove('hidden');
    document.getElementById('end-message').innerText = message;
    finalScoreDisplay.innerText = currentPrizeMoney;
}

// تشغيل اللعبة عند تحميل الصفحة
startGame();
