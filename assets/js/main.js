
// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// 1. LENIS SMOOTH SCROLL (God Level Scrolling)
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
gsap.ticker.lagSmoothing(0);

// 2. MAGNETIC CUSTOM CURSOR (Only on Desktop)
if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = document.querySelector('.custom-cursor');
    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");
    
    window.addEventListener('mousemove', (e) => {
        setX(e.clientX); setY(e.clientY);
    });

    // Magnetic logic for buttons
    document.querySelectorAll('.btn-primary-play, .bento-card, .btn-login-neon').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('magnetic-active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('magnetic-active'));
    });
}

// 3. NAVBAR GLASSMORPHISM SCROLL
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.command-navbar');
    if(window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// 4. SWIPER HERO INITIALIZATION & GSAP TEXT REVEAL
if(document.querySelector('.hero-swiper')) {
    const swiper = new Swiper('.hero-swiper', {
        effect: 'fade', autoplay: { delay: 6000, disableOnInteraction: false },
        on: {
            slideChangeTransitionStart: function () {
                const activeSlide = this.slides[this.activeIndex];
                gsap.fromTo(activeSlide.querySelectorAll('.movie-title'), 
                    {y: 50, opacity: 0}, {y: 0, opacity: 1, duration: 1, ease: "power4.out"});
                gsap.fromTo(activeSlide.querySelectorAll('.metadata-row, .btn-primary-play'), 
                    {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.3});
            }
        }
    });
}

// 5. BENTO GRID SCROLLTRIGGER REVEAL
gsap.utils.toArray('.bento-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 90%" },
        y: 60, opacity: 0, duration: 0.8, ease: "power3.out"
    });
});
