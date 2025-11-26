document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference
    // Default to 'dark' if no preference is saved
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Handling (Mailto/WhatsApp)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            const message = `Name: ${data.name}%0AEmail: ${data.email}%0APhone: ${data.phone}%0AMessage: ${data.message}`;

            // You can choose either mailto or whatsapp here, or give the user a choice
            // For now, let's simulate opening a mailto link
            window.location.href = `mailto:contact@itservices.com?subject=New Inquiry from ${data.name}&body=${message}`;

            // Optional: WhatsApp
            // window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
        });
    }

    // Share Button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'IT Services & Consulting',
                        text: 'Check out this amazing IT services firm!',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            } else {
                // Fallback
                alert('Copy this link to share: ' + window.location.href);
            }
        });
    }
});
