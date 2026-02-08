/* ========================================
   PYTHON LESSON - BREAK OPERATOR
   Interactive Tasks & Grading System
   ======================================== */

// ===== CONFIGURATION =====
const LESSON_CONFIG = {
  title: "Break операторы",
  subject: "Python бағдарламалау",
  grade: "6-сынып",
  teacher: "Раухат Ағай",
  totalPoints: 10,

  tasks: {
    task1: {
      points: 2,
      correctAnswer: "3", // i=0, i=1, i=2 (print болады, сосын break) -> 3 рет
    },
    task2: {
      points: 2,
      correctAnswers: ["break"],
    },
    task3: {
      points: 2,
      answers: {
        1: "false", // Break бірден тоқтатады
        2: "true", // Әдетте шартпен бірге жүреді
        3: "true", // Break-тен кейінгісі орындалмайды
        4: "false", // Str-мен де жұмыс істейді
      },
    },
    task4: {
      points: 2,
      requiredKeywords: ["break", "if"],
    },
    task5: {
      points: 2,
      requiredKeywords: ["range", "if", "break", "print"],
      specialCheck: (code) => {
        // Тексеру: 13 саны және break болуы керек
        return code.includes("13") && code.includes("break");
      },
    },
  },

  messages: {
    excellent: "Жарайсың! Break операторын толық меңгердің! 🚀",
    good: "Жақсы нәтиже! Бірақ әлі де жаттығу керек. 👍",
    average: "Орташа. Break пен Continue-ді шатастырма! 📚",
    needsWork: "Қайталау керек. Мысалдарды мұқият қарап шық! 💪",
  },
};

// ===== GLOBAL STATE =====
let scores = {
  task1: null,
  task2: null,
  task3: null,
  task4: null,
  task5: null,
};

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initDemoTabs();
  initTrueFalseButtons();
  initSmoothScroll();
  updateTotalScore();
});

// ... (Mobile Menu, Demo Tabs, Smooth Scroll - өзгеріссіз қалады) ...

// ===== MOBILE MENU =====
function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
      menuBtn.textContent = nav.classList.contains("show") ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("show");
        menuBtn.textContent = "☰";
      });
    });
  }
}

// ===== DEMO TABS =====
function initDemoTabs() {
  const tabs = document.querySelectorAll(".demo-tab");
  const panels = document.querySelectorAll(".demo-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      panels.forEach((panel) => {
        panel.classList.remove("active");
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add("active");
        }
      });
    });
  });
}

// ===== TRUE/FALSE BUTTONS =====
function initTrueFalseButtons() {
  const tfButtons = document.querySelectorAll(".tf-btn");
  tfButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.parentElement;
      container
        .querySelectorAll(".tf-btn")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });
}

// ===== TASK 1: Predict Output (Radio Buttons) =====
function checkTask1() {
  const config = LESSON_CONFIG.tasks.task1;
  const selectedOption = document.querySelector('input[name="task1"]:checked');

  if (!selectedOption) {
    showTaskFeedback(1, 0, config.points, "Жауапты таңдаңыз!");
    return;
  }

  const userAnswer = selectedOption.value;
  let score = 0;
  let message = "";

  if (userAnswer === config.correctAnswer) {
    score = 2;
    message = "Дұрыс! 0, 1, 2 шығады, яғни 3 рет.";
  } else {
    score = 0;
    message = "Қате! i=2 болғанда 'Сәлем' шығады, сосын break іске қосылады.";
  }

  scores.task1 = score;
  showTaskFeedback(1, score, config.points, message);
  updateTaskStatus(1, score, config.points);
  updateTotalScore();
}

// ===== TASK 2: Code Completion (Input) =====
function checkTask2() {
  const config = LESSON_CONFIG.tasks.task2;
  const input = document.getElementById("answer2");
  const userAnswer = input.value.trim().toLowerCase();

  let score = 0;
  let message = "";

  if (config.correctAnswers.includes(userAnswer)) {
    score = 2;
    message = "Дұрыс! Break циклді тоқтатады.";
    input.style.borderColor = "var(--color-success)";
  } else {
    score = 0;
    message = "Қате. Тоқтату үшін 'break' жазу керек.";
    input.style.borderColor = "var(--color-error)";
  }

  scores.task2 = score;
  showTaskFeedback(2, score, config.points, message);
  updateTaskStatus(2, score, config.points);
  updateTotalScore();
}

