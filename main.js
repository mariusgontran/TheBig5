//Drawer Menu
const drawer = document.querySelector('.drawer-placement-start');
const openButton = document.querySelector('.open-drawer');
const closeButton = drawer.querySelector('sl-button[variant="primary"]');

openButton.addEventListener('click', () => drawer.show());
closeButton.addEventListener('click', () => drawer.hide());


//Image slider
const sliderContainer = document.querySelector('.intro-img');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

const images = [
    'images/img/pexels-a-darmel-8153907.jpg',
    'images/img/pexels-dmitrii-eremin-67499966-15741251.jpg',
    'images/img/pexels-pavel-danilyuk-7937997.jpg',
    'images/img/pexels-rdne-4920902.jpg'
];

let currentIndex = 0;

function updateImage() {
    sliderContainer.innerHTML = `<img class="slide" src="${images[currentIndex]}" alt="">`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

nextButton.addEventListener('click', nextImage);
prevButton.addEventListener('click', prevImage);

updateImage();




//Quiz
document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll(".questions");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const submitBtn = document.getElementById("submit-btn");
    const resetBtn = document.getElementById("reset-btn");
    const resultsScreen = document.getElementById("results-screen");
    const resultsMessage = document.getElementById("results-message");
    const progressBar = document.getElementById("progress-bar");

    let currentQuestion = 0;
    let scores = [];

    function updateProgressBar() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.value = progress;
    }

    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.classList.toggle("active", i === index);
        });

        prevBtn.disabled = index === 0;
        nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
        submitBtn.style.display = index === questions.length - 1 ? "inline-block" : "none";
        resultsScreen.style.display = "none";

        updateProgressBar();
    }

    nextBtn.addEventListener("click", () => {
        const selectedValue = document.querySelector(".questions.active sl-radio-group")?.value;
        if (selectedValue) {
            scores[currentQuestion] = parseInt(selectedValue);
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
            }
        } else {
            alert("Please select an answer before proceeding.");
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });

    submitBtn.addEventListener("click", () => {
        const totalScore = scores.reduce((a, b) => a + b, 0);
        let message;

        if (totalScore <= 15) {
            message = "Great job! You are actively engaging in The Big 5 and supporting your mental well-being.";
        } else if (totalScore <= 30) {
            message = "You're doing well, but there may be areas to focus on to improve your mental health.";
        } else {
            message = "You may benefit from engaging more with The Big 5 to support your well-being.";
        }

        resultsMessage.textContent = message;
        questions.forEach(q => q.classList.remove("active"));
        resultsScreen.style.display = "block";
        submitBtn.style.display = "none";
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        updateProgressBar();
    });

    resetBtn.addEventListener("click", () => {
        currentQuestion = 0;
        scores = [];
        showQuestion(currentQuestion);
        submitBtn.style.display = "none";
        prevBtn.style.display = "inline-block";
        nextBtn.style.display = "inline-block";
    });

    showQuestion(currentQuestion);
});
