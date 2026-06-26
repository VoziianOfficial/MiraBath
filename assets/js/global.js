'use strict';

(function () {
    const config = window.MiraBathConfig || {};

    const state = {
        mobileMenuOpen: false,
        scrollY: 0
    };

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const escapeHtml = (value) => {
        return String(value ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    };

    const getValue = (path, fallback = '') => {
        if (!path) return fallback;

        return path.split('.').reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }

            return undefined;
        }, config) ?? fallback;
    };

    const normalizePath = (path) => {
        const clean = path.split('/').pop() || 'index.html';
        return clean === '' ? 'index.html' : clean;
    };

    const currentPage = normalizePath(window.location.pathname);

    const isCurrentUrl = (url) => {
        if (!url) return false;

        const cleanUrl = normalizePath(url.split('#')[0]);

        if (currentPage === '' && cleanUrl === 'index.html') {
            return true;
        }

        return cleanUrl === currentPage;
    };

    const icon = (name) => `<i data-lucide="${escapeHtml(name)}" aria-hidden="true"></i>`;

    const serviceLinksHtml = (className = 'services-dropdown__link') => {
        return (config.services || [])
            .map((service) => {
                return `
                    <a class="${className}" href="${escapeHtml(service.file)}">
                        <span>${escapeHtml(service.title)}</span>
                    </a>
                `;
            })
            .join('');
    };

    const createHeader = () => {
        const mount = qs('[data-site-header]');
        if (!mount) return;

        const navLinks = (config.mainNavigation || [])
            .map((item) => {
                const isActive = item.hasDropdown
                    ? currentPage === 'all-services.html' || (config.services || []).some((service) => isCurrentUrl(service.file))
                    : isCurrentUrl(item.url);

                if (item.hasDropdown) {
                    return `
                        <div class="site-nav__item">
                            <a class="site-nav__button ${isActive ? 'is-active' : ''}" href="${escapeHtml(item.url)}" aria-haspopup="true" aria-expanded="false">
                                <span>${escapeHtml(item.label)}</span>
                                ${icon('chevron-down')}
                            </a>

                            <div class="services-dropdown" aria-label="Bathroom remodelling service links">
                                ${serviceLinksHtml('services-dropdown__link')}
                            </div>
                        </div>
                    `;
                }

                return `
                    <a class="site-nav__link ${isActive ? 'is-active' : ''}" href="${escapeHtml(item.url)}">
                        ${escapeHtml(item.label)}
                    </a>
                `;
            })
            .join('');

        const mobileNavLinks = (config.mainNavigation || [])
            .map((item) => {
                return `
                    <a class="mobile-menu__link" href="${escapeHtml(item.url)}">
                        <span>${escapeHtml(item.label)}</span>
                        ${icon('arrow-up-right')}
                    </a>
                `;
            })
            .join('');

        const mobileServiceLinks = (config.services || [])
            .map((service) => {
                return `
                    <a class="mobile-menu__service" href="${escapeHtml(service.file)}">
                        <span>${escapeHtml(service.title)}</span>
                        ${icon(service.icon || 'arrow-up-right')}
                    </a>
                `;
            })
            .join('');

        mount.innerHTML = `
            <a class="skip-link" href="#main-content">Skip to main content</a>

            <div class="site-topbar" role="banner">
                <div class="site-topbar__inner">
                    <div class="site-topbar__group">
                        <a href="tel:${escapeHtml(config.contact?.phoneRaw)}" data-phone-link>
                            ${icon('phone')}
                            <span data-config="contact.phoneDisplay">${escapeHtml(config.contact?.phoneDisplay)}</span>
                        </a>

                        <a href="mailto:${escapeHtml(config.contact?.email)}" data-email-link>
                            ${icon('mail')}
                            <span data-config="contact.email">${escapeHtml(config.contact?.email)}</span>
                        </a>
                    </div>

                    <div class="site-topbar__group site-topbar__group--secondary">
                        <span>
                            ${icon('map-pin')}
                            <span data-config="company.serviceArea">${escapeHtml(config.company?.serviceArea)}</span>
                        </span>

                        <span>
                            ${icon('clock-3')}
                            <span data-config="company.supportHours">${escapeHtml(config.company?.supportHours)}</span>
                        </span>
                    </div>
                </div>
            </div>

            <header class="site-header" data-header>
                <div class="site-header__inner">
                    <a class="site-logo" href="index.html" aria-label="${escapeHtml(config.brand?.name)} home">
                        <img src="${escapeHtml(config.brand?.logo)}" alt="${escapeHtml(config.brand?.logoAlt)}">
                    </a>

                    <nav class="site-nav" aria-label="Primary navigation">
                        ${navLinks}
                    </nav>

                    <div class="header-actions">
                        <a class="header-icon-btn header-icon-btn--phone" href="tel:${escapeHtml(config.contact?.phoneRaw)}" aria-label="Call ${escapeHtml(config.brand?.name)}">
                            ${icon('phone')}
                        </a>

                        <a class="header-icon-btn header-icon-btn--email" href="mailto:${escapeHtml(config.contact?.email)}" aria-label="Email ${escapeHtml(config.brand?.name)}">
                            ${icon('mail')}
                        </a>

                        <button class="mobile-menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false" data-menu-open>
                            ${icon('menu')}
                        </button>
                    </div>
                </div>
            </header>

            <div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-mobile-menu>
                <div class="mobile-menu__top">
                    <a class="mobile-menu__logo" href="index.html" aria-label="${escapeHtml(config.brand?.name)} home">
                        <img src="${escapeHtml(config.brand?.logo)}" alt="${escapeHtml(config.brand?.logoAlt)}">
                    </a>

                    <button class="mobile-menu__close" type="button" aria-label="Close menu" data-menu-close>
                        ${icon('x')}
                    </button>
                </div>

                <div class="mobile-menu__body">
                    <p class="mobile-menu__heading">Navigation</p>
                    <nav class="mobile-menu__grid" aria-label="Mobile navigation">
                        ${mobileNavLinks}
                    </nav>

                    <p class="mobile-menu__heading">Bathroom services</p>
                    <nav class="mobile-menu__services" aria-label="Mobile service navigation">
                        ${mobileServiceLinks}
                    </nav>

                    <p class="mobile-menu__heading">Contact</p>
                    <div class="mobile-menu__contacts">
                        <a class="mobile-menu__contact" href="tel:${escapeHtml(config.contact?.phoneRaw)}">
                            ${icon('phone')}
                            <span>${escapeHtml(config.contact?.phoneDisplay)}</span>
                        </a>

                        <a class="mobile-menu__contact" href="mailto:${escapeHtml(config.contact?.email)}">
                            ${icon('mail')}
                            <span>${escapeHtml(config.contact?.email)}</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    };

    const createFooter = () => {
        const mount = qs('[data-site-footer]');
        if (!mount) return;

        const navigationLinks = (config.mainNavigation || [])
            .map((item) => `<a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>`)
            .join('');

        const footerServiceLinks = (config.services || [])
            .map((service) => `<a href="${escapeHtml(service.file)}">${escapeHtml(service.title)}</a>`)
            .join('');

        const legalLinks = (config.legalNavigation || [])
            .map((item) => `<a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>`)
            .join('');

        mount.innerHTML = `
            <footer class="site-footer">
                <div class="site-footer__grid">
                    <div class="site-footer__brand">
                        <a class="site-footer__logo" href="index.html" aria-label="${escapeHtml(config.brand?.name)} home">
                            <img src="${escapeHtml(config.brand?.logo)}" alt="${escapeHtml(config.brand?.logoAlt)}">
                        </a>

                        <p data-config="footer.description">${escapeHtml(config.footer?.description)}</p>

                        <div class="site-footer__list">
                            <span>
                                <strong>${escapeHtml(config.company?.legalName)}</strong>
                            </span>
                            <span data-config="company.companyId">${escapeHtml(config.company?.companyId)}</span>
                            <span data-config="company.address">${escapeHtml(config.company?.address)}</span>
                        </div>
                    </div>

                    <div>
                        <h2 class="site-footer__title">Pages</h2>
                        <nav class="site-footer__list" aria-label="Footer navigation">
                            ${navigationLinks}
                        </nav>
                    </div>

                    <div>
                        <h2 class="site-footer__title">Services</h2>
                        <nav class="site-footer__list" aria-label="Footer service links">
                            ${footerServiceLinks}
                        </nav>
                    </div>

                    <div>
                        <h2 class="site-footer__title">Contact</h2>
                        <div class="site-footer__list">
                            <a href="tel:${escapeHtml(config.contact?.phoneRaw)}">${escapeHtml(config.contact?.phoneDisplay)}</a>
                            <a href="mailto:${escapeHtml(config.contact?.email)}">${escapeHtml(config.contact?.email)}</a>
                            <span>${escapeHtml(config.company?.supportHours)}</span>
                            <span>${escapeHtml(config.company?.serviceArea)}</span>
                        </div>

                        <h2 class="site-footer__title" style="margin-top: 26px;">Legal</h2>
                        <nav class="site-footer__list" aria-label="Footer legal links">
                            ${legalLinks}
                        </nav>
                    </div>
                </div>

                <div class="site-footer__disclaimer" data-config="legal.disclaimer">
                    ${escapeHtml(config.legal?.disclaimer)}
                </div>

                <div class="site-footer__bottom">
                    <span data-config="footer.copyright">${escapeHtml(config.footer?.copyright)}</span>
                    <a href="cookie-policy.html">Cookie settings and policy</a>
                </div>
            </footer>
        `;
    };

    const createFinalCta = () => {
        const mounts = qsa('[data-final-cta]');
        if (!mounts.length) return;

        mounts.forEach((mount) => {
            const cta = config.finalCta || {};

            mount.innerHTML = `
                <section class="final-cta-section" aria-labelledby="final-cta-title">
                    <div class="container-wide">
                        <div class="final-cta shine-surface">
                            <div class="final-cta__image" aria-hidden="true">
                                <img src="${escapeHtml(cta.image)}" alt="" loading="lazy">
                            </div>

                            <div class="final-cta__content">
                                <p class="section-kicker section-kicker--light">COMPARE OPTIONS</p>
                                <h2 id="final-cta-title">${escapeHtml(cta.heading)}</h2>
                                <p>${escapeHtml(cta.text)}</p>

                                <div class="final-cta__actions">
                                    <a class="btn btn--primary" href="${escapeHtml(cta.primaryUrl)}">
                                        <span>${escapeHtml(cta.primaryLabel)}</span>
                                        ${icon('arrow-up-right')}
                                    </a>

                                    <a class="btn btn--ghost-light" href="${escapeHtml(cta.secondaryUrl)}">
                                        <span>${escapeHtml(cta.secondaryLabel)}</span>
                                        ${icon('layout-grid')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        });
    };

    const createCookieBanner = () => {
        if (qs('[data-cookie-banner]')) return;

        const cookie = config.cookieConsent || {};
        const savedChoice = localStorage.getItem(cookie.storageKey || 'mirabath_cookie_consent');

        const banner = document.createElement('div');
        banner.className = `cookie-banner ${savedChoice ? '' : 'is-visible'}`;
        banner.setAttribute('data-cookie-banner', '');

        banner.innerHTML = `
            <div class="cookie-banner__inner">
                <p>
                    ${escapeHtml(cookie.text)}
                    <a href="${escapeHtml(cookie.privacyUrl)}">Privacy Policy</a>,
                    <a href="${escapeHtml(cookie.cookieUrl)}">Cookie Policy</a>, and
                    <a href="${escapeHtml(cookie.termsUrl)}">Terms of Service</a>.
                </p>

                <div class="cookie-banner__actions">
                    <button class="btn btn--primary" type="button" data-cookie-accept>
                        ${escapeHtml(cookie.acceptLabel || 'Accept')}
                    </button>

                    <button class="btn btn--secondary" type="button" data-cookie-decline>
                        ${escapeHtml(cookie.declineLabel || 'Decline')}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        const saveChoice = (choice) => {
            localStorage.setItem(cookie.storageKey || 'mirabath_cookie_consent', choice);
            banner.classList.remove('is-visible');
        };

        qs('[data-cookie-accept]', banner)?.addEventListener('click', () => saveChoice('accepted'));
        qs('[data-cookie-decline]', banner)?.addEventListener('click', () => saveChoice('declined'));
    };

    const injectConfigValues = () => {
        qsa('[data-config]').forEach((node) => {
            const path = node.getAttribute('data-config');
            node.textContent = getValue(path, node.textContent);
        });

        qsa('[data-config-href]').forEach((node) => {
            const path = node.getAttribute('data-config-href');
            node.setAttribute('href', getValue(path, node.getAttribute('href') || '#'));
        });

        qsa('[data-phone-link]').forEach((node) => {
            node.setAttribute('href', `tel:${config.contact?.phoneRaw || ''}`);
        });

        qsa('[data-email-link]').forEach((node) => {
            node.setAttribute('href', `mailto:${config.contact?.email || ''}`);
        });

        qsa('[data-address-map-link]').forEach((node) => {
            const query = encodeURIComponent(config.company?.mapQuery || config.company?.address || '');
            node.setAttribute('href', `https://www.google.com/maps/search/?api=1&query=${query}`);
            node.setAttribute('target', '_blank');
            node.setAttribute('rel', 'noopener noreferrer');
        });
    };

    const initHeaderScroll = () => {
        const header = qs('[data-header]');
        if (!header) return;

        const update = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
    };

    const openMobileMenu = () => {
        const menu = qs('[data-mobile-menu]');
        const openButton = qs('[data-menu-open]');
        if (!menu || !openButton) return;

        state.scrollY = window.scrollY;
        state.mobileMenuOpen = true;

        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        openButton.setAttribute('aria-expanded', 'true');

        document.body.classList.add('menu-open');
        document.body.style.top = `-${state.scrollY}px`;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        qs('[data-menu-close]')?.focus();
    };

    const closeMobileMenu = () => {
        const menu = qs('[data-mobile-menu]');
        const openButton = qs('[data-menu-open]');
        if (!menu || !openButton) return;

        state.mobileMenuOpen = false;

        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        openButton.setAttribute('aria-expanded', 'false');

        document.body.classList.remove('menu-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        window.scrollTo(0, state.scrollY);
    };

    const initMobileMenu = () => {
        qs('[data-menu-open]')?.addEventListener('click', openMobileMenu);
        qs('[data-menu-close]')?.addEventListener('click', closeMobileMenu);

        qsa('[data-mobile-menu] a').forEach((link) => {
            link.addEventListener('click', closeMobileMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && state.mobileMenuOpen) {
                closeMobileMenu();
            }
        });
    };

    const initDropdownAccessibility = () => {
        qsa('.site-nav__item').forEach((item) => {
            const button = qs('.site-nav__button', item);
            const dropdown = qs('.services-dropdown', item);

            if (!button || !dropdown) return;

            item.addEventListener('mouseenter', () => {
                button.setAttribute('aria-expanded', 'true');
            });

            item.addEventListener('mouseleave', () => {
                button.setAttribute('aria-expanded', 'false');
            });

            item.addEventListener('focusin', () => {
                button.setAttribute('aria-expanded', 'true');
            });

            item.addEventListener('focusout', (event) => {
                if (!item.contains(event.relatedTarget)) {
                    button.setAttribute('aria-expanded', 'false');
                }
            });
        });
    };

    const setAccordionItemState = (item, button, panel, shouldOpen) => {
        item.classList.toggle('is-open', shouldOpen);
        button.setAttribute('aria-expanded', String(shouldOpen));
        panel.setAttribute('aria-hidden', String(!shouldOpen));
    };

    const initAccordions = (root = document) => {
        const accordions = [];

        if (root instanceof Element && root.matches('[data-accordion]')) {
            accordions.push(root);
        }

        accordions.push(...qsa('[data-accordion]', root));

        accordions.forEach((accordion) => {
            if (accordion.dataset.accordionInitialized === 'true') return;

            accordion.dataset.accordionInitialized = 'true';
            const items = qsa('[data-accordion-item]', accordion);
            const allowMultiple = accordion.hasAttribute('data-accordion-multiple');

            items.forEach((item, index) => {
                const button = qs('[data-accordion-button]', item);
                const panel = qs('[data-accordion-panel]', item);

                if (!button || !panel) return;

                const panelId = panel.id || `accordion-panel-${Math.random().toString(36).slice(2)}`;
                const buttonId = button.id || `accordion-button-${Math.random().toString(36).slice(2)}`;

                panel.id = panelId;
                button.id = buttonId;

                button.setAttribute('aria-controls', panelId);
                panel.setAttribute('aria-labelledby', buttonId);

                const shouldOpen = item.classList.contains('is-open') || index === 0;

                setAccordionItemState(item, button, panel, shouldOpen);

                button.addEventListener('click', () => {
                    const isOpen = item.classList.contains('is-open');

                    if (!allowMultiple) {
                        items.forEach((otherItem) => {
                            const otherButton = qs('[data-accordion-button]', otherItem);
                            const otherPanel = qs('[data-accordion-panel]', otherItem);

                            if (!otherButton || !otherPanel) return;

                            setAccordionItemState(otherItem, otherButton, otherPanel, false);
                        });
                    }

                    if (!isOpen || allowMultiple) {
                        setAccordionItemState(item, button, panel, !isOpen);
                    }
                });
            });
        });
    };

    const createFaqSchema = (faqs, pageUrl = window.location.href) => {
        if (!Array.isArray(faqs) || !faqs.length) return;

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer
                }
            })),
            url: pageUrl
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    };

    const initIconMarquees = () => {
        qsa('[data-icon-marquee]').forEach((track) => {
            if (track.dataset.marqueeReady === 'true') return;

            const group = qs('[data-marquee-group]', track);
            if (!group) return;

            const clone = group.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
            track.dataset.marqueeReady = 'true';
        });
    };

    const initExternalLinks = () => {
        qsa('a[target="_blank"]').forEach((link) => {
            const rel = link.getAttribute('rel') || '';
            if (!rel.includes('noopener')) {
                link.setAttribute('rel', `${rel} noopener noreferrer`.trim());
            }
        });
    };

    const initLibraries = () => {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }

        if (window.AOS && typeof window.AOS.init === 'function') {
            window.AOS.init({
                once: true,
                duration: 780,
                easing: 'ease-out-cubic',
                offset: 80,
                delay: 40,
                anchorPlacement: 'top-bottom'
            });

            setTimeout(() => {
                if (window.AOS && typeof window.AOS.refreshHard === 'function') {
                    window.AOS.refreshHard();
                }
            }, 450);
        }
    };

    const refreshIcons = () => {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    };

    const init = () => {
        createHeader();
        createFooter();
        createFinalCta();
        injectConfigValues();
        createCookieBanner();

        initHeaderScroll();
        initMobileMenu();
        initDropdownAccessibility();
        initAccordions();
        initIconMarquees();
        initExternalLinks();
        initLibraries();
    };

    window.MiraBath = {
        config,
        escapeHtml,
        getValue,
        icon,
        initAccordions,
        createFaqSchema,
        refreshIcons,
        currentPage,
        closeMobileMenu
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
