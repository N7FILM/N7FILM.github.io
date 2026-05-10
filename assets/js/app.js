
document.addEventListener('DOMContentLoaded', () => {
    // 1. LENIS SMOOTH SCROLLING
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0);

    // 2. MAGNETIC CUSTOM CURSOR
    if (window.matchMedia("(pointer: fine)").matches) {
        const dot = document.querySelector('.cursor-dot');
        const ring = document.querySelector('.cursor-ring');
        const xToDot = gsap.quickTo(dot, "x", {duration: 0.1, ease: "power3"});
        const yToDot = gsap.quickTo(dot, "y", {duration: 0.1, ease: "power3"});
        const xToRing = gsap.quickTo(ring, "x", {duration: 0.4, ease: "power3.out"});
        const yToRing = gsap.quickTo(ring, "y", {duration: 0.4, ease: "power3.out"});

        window.addEventListener('mousemove', (e) => {
            xToDot(e.clientX); yToDot(e.clientY);
            xToRing(e.clientX); yToRing(e.clientY);
        });

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(ring, {scale: 1.5, backgroundColor: "rgba(229,9,20,0.1)", borderColor: "transparent"});
                gsap.to(dot, {scale: 0});
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(ring, {scale: 1, backgroundColor: "transparent", borderColor: "rgba(229,9,20,0.5)"});
                gsap.to(dot, {scale: 1});
            });
        });
    }

    // 3. NAVBAR SCROLL LOGIC
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // 4. GSAP SCROLL REVEALS
    const cards = document.querySelectorAll('.bento-card');
    if(cards.length > 0) {
        gsap.from(cards, {
            scrollTrigger: { trigger: ".bento-section", start: "top 85%" },
            y: 80, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out"
        });
    }
});
