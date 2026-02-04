/* ========================================
   PYTHON LESSON - JAVASCRIPT
   Interactive Tasks & Grading System
   ======================================== */

// ===== CONFIGURATION =====
// Мұғалім осы бөлімді өзгерте алады!

const LESSON_CONFIG = {
  title: "Деректер типтері",
  subject: "Python бағдарламалау",
  grade: "6-сынып",
  teacher: "Раухат Ағай",
  totalPoints: 10,

  // Тапсырмалардың дұрыс жауаптары
  // Жаңа тақырып үшін осы бөлімді өзгертіңіз
  tasks: {
    task1: {
      points: 2,
      answers: {
        1: "str", // "Астана" - жол
        2: "int", // 42 - бүтін сан
        3: "bool", // True - логикалық
        4: "float", // 3.14 - бөлшек сан
      },
    },
    task2: {
      points: 2,
      correctAnswers: ["<class 'list'>", "list", "class list", "<class list>"],
    },
    task3: {
      points: 2,
      requiredKeywords: ["=", "print"],
    },
    task4: {
      points: 2,
      answers: {
        1: "false", // "123" - str емес int
        2: "true", // bool-дың 2 мәні бар
        3: "false", // 5.0 - float
        4: "true", // list-те әртүрлі типтер болады
      },
    },
    task5: {
      points: 2,
      requiredTypes: ["int", "float", "str", "bool", "list"],
      typePatterns: {
        int: /=\s*\d+(?!\.\d)/,
        float: /=\s*\d+\.\d+/,
        str: /=\s*["'][^"']*["']/,
        bool: /=\s*(True|False)/,
        list: /=\s*\[.*\]/,
      },
    },
  },

  // Бағалау хабарламалары
  messages: {
    excellent: "Керемет! Сіз тамаша білім көрсеттіңіз! 🌟",
    good: "Жақсы! Біраз жетілдіру керек. 👍",
    average: "Орташа нәтиже. Қайта қарау керек. 📚",
    needsWork: "Көбірек жаттығу керек. Қайта оқыңыз! 💪",
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
  initConfigPanel();
  initSmoothScroll();
  updateTotalScore();
});

// ===== MOBILE MENU =====
function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
      menuBtn.textContent = nav.classList.contains("show") ? "✕" : "☰";
    });

    // Close menu on link click
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

      // Update tabs
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update panels
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

// ===== CONFIG PANEL =====
function initConfigPanel() {
  const toggle = document.getElementById("configToggle");
  const content = document.getElementById("configContent");

  if (toggle && content) {
    toggle.addEventListener("click", () => {
      content.classList.toggle("show");
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".config-panel")) {
        content.classList.remove("show");
      }
    });
  }
}

// ===== SMOOTH SCROLL =====
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

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== TASK 1: Matching Types =====
function checkTask1() {
  const config = LESSON_CONFIG.tasks.task1;
  const selects = document.querySelectorAll("#answers1 select");
  let correct = 0;

  selects.forEach((select, index) => {
    const correctAnswer = select.dataset.correct;
    const userAnswer = select.value;

    // Reset styling
    select.style.borderColor = "";
    select.style.backgroundColor = "";

    if (userAnswer === correctAnswer) {
      correct++;
      select.style.borderColor = "var(--color-success)";
      select.style.backgroundColor = "rgba(0, 184, 148, 0.1)";
    } else if (userAnswer !== "") {
      select.style.borderColor = "var(--color-error)";
      select.style.backgroundColor = "rgba(225, 112, 85, 0.1)";
    }
  });

  // Calculate score based on descriptor
  let score = 0;
  if (correct === 4) score = 2;
  else if (correct === 3) score = 1.5;
  else if (correct === 2) score = 1;
  else if (correct === 1) score = 0.5;

  scores.task1 = score;
  showTaskFeedback(
    1,
    score,
    config.points,
    `${correct}/4 типті дұрыс анықтадыңыз`,
  );
  updateTaskStatus(1, score, config.points);
  updateTotalScore();
}

// ===== TASK 2: type() Function =====
function checkTask2() {
  const config = LESSON_CONFIG.tasks.task2;
  const input = document.getElementById("answer2");
  const userAnswer = input.value.trim().toLowerCase();

  let score = 0;
  let message = "";

  // Check for full correct answer
  const isFullyCorrect = config.correctAnswers.some(
    (answer) => userAnswer === answer.toLowerCase(),
  );

  // Check for partial answer
  const isPartiallyCorrect = userAnswer === "list";

  if (isFullyCorrect) {
    score = 2;
    message = "Толық дұрыс! type() функциясын жақсы түсінесіз.";
    input.style.borderColor = "var(--color-success)";
  } else if (isPartiallyCorrect) {
    score = 1;
    message = "Дұрыс, бірақ толық жауап: <class 'list'>";
    input.style.borderColor = "var(--color-warning)";
  } else {
    score = 0;
    message = "Қате! Дұрыс жауап: <class 'list'>";
    input.style.borderColor = "var(--color-error)";
  }

  scores.task2 = score;
  showTaskFeedback(2, score, config.points, message);
  updateTaskStatus(2, score, config.points);
  updateTotalScore();
}

