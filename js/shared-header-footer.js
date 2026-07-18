/* ============================================
   HEADER & FOOTER SHARED JAVASCRIPT
   ============================================ */

// HEADER & NAVIGATION
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
const closeMenu = document.getElementById('closeMenu');
const navLinks = document.querySelectorAll('.nav-link-mobile');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMobile.classList.add('active');
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        navMobile.classList.remove('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('active');
    });
});

/* SECTION DETECTION FOR ACTIVE NAV LINKS */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinksDesktop = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksDesktop.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});
