// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        header.style.padding = '5px 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        header.style.padding = '0';
    }
});

// Mobile menu toggle (placeholder for futuro)
// No momento focamos em um layout limpo sem menus complexos.
