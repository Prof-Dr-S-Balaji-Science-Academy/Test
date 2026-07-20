/* INCLUDES - Load Header and Footer Components */

// Load header HTML
fetch('header.html')
    .then(response => response.text())
    .then(html => {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = html;
        }
    })
    .catch(error => console.error('Error loading header:', error));

// Load footer HTML
fetch('footer.html')
    .then(response => response.text())
    .then(html => {
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = html;
        }
    })
    .catch(error => console.error('Error loading footer:', error));
