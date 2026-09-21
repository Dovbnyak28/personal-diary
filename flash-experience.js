(() => {
    'use strict';

    const root = document.documentElement;
    const body = document.body;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches && !('ontouchstart' in window);
    const desktop = window.matchMedia('(min-width: 821px)').matches;

    root.classList.toggle('flash-lite', !desktop || !finePointer || reducedMotion);
    if (reducedMotion) return;

    function addEntryMotion() {
        body.classList.add('flash-entry');
        requestAnimationFrame(() => {
            body.classList.add('flash-entry-done');
            window.setTimeout(() => body.classList.remove('flash-entry'), 900);
        });
    }

    function createParticleField() {
        if (!desktop || !finePointer) return;
        const field = document.createElement('div');
        field.className = 'flash-field';
        field.setAttribute('aria-hidden', 'true');
        const fragment = document.createDocumentFragment();
        for (let index = 0; index < 10; index += 1) {
            const particle = document.createElement('i');
            particle.className = 'flash-particle';
            particle.style.setProperty('--x', `${8 + (index * 37) % 86}%`);
            particle.style.setProperty('--y', `${8 + (index * 61) % 82}%`);
            particle.style.setProperty('--delay', `${(index % 5) * -0.8}s`);
            particle.style.setProperty('--size', `${index % 3 === 0 ? 3 : 2}px`);
            fragment.appendChild(particle);
        }
        field.appendChild(fragment);
        body.prepend(field);
    }

    function createPortal() {
        const hero = document.querySelector('.hero');
        if (!hero || hero.querySelector('.flash-portal')) return;
        const portal = document.createElement('div');
        portal.className = 'flash-portal';
        portal.setAttribute('aria-hidden', 'true');
        portal.innerHTML = '<div class="flash-portal-glow"></div><div class="flash-ring flash-ring-a"></div><div class="flash-ring flash-ring-b"></div><div class="flash-cube"><i class="flash-face flash-face-front">✦</i><i class="flash-face flash-face-back">✦</i><i class="flash-face flash-face-right"></i><i class="flash-face flash-face-left"></i><i class="flash-face flash-face-top"></i><i class="flash-face flash-face-bottom"></i></div>';
        hero.appendChild(portal);
    }

    function createBackgroundParallax() {
        const background = document.createElement('div');
        background.className = 'flash-background';
        background.setAttribute('aria-hidden', 'true');
        background.innerHTML = '<div class="flash-ambient flash-ambient-a"></div><div class="flash-ambient flash-ambient-b"></div><div class="flash-ambient flash-ambient-c"></div><div class="flash-grid"></div>';
        body.prepend(background);

        let frame = 0;
        let pointerX = 0;
        let pointerY = 0;
        let scrollDepth = 0;
        const update = () => {
            frame = 0;
            background.style.setProperty('--bg-x', `${pointerX.toFixed(1)}px`);
            background.style.setProperty('--bg-y', `${pointerY.toFixed(1)}px`);
            background.style.setProperty('--bg-depth', `${scrollDepth.toFixed(1)}px`);
        };
        const schedule = () => {
            if (frame) return;
            frame = requestAnimationFrame(update);
        };
        const onScroll = () => {
            scrollDepth = Math.min(window.scrollY * 0.045, 46);
            schedule();
        };
        const onPointerMove = event => {
            if (!desktop || !finePointer) return;
            pointerX = ((event.clientX / Math.max(window.innerWidth, 1)) - 0.5) * 34;
            pointerY = ((event.clientY / Math.max(window.innerHeight, 1)) - 0.5) * 24;
            schedule();
        };
        document.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        onScroll();
    }

    function setupReveal() {
        const revealItems = [...document.querySelectorAll('.hero, .section-head, .stats-grid > *, .card, .feature-panel, .tracker-card')];
        revealItems.forEach((item, index) => {
            item.classList.add('flash-reveal');
            item.style.setProperty('--reveal-delay', `${Math.min(index * 28, 220)}ms`);
        });
        if (!('IntersectionObserver' in window)) {
            revealItems.forEach(item => item.classList.add('flash-visible'));
            return;
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('flash-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
        revealItems.forEach(item => observer.observe(item));
    }

    function setupTilt() {
        if (!desktop || !finePointer) return;
        const targets = [...document.querySelectorAll('.hero, .stat-card, .card')].slice(0, 14);
        targets.forEach(target => {
            target.classList.add('flash-tilt-target');
            let frame = 0;
            let x = 0;
            let y = 0;
            let glowX = 50;
            let glowY = 50;
            const reset = () => {
                target.classList.remove('flash-tilt-active');
                target.style.setProperty('--tilt-x', '0deg');
                target.style.setProperty('--tilt-y', '0deg');
                target.style.setProperty('--glow-x', '50%');
                target.style.setProperty('--glow-y', '50%');
            };
            target.addEventListener('pointerenter', () => target.classList.add('flash-tilt-active'), { passive: true });
            target.addEventListener('pointermove', event => {
                const rect = target.getBoundingClientRect();
                glowX = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
                glowY = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
                x = (glowX / 100 - 0.5) * 5;
                y = (glowY / 100 - 0.5) * -5;
                if (frame) return;
                frame = requestAnimationFrame(() => {
                    frame = 0;
                    target.style.setProperty('--tilt-x', `${x.toFixed(2)}deg`);
                    target.style.setProperty('--tilt-y', `${y.toFixed(2)}deg`);
                    target.style.setProperty('--glow-x', `${glowX.toFixed(1)}%`);
                    target.style.setProperty('--glow-y', `${glowY.toFixed(1)}%`);
                });
            }, { passive: true });
            target.addEventListener('pointerleave', reset, { passive: true });
        });
    }

    function setupCameraTransitions() {
        document.addEventListener('click', event => {
            if (!event.target.closest('[data-tab]')) return;
            body.classList.remove('flash-camera');
            requestAnimationFrame(() => {
                body.classList.add('flash-camera');
                window.setTimeout(() => body.classList.remove('flash-camera'), 460);
            });
        }, { passive: true });
    }

    addEntryMotion();
    createBackgroundParallax();
    createPortal();
    createParticleField();
    setupReveal();
    setupTilt();
    setupCameraTransitions();
})();
