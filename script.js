const categorySelect = document.getElementById("categorySelect");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const tryAgainButton = document.getElementById("tryAgainButton");
const reviewButton = document.getElementById("reviewButton");

const startScreen = document.getElementById("startScreen");
const questionScreen = document.getElementById("questionScreen");
const resultScreen = document.getElementById("resultScreen");
const reviewSection = document.getElementById("reviewSection");

const bestScore = document.getElementById("bestScore");
const currentScore = document.getElementById("currentScore");
const questionProgress = document.getElementById("questionProgress");

const progressFill = document.getElementById("progressFill");
const questionCategory = document.getElementById("questionCategory");
const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const feedbackMessage = document.getElementById("feedbackMessage");
const nextButton = document.getElementById("nextButton");

const finalScorePercent = document.getElementById("finalScorePercent");
const finalScoreText = document.getElementById("finalScoreText");
const resultMessage = document.getElementById("resultMessage");
const reviewList = document.getElementById("reviewList");

const questions = [
  {
    category: "Phishing",
    question: "What is phishing?",
    answers: [
      "A method attackers use to trick people into revealing sensitive information",
      "A secure way to encrypt passwords",
      "A firewall setting for blocking ports",
      "A backup method for cloud storage"
    ],
    correctAnswer: "A method attackers use to trick people into revealing sensitive information"
  },
  {
    category: "Phishing",
    question: "Which email is most suspicious?",
    answers: [
      "A message asking you to verify your password through an unknown link",
      "A meeting invite from a coworker you know",
      "A receipt from a store you recently bought from",
      "A calendar reminder you created"
    ],
    correctAnswer: "A message asking you to verify your password through an unknown link"
  },
  {
    category: "Passwords",
    question: "What makes a password stronger?",
    answers: [
      "Using a long unique password or passphrase",
      "Using your birthday",
      "Using the same password everywhere",
      "Using the word password with a number"
    ],
    correctAnswer: "Using a long unique password or passphrase"
  },
  {
    category: "Passwords",
    question: "What is multi-factor authentication?",
    answers: [
      "Using more than one method to verify your identity",
      "Using two passwords that are almost the same",
      "Saving passwords in a browser only",
      "Turning off account recovery"
    ],
    correctAnswer: "Using more than one method to verify your identity"
  },
  {
    category: "Malware",
    question: "What is malware?",
    answers: [
      "Software designed to harm, disrupt, or gain unauthorized access",
      "A type of computer monitor",
      "A safe browser extension",
      "A normal operating system update"
    ],
    correctAnswer: "Software designed to harm, disrupt, or gain unauthorized access"
  },
  {
    category: "Malware",
    question: "What is ransomware?",
    answers: [
      "Malware that locks or encrypts files and demands payment",
      "A secure password manager",
      "A legal software license",
      "A type of network cable"
    ],
    correctAnswer: "Malware that locks or encrypts files and demands payment"
  },
  {
    category: "Networking",
    question: "What does a firewall help do?",
    answers: [
      "Control network traffic based on security rules",
      "Increase monitor brightness",
      "Create stronger passwords automatically",
      "Delete unused files"
    ],
    correctAnswer: "Control network traffic based on security rules"
  },
  {
    category: "Networking",
    question: "What does HTTPS indicate?",
    answers: [
      "The connection uses encryption between browser and website",
      "The website is always safe from every threat",
      "The page has no ads",
      "The website never collects data"
    ],
    correctAnswer: "The connection uses encryption between browser and website"
  },
  {
    category: "Phishing",
    question: "What should you do before clicking a link in a suspicious email?",
    answers: [
      "Verify the sender and inspect the link carefully",
      "Click quickly before it expires",
      "Forward it to everyone",
      "Download the attachment first"
    ],
    correctAnswer: "Verify the sender and inspect the link carefully"
  },
  {
    category: "Passwords",
    question: "Why should passwords be unique for each account?",
    answers: [
      "If one password is stolen, other accounts stay safer",
      "It makes accounts load faster",
      "It removes the need for updates",
      "It prevents all phishing emails"
    ],
    correctAnswer: "If one password is stolen, other accounts stay safer"
  }
];

