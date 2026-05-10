
// Initialize Lenis Smooth Scrolling (Extremely optimized)
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Sync GSAP with Lenis
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ScrollTrigger Animations for Bento Cards
document.querySelectorAll('.bento-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" },
        y: 60, opacity: 0, duration: 0.8, ease: "power3.out", delay: (i % 3) * 0.1
    });
});

// Hero Kinematic Animation
gsap.from(".movie-title", { y: 80, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.2 });
gsap.from(".hero-meta", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.4 });
gsap.from(".btn-primary-play", { y: 20, opacity: 0, duration: 1, ease: "power3.out", delay: 0.6 });

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.command-navbar');
    if(window.scrollY > 50) nav.style.background = 'rgba(10, 10, 15, 0.95)';
    else nav.style.background = 'rgba(10, 10, 15, 0.65)';
});
