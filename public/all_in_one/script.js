document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. COUNTER ANIMATION (Tirinta Lambarada) ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    // Waxaan ku daraynaa calaamadda + ama M+ dhamaadka
                    counter.innerText = target + (target === 22.3 ? "M+" : "+");
                }
            };
            updateCount();
        });
    }

    // Isha ku hay qaybta stats-ka si animation-ku u bilaawdo markii la arko
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                startCounters();
                observer.unobserve(statsSection); // Hal mar kaliya ha ordo
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // --- 2. SMOOTH SCROLLING & ACTIVE STATE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            if (this.getAttribute('href').length > 1) { 
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                
                // Maareynta 'active' class-ka (Mobile & Desktop)
                document.querySelectorAll('.mobile-bottom-nav a, .desktop-nav a').forEach(item => {
                    item.classList.remove('active');
                });

                if (this.closest('.mobile-bottom-nav') || this.closest('.desktop-nav')) {
                    this.classList.add('active');
                }
            }
        });
    });

});