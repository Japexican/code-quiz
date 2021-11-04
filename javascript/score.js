const scoreContainer = document.getElementById("score-container");
const userInitals = document.getElementById("user-initials");
const finalScore = document.getElementById("final-score");
const saveScoreBtn = document.getElementById("save-score-btn");
const currentScore = localStorage.getItem("currentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighScores = 5;

finalScore.innerText = `Your score was ${currentScore}`;

userInitals.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !userInitals.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: currentScore,
        name: userInitals.value,
    };

    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score;
    });

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("highscore.html");
};