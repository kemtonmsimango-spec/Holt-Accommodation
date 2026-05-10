document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Menu Toggle
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('.nav-list');
    const header = document.getElementById('header');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            header.classList.toggle('scrolled-mobile');
            
            // Hamburger animation
            const spans = hamburger.querySelectorAll('span');
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    /* ==========================================================================
       2. Header Background on Scroll
       ========================================================================== */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       3. Smooth Scroll for Internal Links
       ========================================================================== */
    const smoothLinks = document.querySelectorAll('.smooth-scroll, .footer-links a');
    
    smoothLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (navList && navList.classList.contains('active')) {
                        navList.classList.remove('active');
                        const spans = hamburger.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }

                    // Scroll
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Offset for header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ==========================================================================
       4. Scroll Animations (Intersection Observer)
       ========================================================================== */
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Optional slight stagger effect if multiple items enter view
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    /* Section 5 (Hero Button Shake Effect) was successfully removed per design request 
       to swap the aggressive shake for a soft premium glow hover in CSS. */

});