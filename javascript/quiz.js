var highScore = 0;
var timeLeft = 50;
var timerInterval;
var correct;
var randomizeQuestions, currentQuestionIndex;
var score;
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer-nav");
var questionNumber = document.getElementById("question-number");

const quizQuestions = [
    {
        question: "Inside which element do we put the JavaScript?",
        answers: [
            { text: "<script>", correctAnswer: true },
            { text: "<js>", correctAnswer: false },
            { text: "<scripting>", correctAnswer: false },
            { text: "<javascript>", correctAnswer: false },
        ],
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: [
            { text: "+", correctAnswer: false },
            { text: "x", correctAnswer: false },
            { text: "-", correctAnswer: false },
            { text: "=", correctAnswer: true },
        ],
    },
    {
        question: "What is the state a button is in when it is clicked",
        answers: [
            { text: "hover", correctAnswer: false },
            { text: "active", correctAnswer: true },
            { text: "visited", correctAnswer: false },
            { text: "click", correctAnswer: false },
        ],
    },
    {
        question: "JavaScript is case sensitive.",
        answers: [
            { text: "true", correctAnswer: true },
            { text: "false", correctAnswer: false },
        ],
    },
    {
        question:
            "Which of these is used to make sure your JavaScript code is following proper syntax?",
        answers: [
            { text: "Express", correctAnswer: false },
            { text: "TypeScript", correctAnswer: false },
            { text: "EsLint", correctAnswer: true },
            { text: "Handlebars.js", correctAnswer: false },
        ],
    },
];

startQuiz();

function startQuiz() {
    randomizeQuestions = quizQuestions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    displayCurrentQuestion(randomizeQuestions[currentQuestionIndex]);
    setTimeClock();
}

function displayCurrentQuestion(question) {
    // this checks to see if the quiz is over and then stores the current score in mostRecentScore value
    if (timeLeft <= 0 || currentQuestionIndex >= randomizeQuestions.length) {
        score = timeLeft;
        localStorage.setItem("currentScore", score);

        return window.location.assign("score.html");
    }
    // sets the question text in the HTML
    questionElement.innerText = question.question;
    currentQuestionIndex++;
    // displays question number at the top
    questionNumber.textContent = `Question ${currentQuestionIndex} of ${randomizeQuestions.length}`;
    // this creates a button element for each answer
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn", "btn-primary", "btn-lg", "mr-2", "mb-2");
        // sets the dataset for the button if its the correct answer
        if (answer.correctAnswer) {
            button.dataset.correct = answer.correct;
        }
        // targets button and sends to answerSelect function
        button.addEventListener("click", answerSelect);
        answerButtonsElement.appendChild(button);
    });
}

function answerSelect(e) {
    const selectedAnswer = e.target;
    // this will set correct to true or false
    correct = selectedAnswer.dataset.correct;
    classToApply(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        classToApply(button, button.dataset.correct);
    });
    if (!correct) {
        timeLeft -= 5;
    }
    resetClass();
}

// call this to remove the set class
function resetClass() {
    setTimeout(function () {
        // this loops until all button children are removed
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
        clearClass(document.body);
        // call displayCurrentQuestion
        displayCurrentQuestion(randomizeQuestions[currentQuestionIndex]);
    }, 1000);
}

function classToApply(element, correct) {
    // take and element in and set classes based on true or false

    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("incorrect");
    }
}
function clearClass(element) {
    // remove the correct or incorrect class
    element.classList.remove("correct");
    element.classList.remove("incorrect");
}

function setTimeClock() {
    // set interval for timer
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = "Timer " + "00:" + timeLeft;
        if (timeLeft < 10) {
            timerElement.textContent = "Timer " + "00:" + "0" + timeLeft;
        }
        if (timeLeft <= 0) {
            timerElement.textContent = "Timer " + "00:00";
            clearInterval(timerInterval);
        }
    }, 1000);
}
