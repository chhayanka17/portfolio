// Typing Animation
const typingElement = document.getElementById('typing-text');
const fullText = "AI/ML Undergraduate | Python Developer | Tech Innovator";
let index = 0;

function type() {
    if (index < fullText.length) {
        typingElement.textContent += fullText.charAt(index);
        index++;
        setTimeout(type, 80);
    }
}
type();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Mobile Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Dark/Light Mode Toggle
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
let isDark = true;

themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    html.classList.toggle('dark', isDark);
    themeBtn.innerHTML = isDark 
        ? '<i class="fas fa-sun text-yellow-400"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
});

// Active Nav Highlight
function updateActiveNav() {
    const sections = ['about', 'projects', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section && scrollY >= section.offsetTop - 200) current = id;
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// 3D Tilt Effect on Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        card.style.transform = `perspective(800px) rotateX(${12 * (0.5 - y)}deg) rotateY(${12 * (x - 0.5)}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    });
});