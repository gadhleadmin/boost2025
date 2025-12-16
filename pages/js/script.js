document.addEventListener('DOMContentLoaded', function() {
    
    // Simple smooth scrolling and Active state handling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            // Check if the link is a navigation link, not a button like Sign Up
            if (this.getAttribute('href').length > 1) { 
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                
                // Handle active state for the bottom nav and desktop nav
                // 1. Mobile Bottom Nav
                document.querySelectorAll('.mobile-bottom-nav a').forEach(item => {
                    item.classList.remove('active');
                });
                // 2. Desktop Nav
                document.querySelectorAll('.desktop-nav a').forEach(item => {
                    item.classList.remove('active');
                });

                // Set current link as active (if it's one of the nav links)
                if (this.closest('.mobile-bottom-nav') || this.closest('.desktop-nav')) {
                    this.classList.add('active');
                }
            }
        });
    });
});