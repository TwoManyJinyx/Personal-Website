document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle
    const button = document.getElementById("themeToggle");
    button.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        document.querySelectorAll(".light").forEach(el => {
            el.classList.toggle("active");
        });
    });

    // Stars
    const sky = document.querySelector(".sky");
    if (sky) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.top = Math.random() * window.innerHeight + "px";
            star.style.left = Math.random() * window.innerWidth + "px";
            const size = Math.random() * 3 + 1;
            star.style.width = size + "px";
            star.style.height = size + "px";
            star.style.animationDuration = (Math.random() * 3 + 2) + "s";
            sky.appendChild(star);
        }
    }

    // Smooth scroll buttons
    document.querySelectorAll('.section-button').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                sections.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
            }
        });
    });
});

// Navbar hide on scroll
const sections = document.querySelector(".section-container");
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

sections.addEventListener("scroll", () => {
    const currentScroll = sections.scrollTop;
    if (currentScroll > lastScroll && currentScroll > 50) {
        navbar.classList.add("navbar-hidden");
    } else {
        navbar.classList.remove("navbar-hidden");
    }
    lastScroll = currentScroll;
});

window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    const navbar = document.querySelector('.navbar');

    setTimeout(() => {
        splash.classList.add('hidden');
        setTimeout(() => {
            navbar.classList.remove('navbar-pre-splash');
            navbar.classList.remove('navbar-hidden'); // force visible
            navbar.style.top = '0';                  // hard reset position
        }, 500);
    }, 2000);
});





// scribble animation for the background
const canvas = document.getElementById('scribble');
const ctx = canvas.getContext('2d');

const dpr = window.devicePixelRatio || 1;
const W = window.innerWidth;
const H = window.innerHeight;
canvas.width = W * dpr;
canvas.height = H * dpr;
canvas.style.width = W + 'px';
canvas.style.height = H + 'px';
ctx.scale(dpr, dpr);

let x = W / 2;
let y = H / 2;
let angle = Math.random() * Math.PI * 2;
let hue = 0;
let stepsTilTurn = 0;
let turnAmount = 0;
let speed = 1.5;
let targetSpeed = 1.5;
let speedChangeTick = 0;

function newTurn() {
    stepsTilTurn = Math.floor(40 + Math.random() * 120);
    turnAmount = (Math.random() - 0.5) * 4.0;
}
function newSpeed() {
    targetSpeed = 0.5 + Math.random() * 5.5;
    speedChangeTick = Math.floor(60 + Math.random() * 180);
}
newTurn();
newSpeed();

function loop() {
    speedChangeTick--;
    if (speedChangeTick <= 0) newSpeed();
    speed += (targetSpeed - speed) * 0.02;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(8,8,8,0.009)';
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';

    const steps = Math.max(1, Math.round(speed * 2));
    for (let i = 0; i < steps; i++) {
        if (stepsTilTurn <= 0) newTurn();
        stepsTilTurn--;

        const cx = W / 2;
        const cy = H / 2;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angleToCenter = Math.atan2(-dy, -dx);
        const angleDiff = ((angleToCenter - angle + Math.PI) % (Math.PI * 2)) - Math.PI;
        const centerPull = (dist / (Math.min(W, H) * 0.5)) * 0.06;
        angle += angleDiff * centerPull;
        angle += turnAmount * 0.05 + (Math.random() - 0.5) * 0.08;

        const maxDist = Math.min(W, H) * 0.45;
        if (dist > maxDist) {
            angle = angleToCenter + (Math.random() - 0.5) * 1.2;
            newTurn();
        }

        const px = x;
        const py = y;
        x += Math.cos(angle) * speed;
        y += Math.sin(angle) * speed;

        hue = (hue + 0.3) % 360;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    requestAnimationFrame(loop);
}
loop();