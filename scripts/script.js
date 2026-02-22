
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