let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];

const savedBestScore = localStorage.getItem("cyberQuizBestScore") || "0";
bestScore.textContent = `${savedBestScore}%`;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);
tryAgainButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", function () {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

reviewButton.addEventListener("click", function () {
  reviewSection.classList.toggle("hidden");
  renderReview();
});

function startQuiz() {
  const selectedCategory = categorySelect.value;

  quizQuestions = questions.filter(function (question) {
    return selectedCategory === "All" || question.category === selectedCategory;
  });

  currentQuestionIndex = 0;
  score = 0;
  selectedAnswers = [];

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  reviewSection.classList.add("hidden");
  questionScreen.classList.remove("hidden");

  currentScore.textContent = score;
  showQuestion();
}

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionCategory.textContent = currentQuestion.category;
  questionText.textContent = currentQuestion.question;
  answerButtons.innerHTML = "";
  feedbackMessage.textContent = "";
  feedbackMessage.className = "feedback-message";
  nextButton.classList.add("hidden");

  questionProgress.textContent = `${currentQuestionIndex + 1}/${quizQuestions.length}`;
  progressFill.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

  currentQuestion.answers.forEach(function (answer) {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;

    button.addEventListener("click", function () {
      selectAnswer(answer, button);
    });

    answerButtons.appendChild(button);
  });
}

function selectAnswer(selectedAnswer, selectedButton) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  if (isCorrect) {
    score++;
    currentScore.textContent = score;
    selectedButton.classList.add("correct");
    feedbackMessage.textContent = "Correct. Good work.";
    feedbackMessage.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");
    feedbackMessage.textContent = `Incorrect. Correct answer: ${currentQuestion.correctAnswer}`;
    feedbackMessage.classList.add("incorrect");
  }

  selectedAnswers.push({
    question: currentQuestion.question,
    category: currentQuestion.category,
    selectedAnswer: selectedAnswer,
    correctAnswer: currentQuestion.correctAnswer,
    isCorrect: isCorrect
  });

  document.querySelectorAll(".answer-button").forEach(function (button) {
    button.disabled = true;

    if (button.textContent === currentQuestion.correctAnswer) {
      button.classList.add("correct");
    }
  });

  nextButton.classList.remove("hidden");
}

function showResults() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const percent = Math.round((score / quizQuestions.length) * 100);

  finalScorePercent.textContent = `${percent}%`;
  finalScoreText.textContent = `You scored ${score} out of ${quizQuestions.length}.`;

  if (percent >= 80) {
    resultMessage.textContent = "Strong score. You understand the basics well.";
  } else if (percent >= 60) {
    resultMessage.textContent = "Solid start. Review the missed answers and try again.";
  } else {
    resultMessage.textContent = "Keep practicing. Cybersecurity improves with repetition.";
  }

  const currentBest = Number(localStorage.getItem("cyberQuizBestScore")) || 0;

  if (percent > currentBest) {
    localStorage.setItem("cyberQuizBestScore", percent);
    bestScore.textContent = `${percent}%`;
  }
}

function renderReview() {
  reviewList.innerHTML = "";

  selectedAnswers.forEach(function (answer, index) {
    const card = document.createElement("article");
    card.className = "review-card";

    if (!answer.isCorrect) {
      card.classList.add("incorrect");
    }

    card.innerHTML = `
      <h3>${index + 1}. ${answer.question}</h3>
      <p><strong>Category:</strong> ${answer.category}</p>
      <p><strong class="user-answer">Your Answer:</strong> ${answer.selectedAnswer}</p>
      <p><strong>Correct Answer:</strong> ${answer.correctAnswer}</p>
    `;

    reviewList.appendChild(card);
  });
}