// ===== TASK 3: Write Code =====
function checkTask3() {
  const config = LESSON_CONFIG.tasks.task3;
  const textarea = document.getElementById("code3");
  const code = textarea.value.trim();

  let score = 0;
  let message = "";

  const hasVariable = code.includes("=") && !code.startsWith("=");
  const hasPrint =
    code.toLowerCase().includes("print(") ||
    code.toLowerCase().includes("print (");

  if (hasVariable && hasPrint) {
    score = 2;
    message = "Өте жақсы! Айнымалы құрып, оны шығардыңыз.";
    textarea.style.borderColor = "var(--color-success)";
  } else if (hasVariable || hasPrint) {
    score = 1;
    if (hasVariable) {
      message = "Жартылай дұрыс. Айнымалыны құрдыңыз, бірақ print() қосыңыз.";
    } else {
      message = "Жартылай дұрыс. print() бар, бірақ алдымен айнымалы құрыңыз.";
    }
    textarea.style.borderColor = "var(--color-warning)";
  } else {
    score = 0;
    message = "Код жоқ немесе қате. Айнымалы құрып, print() қолданыңыз.";
    textarea.style.borderColor = "var(--color-error)";
  }

  scores.task3 = score;
  showTaskFeedback(3, score, config.points, message);
  updateTaskStatus(3, score, config.points);
  updateTotalScore();
}

// ===== TASK 4: True/False =====
function checkTask4() {
  const config = LESSON_CONFIG.tasks.task4;
  const tfGroups = document.querySelectorAll(".tf-buttons");
  let correct = 0;

  tfGroups.forEach((group) => {
    const questionNum = group.dataset.question;
    const correctAnswer = config.answers[questionNum];
    const selectedBtn = group.querySelector(".tf-btn.selected");

    // Reset button styles
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
        // Highlight correct answer
        group
          .querySelector(`[data-value="${correctAnswer}"]`)
          .classList.add("correct");
      }
    }
  });

  // Calculate score based on descriptor
  let score = 0;
  if (correct === 4) score = 2;
  else if (correct === 3) score = 1.5;
  else if (correct === 2) score = 1;
  else if (correct === 1) score = 0.5;

  scores.task4 = score;
  showTaskFeedback(4, score, config.points, `${correct}/4 дұрыс жауап`);
  updateTaskStatus(4, score, config.points);
  updateTotalScore();
}

