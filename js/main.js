/**
 * Function to dynamically fetch and inject HTML components.
 * Note: To view this locally without CORS issues, you should run a local server 
 * (e.g., VS Code Live Server extension or Python simple HTTP server).
 */
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

// Load header and footer when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-placeholder", "components/header.html");
    loadComponent("footer-placeholder", "components/footer.html");
});