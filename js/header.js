class SiteHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const headerHTML = `
            <div class="site-header">
                <div class="header-container">
                    <div class="header-left">
                        <div class="header-logo-icon">B</div>
                        <div class="header-logo">Prof. Dr. S. Balaji<br>Science Academy</div>
                    </div>
                    <button class="header-hamburger" aria-label="Toggle menu">
                        <span>☰</span>
                    </button>
                    <nav class="header-nav">
                        <a href="#about">About</a>
                        <a href="#programs">Programs</a>
                        <a href="#resources">Resources</a>
                        <a href="#contact">Contact</a>
                        <button class="header-cta">Get Started</button>
                    </nav>
                </div>
            </div>
        `;
        this.innerHTML = headerHTML;
    }

    setupEventListeners() {
        const hamburger = this.querySelector('.header-hamburger');
        const nav = this.querySelector('.header-nav');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                nav.classList.toggle('active');
            });

            // Close menu when a link is clicked
            const links = nav.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                });
            });
        }
    }
}

customElements.define('site-header', SiteHeader);