// ===== TASK 5: Creative Task =====
function checkTask5() {
  const config = LESSON_CONFIG.tasks.task5;
  const textarea = document.getElementById("code5");
  const code = textarea.value;

  let typesFound = 0;
  let foundTypes = [];

  // Check for each type
  for (const [typeName, pattern] of Object.entries(config.typePatterns)) {
    if (pattern.test(code)) {
      typesFound++;
      foundTypes.push(typeName);
    }
  }

  const hasPrint = code.toLowerCase().includes("print(");

  // Calculate score based on descriptor
  let score = 0;
  let message = "";

  if (typesFound === 5 && hasPrint) {
    score = 2;
    message = "Керемет! Барлық 5 типті қолдандыңыз және print() бар!";
    textarea.style.borderColor = "var(--color-success)";
  } else if (typesFound === 4) {
    score = 1.5;
    message = `Жақсы! ${typesFound} тип табылды: ${foundTypes.join(", ")}`;
    textarea.style.borderColor = "var(--color-warning)";
  } else if (typesFound === 3) {
    score = 1;
    message = `Орташа. ${typesFound} тип табылды: ${foundTypes.join(", ")}`;
    textarea.style.borderColor = "var(--color-warning)";
  } else if (typesFound === 2) {
    score = 0.5;
    message = `${typesFound} тип табылды. Басқа типтерді де қосыңыз!`;
    textarea.style.borderColor = "var(--color-error)";
  } else {
    score = 0;
    message = "Көбірек тип қолданыңыз. int, float, str, bool, list керек.";
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

  if (score === maxPoints) {
    feedback.classList.add("success");
  } else if (score > 0) {
    feedback.classList.add("partial");
  } else {
    feedback.classList.add("error");
  }
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

  // Update score displays
  document.getElementById("totalScore").textContent = total;
  document.getElementById("finalScore").textContent = total;

  // Update progress circle
  updateProgressCircle(total);

  // Update result message
  updateResultMessage(total);
}

function updateProgressCircle(score) {
  const circle = document.getElementById("progressCircle");
  const maxPoints = LESSON_CONFIG.totalPoints;
  const percentage = score / maxPoints;

  // Circle circumference = 2 * PI * r (r = 85)
  const circumference = 2 * Math.PI * 85;
  const offset = circumference - percentage * circumference;

  circle.style.strokeDashoffset = offset;

  // Change color based on score
  if (percentage >= 0.8) {
    circle.style.stroke = "var(--color-success)";
  } else if (percentage >= 0.5) {
    circle.style.stroke = "var(--color-warning)";
  } else if (percentage > 0) {
    circle.style.stroke = "var(--color-error)";
  } else {
    circle.style.stroke = "var(--color-primary)";
  }
}

function updateResultMessage(score) {
  const messageEl = document.getElementById("resultMessage");
  const messages = LESSON_CONFIG.messages;

  if (score >= 8) {
    messageEl.textContent = messages.excellent;
  } else if (score >= 6) {
    messageEl.textContent = messages.good;
  } else if (score >= 4) {
    messageEl.textContent = messages.average;
  } else if (score > 0) {
    messageEl.textContent = messages.needsWork;
  } else {
    messageEl.textContent = "Тапсырмаларды орындаңыз!";
  }
}

// ===== RESET FUNCTIONALITY =====
document.getElementById("resetBtn")?.addEventListener("click", resetAllTasks);

function resetAllTasks() {
  // Reset scores
  scores = {
    task1: null,
    task2: null,
    task3: null,
    task4: null,
    task5: null,
  };

  // Reset Task 1 - Selects
  document.querySelectorAll("#answers1 select").forEach((select) => {
    select.value = "";
    select.style.borderColor = "";
    select.style.backgroundColor = "";
  });

  // Reset Task 2 - Input
  const input2 = document.getElementById("answer2");
  if (input2) {
    input2.value = "";
    input2.style.borderColor = "";
  }

  // Reset Task 3 - Textarea
  const textarea3 = document.getElementById("code3");
  if (textarea3) {
    textarea3.value = "";
    textarea3.style.borderColor = "";
  }

  // Reset Task 4 - True/False buttons
  document.querySelectorAll(".tf-btn").forEach((btn) => {
    btn.classList.remove("selected", "correct", "incorrect");
  });

  // Reset Task 5 - Textarea
  const textarea5 = document.getElementById("code5");
  if (textarea5) {
    textarea5.value = "";
    textarea5.style.borderColor = "";
  }

  // Reset all task cards
  document.querySelectorAll(".task-card").forEach((card) => {
    card.classList.remove("correct", "incorrect");
  });

  // Reset all status indicators
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`status${i}`).textContent = "";
    document.getElementById(`score${i}`).textContent = "-";
    const feedback = document.getElementById(`feedback${i}`);
    feedback.classList.remove("show", "success", "partial", "error");
  }

  // Reset total score
  updateTotalScore();

  // Scroll to top of tasks
  document.getElementById("tasks")?.scrollIntoView({ behavior: "smooth" });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener("keydown", (e) => {
  // Ctrl + Enter to check current focused task
  if (e.ctrlKey && e.key === "Enter") {
    const activeElement = document.activeElement;

    if (activeElement.closest("#task1")) checkTask1();
    else if (activeElement.closest("#task2")) checkTask2();
    else if (activeElement.closest("#task3")) checkTask3();
    else if (activeElement.closest("#task4")) checkTask4();
    else if (activeElement.closest("#task5")) checkTask5();
  }
});

// ===== UTILITY: Auto-save to localStorage =====
function saveProgress() {
  const progress = {
    scores: scores,
    task2Answer: document.getElementById("answer2")?.value || "",
    task3Code: document.getElementById("code3")?.value || "",
    task5Code: document.getElementById("code5")?.value || "",
  };
  localStorage.setItem("pythonLessonProgress", JSON.stringify(progress));
}

function loadProgress() {
  const saved = localStorage.getItem("pythonLessonProgress");
  if (saved) {
    try {
      const progress = JSON.parse(saved);

      const input2 = document.getElementById("answer2");
      if (input2 && progress.task2Answer) {
        input2.value = progress.task2Answer;
      }

      const textarea3 = document.getElementById("code3");
      if (textarea3 && progress.task3Code) {
        textarea3.value = progress.task3Code;
      }

      const textarea5 = document.getElementById("code5");
      if (textarea5 && progress.task5Code) {
        textarea5.value = progress.task5Code;
      }
    } catch (e) {
      console.log("Could not load saved progress");
    }
  }
}

// Auto-save on input changes
document.querySelectorAll("input, textarea, select").forEach((el) => {
  el.addEventListener("change", saveProgress);
  el.addEventListener("input", saveProgress);
});

// Load progress on page load
document.addEventListener("DOMContentLoaded", loadProgress);

/* ========================================
   TEACHER INSTRUCTIONS / МҰҒАЛІМГЕ НҰСҚАУ
   ========================================
   
   Жаңа тақырып үшін тапсырмаларды өзгерту:
   
   1. LESSON_CONFIG объектісін өзгертіңіз:
      - title: Тақырып атауы
      - tasks: Әр тапсырманың дұрыс жауаптары
   
   2. HTML файлында:
      - Тапсырма мәтінін өзгертіңіз
      - data-correct атрибуттарын жаңартыңыз
   
   3. Жаңа тапсырма түрлері үшін:
      - checkTask[N]() функциясын жазыңыз
      - scores объектісіне қосыңыз
   
   Мысал - жаңа тақырып қосу:
   
   LESSON_CONFIG.tasks.taskNew = {
       points: 2,
       correctAnswer: "дұрыс жауап"
   };
   
   function checkTaskNew() {
       // Тексеру логикасы
   }
   
   ======================================== */
