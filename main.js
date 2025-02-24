// Drawer Menu
// Controls the navigation drawer opening and closing
const drawer = document.querySelector('.drawer-placement-start');
const openButton = document.querySelector('.open-drawer');
const closeButton = drawer.querySelector('sl-button[variant="primary"]');
const navLinks = document.querySelectorAll(".menu-flex a");

// Open the drawer when clicking the menu button
openButton.addEventListener('click', () => drawer.show());

// Close the drawer when clicking the close button
closeButton.addEventListener('click', () => drawer.hide());

// Close the drawer when clicking on a navigation link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        drawer.hide();
    });
});


// Image slider
// Controls an image slider that cycles through predefined images
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

// Function to update the image being displayed
function updateImage() {
    sliderContainer.innerHTML = `<img class="slide" src="${images[currentIndex]}" alt="">`;
}

// Function to move to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

// Function to move to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

// Event listeners for next and previous buttons
nextButton.addEventListener('click', nextImage);
prevButton.addEventListener('click', prevImage);

// Initialize the first image
updateImage();


// Dialogs
// Controls dialog pop-ups when clicking on icons
document.querySelectorAll(".icon").forEach(icon => {
    icon.addEventListener("click", () => {
        const dialogId = icon.getAttribute("data-dialog");
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.show();
        }
    });
});



// Quiz
// Handles quiz navigation, progress tracking, and results display
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

    // Function to update progress bar based on quiz progress
    function updateProgressBar() {
        progressBar.value = ((currentQuestion + 1) / questions.length) * 100;
    }

    // Function to show the current question
    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.classList.toggle("active", i === index);
            q.setAttribute("aria-hidden", i !== index);
        });

        prevBtn.disabled = index === 0;
        nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
        submitBtn.style.display = index === questions.length - 1 ? "inline-block" : "none";
        resultsScreen.style.display = "none";

        updateProgressBar();
    }

    // Move to the next question
    nextBtn.addEventListener("click", () => {
        const selectedValue = document.querySelector(".questions.active sl-radio-group")?.value;
        if (selectedValue !== undefined) {
            scores[currentQuestion] = parseInt(selectedValue) || 0;
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
            }
        } else {
            alert("Please select an answer before proceeding.");
        }
    });

    // Move to the previous question
    prevBtn.addEventListener("click", () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });

    // Calculate and display quiz results
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
    
        resultsScreen.style.display = "block";
        resultsScreen.style.opacity = "1";
        resultsScreen.style.visibility = "visible";
        
        questions.forEach(q => q.classList.remove("active"));
        submitBtn.style.display = "none";
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        
        updateProgressBar();
    });

    // Reset the quiz
    resetBtn.addEventListener("click", () => {
        currentQuestion = 0;
        scores = [];
        showQuestion(currentQuestion);
        submitBtn.style.display = "none";
        prevBtn.style.display = "inline-block";
        nextBtn.style.display = "inline-block";
        progressBar.value = 0;
    });

    showQuestion(currentQuestion);
});



//Animations
// Scroll animations using GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate elements from the right
gsap.utils.toArray(".right").forEach((element) => {
    gsap.fromTo(element, 
        { x: 700, opacity: 0 },
        { 
            x: 0, opacity: 1, duration: 1, ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 60%", 
                end: "top 40%",   
                toggleActions: "play none none reverse", 
            }
        }
    );
});

// Animate elements from the left
gsap.utils.toArray(".left").forEach((element) => {
    gsap.fromTo(element, 
        { x: -700, opacity: 0 }, 
        { 
            x: 0, opacity: 1, duration: 1, ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 60%", 
                end: "top 20%", 
                toggleActions: "play none none reverse", 
            }
        }
    );
});

// Animate elements from the bottom
gsap.utils.toArray(".up").forEach((element) => {
    gsap.fromTo(element, 
        { y: -100, opacity: 0 }, 
        { 
            y: 0, opacity: 1, duration: 1, ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%", 
                end: "top 20%", 
                toggleActions: "play none none reverse", 
            }
        }
    );
});


// Pulse effect on icons
gsap.to(".icon", {
    scale: 1.2,
    duration: 1.1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    scrollTrigger: {
        trigger: ".pulse-trigger", 
        start: "top 100%",    
        end: "bottom 10%",   
        toggleActions: "play pause resume pause"
    }
})

