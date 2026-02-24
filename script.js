// ==========================================
// EmailJS Initialization
// — PUBLIC KEY from your EmailJS account
// ==========================================
(function () {
    emailjs.init({
        publicKey: "YOUR_EMAILJS_PUBLIC_KEY", // <-- Replace with your Public Key
    });
})();

// ==========================================
// Initialize AOS (Animate On Scroll)
// ==========================================
AOS.init({
    duration: 900,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    once: true,
    mirror: false,
    offset: 80,
});

// ==========================================
// HERO PARTICLE SYSTEM (Canvas)
// ==========================================
(function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.6 + 0.1;
            const hues = [260, 280, 320, 200];
            this.hue = hues[Math.floor(Math.random() * hues.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(167, 139, 250, ${0.12 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnections();
        particles.forEach(p => { p.update(); p.draw(); });
        animFrameId = requestAnimationFrame(animate);
    }

    // Only animate when hero is visible
    const heroSection = document.getElementById('hero');
    const heroObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animate();
        } else {
            cancelAnimationFrame(animFrameId);
        }
    });
    if (heroSection) heroObserver.observe(heroSection);
    else animate();
})();

// ==========================================
// TYPEWRITER EFFECT — Hero Roles
// ==========================================
(function initTypewriter() {
    const roles = [
        'Web Design Faculty',
        'Web Developer',
        'Graphic Designer',
        'UI/UX Enthusiast',
        'Laravel Developer',
    ];
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    // Replace content with typewriter span
    subtitle.innerHTML = '<span id="tw-role"></span><span class="tw-cursor">|</span>';
    const roleEl = document.getElementById('tw-role');
    if (!roleEl) return;

    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const current = roles[roleIndex];
        if (isDeleting) {
            roleEl.textContent = current.substring(0, charIndex--);
        } else {
            roleEl.textContent = current.substring(0, charIndex++);
        }

        let delay = isDeleting ? 50 : 90;

        if (!isDeleting && charIndex > current.length) {
            delay = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            charIndex = 0;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }
        setTimeout(type, delay);
    }

    setTimeout(type, 1200);
})();

