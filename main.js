/* ─── Hero canvas particle network ──────────────────────────────────────── */
(function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const hero  = canvas.closest('.hero');
    const ctx   = canvas.getContext('2d');
    let particles = [], W, H, raf;

    function setSize() {
        W = canvas.width  = hero.offsetWidth;
        H = canvas.height = hero.offsetHeight;
    }

    function Particle() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r  = Math.random() * 1.8 + 0.4;
        this.a  = Math.random() * 0.45 + 0.08;
        // Slightly bias toward indigo vs violet
        this.hue = Math.random() > 0.5 ? '79,70,229' : '139,92,246';
    }
    Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
    };

    function build() {
        setSize();
        const n = Math.max(30, Math.min(Math.floor(W / 16), 80));
        particles = Array.from({ length: n }, () => new Particle());
    }

    const MAX_D = 155, MAX_D2 = MAX_D * MAX_D;

    function frame() {
        ctx.clearRect(0, 0, W, H);

        // Connections
        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const b  = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < MAX_D2) {
                    const alpha = (1 - Math.sqrt(d2) / MAX_D) * 0.13;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(79,70,229,${alpha})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }

        // Dots
        particles.forEach(p => {
            p.update();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.hue},${p.a})`;
            ctx.fill();
        });

        raf = requestAnimationFrame(frame);
    }

    build();
    frame();

    let resizeT;
    window.addEventListener('resize', () => {
        clearTimeout(resizeT);
        resizeT = setTimeout(() => {
            cancelAnimationFrame(raf);
            build();
            frame();
        }, 220);
    }, { passive: true });
})();

/* ─── Navbar scroll ──────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── Mobile menu ────────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
}

/* ─── Smooth scroll ──────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMobileMenu();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ─── Waveform ───────────────────────────────────────────────────────────── */
const waveformEl = document.getElementById('waveform');
const BAR_COUNT = 32;

if (waveformEl) {
    for (let i = 0; i < BAR_COUNT; i++) {
        const bar = document.createElement('div');
        bar.className = 'wbar';

        // Bell-curve height: taller in the middle
        const mid = (BAR_COUNT - 1) / 2;
        const dist = Math.abs(i - mid) / mid;          // 0 = center, 1 = edge
        const maxH = Math.round(10 + (1 - dist * 0.75) * 26); // 10 – 36 px

        bar.style.setProperty('--max-h', maxH + 'px');
        bar.style.setProperty('--dur', (0.5 + Math.random() * 0.7).toFixed(2) + 's');
        bar.style.setProperty('--dly', (i * 0.055).toFixed(2) + 's');
        waveformEl.appendChild(bar);
    }
}

/* ─── Translation content ────────────────────────────────────────────────── */
const translations = {
    en: [
        '"Welcome to the Global Tech Summit 2026. Today we gather from over forty nations to discuss the future of technology and global connectivity..."',
        '"Our first panel will focus on AI and its transformative impact on industries worldwide. We are excited to welcome our keynote speakers..."',
        '"The theme of this summit is Bridging Worlds — connecting technology, culture, and people across every border..."',
    ],
    es: [
        '"Bienvenidos a la Cumbre Global de Tecnología 2026. Hoy nos reunimos de más de cuarenta naciones para discutir el futuro de la tecnología..."',
        '"Nuestro primer panel se centrará en la IA y su impacto transformador en industrias de todo el mundo..."',
        '"El tema de esta cumbre es Conectar Mundos — uniendo tecnología, cultura y personas a través de todas las fronteras..."',
    ],
    fr: [
        '"Bienvenue au Sommet Mondial de la Technologie 2026. Aujourd\'hui, nous nous réunissons de plus de quarante nations pour discuter de l\'avenir de la technologie..."',
        '"Notre premier panel se concentrera sur l\'IA et son impact transformateur sur les industries du monde entier..."',
        '"Le thème de ce sommet est Relier les Mondes — unir la technologie, la culture et les personnes au-delà de toutes les frontières..."',
    ],
    de: [
        '"Willkommen beim Weltweiten Tech-Gipfel 2026. Heute versammeln wir uns aus über vierzig Nationen, um über die Zukunft der Technologie zu sprechen..."',
        '"Unser erstes Panel konzentriert sich auf KI und ihre transformative Wirkung auf Branchen weltweit..."',
        '"Das Thema dieses Gipfels ist Welten verbinden — Technologie, Kultur und Menschen über alle Grenzen hinweg vereinen..."',
    ],
};

const langLabels = {
    en: 'English (Original)',
    es: 'Spanish · Translated',
    fr: 'French · Translated',
    de: 'German · Translated',
};

let currentLang = 'en';
let phraseIdx = 0;

const captionTextEl = document.getElementById('captionText');
const captionLangEl = document.getElementById('captionLang');

function updateCaption(lang, idx) {
    if (!captionTextEl || !captionLangEl) return;
    captionTextEl.style.opacity = '0';
    setTimeout(() => {
        captionTextEl.textContent = translations[lang][idx];
        captionLangEl.textContent = langLabels[lang];
        captionTextEl.style.opacity = '1';
    }, 200);
}

updateCaption('en', 0);

// Auto-cycle phrases every 4.5 seconds
setInterval(() => {
    phraseIdx = (phraseIdx + 1) % translations[currentLang].length;
    updateCaption(currentLang, phraseIdx);
}, 4500);

// Language tab click (called inline from HTML)
function selectLang(lang, btn) {
    currentLang = lang;
    phraseIdx = 0;
    document.querySelectorAll('.ltab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    updateCaption(lang, 0);
}

/* ─── Animated viewer count ──────────────────────────────────────────────── */
const viewerCountEl = document.getElementById('viewerCount');
let viewers = 4827;

setInterval(() => {
    viewers += Math.floor(Math.random() * 7) - 3;
    viewers = Math.max(4650, Math.min(5200, viewers));
    if (viewerCountEl) viewerCountEl.textContent = viewers.toLocaleString();
}, 2800);

/* ─── Scroll reveal ──────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(() => el.classList.add('revealed'), delay);
        revealObserver.unobserve(el);
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
    // Stagger siblings within the same parent
    const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
    const idx = siblings.indexOf(el);
    if (!el.dataset.delay && idx > 0) {
        el.dataset.delay = idx * 80;
    }
    revealObserver.observe(el);
});

/* ─── CTA submit ─────────────────────────────────────────────────────────── */
function handleCTASubmit() {
    const input = document.getElementById('ctaEmail');
    if (!input) return;
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
        input.style.borderColor = '#f87171';
        input.focus();
        setTimeout(() => { input.style.borderColor = ''; }, 1800);
        return;
    }
    const btn = input.nextElementSibling;
    btn.textContent = '✓ You\'re on the list!';
    btn.style.background = '#22c55e';
    btn.style.color = '#fff';
    input.disabled = true;
    btn.disabled = true;
    btn.style.cursor = 'default';
}

// Also allow Enter key in email field
const ctaInput = document.getElementById('ctaEmail');
if (ctaInput) {
    ctaInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleCTASubmit();
    });
}
