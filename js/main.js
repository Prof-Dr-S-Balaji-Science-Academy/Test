async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // If we just loaded the header, initialize the mobile menu scripts
        if(elementId === "header-placeholder") {
            initMobileMenu();
        }
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

function initMobileMenu() {
    const toggleBtn = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    
    if(!toggleBtn || !nav) return;

    // SVG Icons
    const iconHamburger = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    const iconClose = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    // Toggle Menu on Click
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click from immediately closing it
        nav.classList.toggle('active');
        
        // Switch between Hamburger and X icon
        if(nav.classList.contains('active')) {
            toggleBtn.innerHTML = iconClose;
        } else {
            toggleBtn.innerHTML = iconHamburger;
        }
    });

    // Close Menu when clicking anywhere outside of the nav and the toggle button
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && !nav.contains(e.target) && !toggleBtn.contains(e.target)) {
            nav.classList.remove('active');
            toggleBtn.innerHTML = iconHamburger;
        }
    });
}

// Load header and footer when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-placeholder", "components/header.html");
    loadComponent("footer-placeholder", "components/footer.html");
});
