document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("themeToggle");
    button.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const lightElements = document.querySelectorAll(".light");
        lightElements.forEach(el => {
            el.classList.toggle("active");
        });

        console.log("Theme toggled");
    });
});

const sections = document.querySelector(".section-container");
const navbar = document.querySelector(".navbar");
const themebutton = document.querySelector(".theme-button");

let lastScroll = 0;

sections.addEventListener("scroll", () => {
    const currentScroll = sections.scrollTop;

    if (currentScroll > lastScroll) {
        navbar.classList.add("navbar-hidden");
    } else {
        navbar.classList.remove("navbar-hidden");
    }

    lastScroll = currentScroll;
});

document.querySelectorAll('.section-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const sky = document.querySelector(".sky");
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        // Random position
        star.style.top = Math.random() * window.innerHeight + "px";
        star.style.left = Math.random() * window.innerWidth + "px";

        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";

        // Random animation duration
        star.style.animationDuration = (Math.random() * 3 + 2) + "s";

        sky.appendChild(star);
    }
});