// Particle effect on project card hover (lightweight)
// Also handles scroll reveal animations

document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal setup
    const revealElements = document.querySelectorAll('.project-card, .skill-card, .hero-content, .cta-button');
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // only once
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => observer.observe(el));

    // Optional: Mouse move glow effect on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hero.style.setProperty('--mouse-x', `${x}px`);
            hero.style.setProperty('--mouse-y', `${y}px`);
        });
    }
});

// Add a floating particle on card hover (simple)
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${e.offsetX}px`;
            particle.style.top = `${e.offsetY}px`;
            particle.style.width = `${Math.random() * 6 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = `hsl(${Math.random() * 60 + 200}, 100%, 60%)`;
            particle.style.position = 'absolute';
            particle.style.pointerEvents = 'none';
            particle.style.borderRadius = '50%';
            particle.style.zIndex = '9999';
            particle.style.animation = `particleFade ${Math.random() * 0.8 + 0.5}s ease-out forwards`;
            card.style.position = 'relative';
            card.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }
    });
});

// Add keyframes for particle animation dynamically
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes particleFade {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -30 - 10}px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);