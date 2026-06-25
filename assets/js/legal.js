'use strict';

(function () {
    const app = window.MiraBath || {};
    const config = window.MiraBathConfig || {};

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const legalPageData = {
        'privacy-policy.html': {
            title: 'Privacy Policy',
            description: 'This Privacy Policy explains how MiraBath may collect, use, and protect information submitted through this independent bathroom remodelling provider-matching website.',
            updated: config.legal?.privacyUpdated || 'Updated 2026'
        },

        'terms-of-service.html': {
            title: 'Terms of Service',
            description: 'These Terms explain how visitors may use the MiraBath website and provider-matching request process.',
            updated: config.legal?.termsUpdated || 'Updated 2026'
        },

        'cookie-policy.html': {
            title: 'Cookie Policy',
            description: 'This Cookie Policy explains how cookies and similar technologies may be used on the MiraBath website.',
            updated: config.legal?.cookiesUpdated || 'Updated 2026'
        }
    };

    const getCurrentPage = () => {
        return window.location.pathname.split('/').pop() || 'privacy-policy.html';
    };

    const getCurrentLegalData = () => {
        const page = getCurrentPage();
        return legalPageData[page] || legalPageData['privacy-policy.html'];
    };

    const setActiveLegalLinks = () => {
        const currentPage = getCurrentPage();

        qsa('[data-legal-nav] a').forEach((link) => {
            const href = link.getAttribute('href') || '';
            const isActive = href.includes(currentPage);

            link.classList.toggle('is-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const injectLegalMeta = () => {
        const current = getCurrentLegalData();

        qsa('[data-legal-title]').forEach((element) => {
            element.textContent = current.title;
        });

        qsa('[data-legal-description]').forEach((element) => {
            element.textContent = current.description;
        });

        qsa('[data-legal-updated]').forEach((element) => {
            element.textContent = current.updated;
        });

        qsa('[data-legal-disclaimer]').forEach((element) => {
            element.textContent = config.legal?.disclaimer || '';
        });
    };

    const initLegalSchema = () => {
        const current = getCurrentLegalData();

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: current.title,
            description: current.description,
            isPartOf: {
                '@type': 'WebSite',
                name: config.brand?.name || 'MiraBath',
                url: window.location.origin || ''
            },
            publisher: {
                '@type': 'Organization',
                name: config.company?.legalName || config.brand?.name || 'MiraBath'
            }
        };

        const existing = qs('script[data-legal-schema]');
        if (existing) {
            existing.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.legalSchema = 'true';
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    };

    const initSmoothLegalAnchors = () => {
        qsa('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');

                if (!targetId || targetId === '#') return;

                const target = qs(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    };

    const initLegalSectionObserver = () => {
        const sections = qsa('[data-legal-section]');
        const navLinks = qsa('[data-legal-section-link]');

        if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

        const setActiveSection = (id) => {
            navLinks.forEach((link) => {
                const href = link.getAttribute('href') || '';
                link.classList.toggle('is-active', href === `#${id}`);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible?.target?.id) {
                setActiveSection(visible.target.id);
            }
        }, {
            root: null,
            threshold: [0.24, 0.42, 0.6],
            rootMargin: '-120px 0px -40% 0px'
        });

        sections.forEach((section) => observer.observe(section));
    };

    const init = () => {
        injectLegalMeta();
        setActiveLegalLinks();
        initLegalSchema();
        initSmoothLegalAnchors();
        initLegalSectionObserver();

        if (app.refreshIcons) {
            app.refreshIcons();
        }

        if (window.AOS && typeof window.AOS.refreshHard === 'function') {
            setTimeout(() => window.AOS.refreshHard(), 260);
        }
    };

    window.MiraBathLegal = {
        legalPageData,
        getCurrentLegalData
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();