
// 1. LENIS SMOOTH SCROLLING
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// 2. MAGNETIC CURSOR ENGINE (Only on desktop)
if (window.matchMedia("(pointer: fine)").matches) {
    const dot = document.querySelector('.custom-cursor-dot');
    const ring = document.querySelector('.custom-cursor-ring');
    const setXDot = gsap.quickSetter(dot, "x", "px");
    const setYDot = gsap.quickSetter(dot, "y", "px");
    const setXRing = gsap.quickSetter(ring, "x", "px");
    const setYRing = gsap.quickSetter(ring, "y", "px");
    
    let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
    let posRing = { x: window.innerWidth/2, y: window.innerHeight/2 };
    
    window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; setXDot(mouse.x); setYDot(mouse.y); });
    
    gsap.ticker.add(() => {
        posRing.x += (mouse.x - posRing.x) * 0.15;
        posRing.y += (mouse.y - posRing.y) * 0.15;
        setXRing(posRing.x); setYRing(posRing.y);
    });

    document.querySelectorAll('.btn-primary-play, .menu-link').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('magnetic-active'));
        el.addEventListener('mouseleave', () => ring.classList.remove('magnetic-active'));
    });
}

// 3. NAVBAR GLASSMORPHISM SCROLL
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if(nav) { window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled'); }
});

// 4. MEGA MENU HOVER INTENT
document.querySelectorAll('.has-mega-menu').forEach(item => {
    let enterTimer, exitTimer;
    const megaMenu = item.querySelector('.mega-menu');
    item.addEventListener('mouseenter', () => {
        clearTimeout(exitTimer);
        enterTimer = setTimeout(() => { gsap.to(megaMenu, {autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out"}); }, 200);
    });
    item.addEventListener('mouseleave', () => {
        clearTimeout(enterTimer);
        exitTimer = setTimeout(() => { gsap.to(megaMenu, {autoAlpha: 0, y: 15, duration: 0.2}); }, 150);
    });
});

// 5. SWIPER INITIALIZATION & GSAP STAGGER
if (document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
        effect: 'fade', autoplay: { delay: 6000 },
        on: {
            slideChangeTransitionStart: function () {
                const slide = this.slides[this.activeIndex];
                gsap.fromTo(slide.querySelector('.movie-title'), {y: 100, opacity: 0}, {y: 0, opacity: 1, duration: 1, ease: "power4.out"});
                gsap.fromTo(slide.querySelectorAll('.stagger-target'), {y: 50, opacity: 0}, {y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2});
            }
        }
    });
}

if (document.querySelector('.bento-swiper')) {
    new Swiper('.bento-swiper', {
        slidesPerView: 1.2, spaceBetween: 20, freeMode: true,
        breakpoints: { 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 4.2 }, 1440: { slidesPerView: 5.2 } }
    });
}