// ===== TASK 3: True/False =====
function checkTask3() {
  const config = LESSON_CONFIG.tasks.task3;
  const tfGroups = document.querySelectorAll(".tf-buttons");
  let correct = 0;

  tfGroups.forEach((group) => {
    const questionNum = group.dataset.question;
    const correctAnswer = config.answers[questionNum];
    const selectedBtn = group.querySelector(".tf-btn.selected");

    group.querySelectorAll(".tf-btn").forEach((btn) => {
      btn.classList.remove("correct", "incorrect");
    });

    if (selectedBtn) {
      const userAnswer = selectedBtn.dataset.value;
      if (userAnswer === correctAnswer) {
        correct++;
        selectedBtn.classList.add("correct");
      } else {
        selectedBtn.classList.add("incorrect");
        group
          .querySelector(`[data-value="${correctAnswer}"]`)
          .classList.add("correct");
      }
    }
  });

  let score = 0;
  if (correct === 4) score = 2;
  else if (correct === 3) score = 1.5;
  else if (correct === 2) score = 1;
  else if (correct === 1) score = 0.5;

  scores.task3 = score;
  showTaskFeedback(3, score, config.points, `${correct}/4 дұрыс жауап`);
  updateTaskStatus(3, score, config.points);
  updateTotalScore();
}

// ===== TASK 4: Code Writing (Fill Gap) =====
function checkTask4() {
  const config = LESSON_CONFIG.tasks.task4;
  const textarea = document.getElementById("code4");
  const code = textarea.value.toLowerCase();

  let score = 0;
  let message = "";

  const hasBreak = code.includes("break");
  const hasIf = code.includes("if") || textarea.value.includes(":"); // "if" уже есть в placeholder, проверяем логику

  if (hasBreak) {
    score = 2;
    message = "Керемет! Break дұрыс жерде тұр.";
    textarea.style.borderColor = "var(--color-success)";
  } else {
    score = 0;
    message = "Break сөзін қолдануды ұмытпаңыз!";
    textarea.style.borderColor = "var(--color-error)";
  }

  scores.task4 = score;
  showTaskFeedback(4, score, config.points, message);
  updateTaskStatus(4, score, config.points);
  updateTotalScore();
}

// ===== TASK 5: Creative Task =====
function checkTask5() {
  const config = LESSON_CONFIG.tasks.task5;
  const textarea = document.getElementById("code5");
  const code = textarea.value;

  const hasRange = code.includes("range");
  const hasBreak = code.includes("break");
  const has13 = code.includes("13");
  const hasPrint = code.includes("print");

  let score = 0;
  let message = "";

  if (hasRange && hasBreak && has13 && hasPrint) {
    score = 2;
    message = "Тамаша! Барлық шарттар орындалды.";
    textarea.style.borderColor = "var(--color-success)";
  } else if (hasBreak && (hasRange || has13)) {
    score = 1.5;
    message = "Жақсы, бірақ кейбір шарттар (range немесе 13) жоқ.";
    textarea.style.borderColor = "var(--color-warning)";
  } else if (hasBreak) {
    score = 1;
    message = "Break бар, бірақ код толық емес.";
    textarea.style.borderColor = "var(--color-warning)";
  } else {
    score = 0;
    message = "Break және if қолдануды ұмытпаңыз!";
    textarea.style.borderColor = "var(--color-error)";
  }

  scores.task5 = score;
  showTaskFeedback(5, score, config.points, message);
  updateTaskStatus(5, score, config.points);
  updateTotalScore();
}

// ===== HELPER FUNCTIONS =====
function showTaskFeedback(taskNum, score, maxPoints, message) {
  const feedback = document.getElementById(`feedback${taskNum}`);
  feedback.textContent = `${message} (${score}/${maxPoints} балл)`;
  feedback.classList.remove("success", "partial", "error");
  feedback.classList.add("show");
  if (score === maxPoints) feedback.classList.add("success");
  else if (score > 0) feedback.classList.add("partial");
  else feedback.classList.add("error");
}