// ==========================================
// FLOATING BLOBS — Hero background
// ==========================================
(function initBlobs() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const colors = [
        'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
        'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)',
        'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
    ];
    colors.forEach((bg, i) => {
        const blob = document.createElement('div');
        blob.className = 'hero-blob';
        blob.style.cssText = `
            position:absolute; border-radius:50%; pointer-events:none; z-index:0;
            width:${350 + i * 80}px; height:${350 + i * 80}px;
            background:${bg};
            top:${[10, 50, 30][i]}%; left:${[70, 10, 50][i]}%;
            transform:translate(-50%,-50%);
            animation: blobFloat${i} ${14 + i * 4}s ease-in-out infinite alternate;
            filter: blur(40px);
        `;
        hero.appendChild(blob);
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes blobFloat0 { 0%{transform:translate(-50%,-50%) scale(1);} 100%{transform:translate(-45%,-55%) scale(1.15);} }
        @keyframes blobFloat1 { 0%{transform:translate(-50%,-50%) scale(1.1);} 100%{transform:translate(-55%,-45%) scale(0.9);} }
        @keyframes blobFloat2 { 0%{transform:translate(-50%,-50%) scale(0.95);} 100%{transform:translate(-50%,-55%) scale(1.1);} }
        .tw-cursor {
            display:inline-block;
            width:2px;
            background: #a78bfa;
            margin-left:2px;
            animation: cursorBlink 0.9s step-end infinite;
            vertical-align:middle;
            height:1.2em;
        }
        @keyframes cursorBlink { 0%,100%{opacity:1;} 50%{opacity:0;} }
    `;
    document.head.appendChild(style);
})();

// ==========================================
// Navbar Scroll Effect
// ==========================================
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// ==========================================
// Active Navigation Link on Scroll
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 250) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) link.classList.add('active');
    });
});

// ==========================================
// Smooth Scroll
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            const nc = document.querySelector('.navbar-collapse');
            if (nc && nc.classList.contains('show')) nc.classList.remove('show');
        }
    });
});

// ==========================================
// Skill Progress Bar Animation
// ==========================================
let skillsAnimated = false;
const skillsSection = document.getElementById('skills');

const animateSkills = () => {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w; }, 100);
    });
};

const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            animateSkills();
            skillsAnimated = true;
        }
    });
}, { threshold: 0.3 });

if (skillsSection) skillsObserver.observe(skillsSection);

// ==========================================
// COUNTER ANIMATION (Stats)
// ==========================================
const animateCount = (el, target) => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) { el.textContent = target; clearInterval(timer); }
        else el.textContent = start;
    }, 25);
};

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.counter').forEach(c => {
                animateCount(c, parseInt(c.dataset.target));
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);

// ==========================================
// Portfolio Filter
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const fv = this.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            if (fv === 'all' || item.getAttribute('data-category') === fv) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });
        AOS.refresh();
    });
});

// ==========================================
// 3D TILT on Portfolio Cards
// ==========================================
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.portfolio-card'), {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.15,
        perspective: 1000,
    });
}

// ==========================================
// TIMELINE items stagger entrance
// ==========================================
document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
});

const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item').forEach(item => timelineObserver.observe(item));

// ==========================================
// CURSOR GLOW effect
// ==========================================
(function initCursorGlow() {
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    glow.style.cssText = `
        position:fixed; width:400px; height:400px; border-radius:50%;
        background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
        pointer-events:none; z-index:9999;
        transform:translate(-50%,-50%);
        transition: left 0.12s ease, top 0.12s ease;
        top:-200px; left:-200px;
    `;
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
})();

// ==========================================
// SCROLL TO TOP
// ==========================================
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) scrollToTopBtn.classList.add('show');
    else scrollToTopBtn.classList.remove('show');
});
scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ==========================================
// Parallax Hero
// ==========================================
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.pageYOffset < window.innerHeight) {
        const s = window.pageYOffset;
        heroContent.style.transform = `translateY(${s * 0.35}px)`;
        heroContent.style.opacity = 1 - (s / 600);
    }
});

// ==========================================
// Mobile Menu Close
// ==========================================
document.addEventListener('click', e => {
    const navbar = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    if (navbar && toggler && !navbar.contains(e.target) && !toggler.contains(e.target)) {
        navbar.classList.remove('show');
    }
});

// ==========================================
// SECTION REVEAL — glowing underline on scroll
// ==========================================
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('title-visible');
    });
}, { threshold: 0.5 });
sectionTitles.forEach(t => titleObserver.observe(t));

// ==========================================
// EMAILJS — Contact Form
// ==========================================
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMessage');
const errorMsg = document.getElementById('errorMessage');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoading = document.getElementById('btnLoading');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) return;

        // Show loading state
        submitBtn.disabled = true;
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        successMsg.classList.add('d-none');
        errorMsg.classList.add('d-none');

        // EmailJS send
        // SERVICE_ID and TEMPLATE_ID from your EmailJS dashboard
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_name: 'Muhammad Farhan',
        })
        .then(() => {
            successMsg.classList.remove('d-none');
            contactForm.reset();
            setTimeout(() => successMsg.classList.add('d-none'), 6000);
        })
        .catch(err => {
            console.error('EmailJS error:', err);
            errorMsg.classList.remove('d-none');
            setTimeout(() => errorMsg.classList.add('d-none'), 6000);
        })
        .finally(() => {
            submitBtn.disabled = false;
            btnText.classList.remove('d-none');
            btnLoading.classList.add('d-none');
        });
    });
}

// ==========================================
// Dynamic Year in Footer
// ==========================================
const footerCopy = document.querySelector('.footer-copyright');
if (footerCopy) {
    footerCopy.innerHTML = footerCopy.innerHTML.replace('2025', new Date().getFullYear());
}

// ==========================================
// Prevent form resubmission on refresh
// ==========================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ==========================================
// Console Welcome
// ==========================================
console.log('%c🚀 Muhammad Farhan Portfolio', 'color:#a78bfa;font-size:20px;font-weight:900;');
console.log('%cWeb Design Faculty | Developer | Designer', 'color:#ec4899;font-size:13px;');