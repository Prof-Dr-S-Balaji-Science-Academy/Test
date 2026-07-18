// Load shared header
fetch('/shared/header.html')
  .then(r => r.text())
  .then(html => document.getElementById('header-container').innerHTML = html)
  .then(() => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
      });
      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          nav.classList.remove('active');
        });
      });
    }
  });

// Load shared footer
fetch('/shared/footer.html')
  .then(r => r.text())
  .then(html => document.getElementById('footer-container').innerHTML = html);