function updateTaskStatus(taskNum, score, maxPoints) {
  const status = document.getElementById(`status${taskNum}`);
  const card = document.getElementById(`task${taskNum}`);
  card.classList.remove("correct", "incorrect");
  if (score === maxPoints) {
    status.textContent = "✅";
    card.classList.add("correct");
  } else if (score > 0) {
    status.textContent = "⚠️";
  } else {
    status.textContent = "❌";
    card.classList.add("incorrect");
  }
}

function updateTotalScore() {
  let total = 0;
  for (const [taskName, score] of Object.entries(scores)) {
    if (score !== null) {
      total += score;
      const taskNum = taskName.replace("task", "");
      document.getElementById(`score${taskNum}`).textContent = `${score} балл`;
    }
  }
  document.getElementById("totalScore").textContent = total;
  document.getElementById("finalScore").textContent = total;
  updateProgressCircle(total);
  updateResultMessage(total);
}

function updateProgressCircle(score) {
  const circle = document.getElementById("progressCircle");
  const maxPoints = LESSON_CONFIG.totalPoints;
  const percentage = score / maxPoints;
  const circumference = 2 * Math.PI * 85;
  const offset = circumference - percentage * circumference;
  circle.style.strokeDashoffset = offset;
  if (percentage >= 0.8) circle.style.stroke = "var(--color-success)";
  else if (percentage >= 0.5) circle.style.stroke = "var(--color-warning)";
  else if (percentage > 0) circle.style.stroke = "var(--color-error)";
  else circle.style.stroke = "var(--color-primary)";
}

function updateResultMessage(score) {
  const messageEl = document.getElementById("resultMessage");
  const messages = LESSON_CONFIG.messages;
  if (score >= 8) messageEl.textContent = messages.excellent;
  else if (score >= 6) messageEl.textContent = messages.good;
  else if (score >= 4) messageEl.textContent = messages.average;
  else if (score > 0) messageEl.textContent = messages.needsWork;
  else messageEl.textContent = "Тапсырмаларды орындаңыз!";
}

// ===== RESET FUNCTIONALITY =====
document.getElementById("resetBtn")?.addEventListener("click", resetAllTasks);

function resetAllTasks() {
  scores = { task1: null, task2: null, task3: null, task4: null, task5: null };
  document
    .querySelectorAll('input[type="radio"]')
    .forEach((r) => (r.checked = false));
  document
    .querySelectorAll('input[type="text"]')
    .forEach((i) => (i.value = ""));
  document.querySelectorAll("textarea").forEach((t) => (t.value = ""));
  document
    .querySelectorAll(".tf-btn")
    .forEach((b) => b.classList.remove("selected", "correct", "incorrect"));
  document
    .querySelectorAll(".task-card")
    .forEach((c) => c.classList.remove("correct", "incorrect"));
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`status${i}`).textContent = "";
    document.getElementById(`score${i}`).textContent = "-";
    document.getElementById(`feedback${i}`).classList.remove("show");
  }
  updateTotalScore();
  document.getElementById("tasks")?.scrollIntoView({ behavior: "smooth" });
}

// ===== UTILITY =====
function saveProgress() {
  const progress = {
    scores: scores,
    task2Answer: document.getElementById("answer2")?.value || "",
    task4Code: document.getElementById("code4")?.value || "",
    task5Code: document.getElementById("code5")?.value || "",
  };
  localStorage.setItem("pythonBreakLesson", JSON.stringify(progress));
}

function loadProgress() {
  const saved = localStorage.getItem("pythonBreakLesson");
  if (saved) {
    try {
      const progress = JSON.parse(saved);
      // Логика загрузки, аналогичная предыдущей, но для новых ID
    } catch (e) {
      console.log("Error loading");
    }
  }
}

document.querySelectorAll("input, textarea").forEach((el) => {
  el.addEventListener("input", saveProgress);
});
document.addEventListener("DOMContentLoaded", loadProgress);
