'use strict';

(function () {
    const app = window.MiraBath || {};
    const config = window.MiraBathConfig || {};

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const escapeHtml = app.escapeHtml || ((value) => String(value ?? ''));
    const icon = app.icon || ((name) => `<i data-lucide="${escapeHtml(name)}" aria-hidden="true"></i>`);

    const selectorItems = [
        {
            id: 'full-update',
            label: 'Full Update',
            serviceId: 'complete-remodel',
            title: 'Complete Bathroom Remodel',
            text: 'Best for requests where the layout, surfaces, fixtures, storage, and general bathroom style all need attention.'
        },
        {
            id: 'replace-tub',
            label: 'Replace Tub',
            serviceId: 'bathtub-replacement',
            title: 'Bathtub Replacement',
            text: 'Useful when an existing bathtub feels worn, damaged, outdated, difficult to use, or no longer fits the bathroom plan.'
        },
        {
            id: 'walk-in-shower',
            label: 'Walk-In Shower',
            serviceId: 'tub-to-shower',
            title: 'Tub-to-Shower Conversion',
            text: 'Helpful for homeowners considering a bathtub area conversion into a shower-focused space with easier daily use.'
        },
        {
            id: 'new-tile',
            label: 'New Tile',
            serviceId: 'tile-flooring',
            title: 'Bathroom Tile & Flooring',
            text: 'A good match for surface-focused requests involving tile, waterproof flooring, wall finishes, and bathroom material updates.'
        },
        {
            id: 'better-storage',
            label: 'Better Storage',
            serviceId: 'vanity-storage',
            title: 'Vanity & Storage Upgrades',
            text: 'Works well for requests focused on vanity changes, cabinetry, organization, counter space, and more functional bathroom storage.'
        },
        {
            id: 'compare-first',
            label: 'Compare First',
            serviceId: 'complete-remodel',
            title: 'Compare Bathroom Options',
            text: 'Start with the closest project category and compare available provider options before deciding whether to continue.'
        }
    ];

    const servicesFaq = [
        {
            question: 'Can I request more than one category?',
            answer: 'Yes. You can describe multiple bathroom needs in your request. MiraBath helps route the details toward available provider options where matching coverage exists.'
        },
        {
            question: 'What if I am not sure which service I need?',
            answer: 'Choose the closest category and explain your project details in the message. Participating providers may help clarify scope after reviewing your request.'
        },
        {
            question: 'Does MiraBath set the final price?',
            answer: 'No. MiraBath does not set final pricing. Pricing, scheduling, warranties, and service terms are provided by participating providers.'
        },
        {
            question: 'Who provides the final quote?',
            answer: 'Final quote details are provided by participating providers, not MiraBath. Homeowners should review all terms before choosing whether to continue.'
        },
        {
            question: 'Does MiraBath perform the work directly?',
            answer: 'No. MiraBath is an independent provider-matching platform and does not directly remodel bathrooms, install products, inspect projects, or perform service work.'
        }
    ];

    const getServiceById = (serviceId) => {
        return (config.services || []).find((service) => service.id === serviceId);
    };

    const initServiceSelector = () => {
        const root = qs('[data-service-selector]');
        if (!root) return;

        const buttons = qsa('[data-selector-id]', root);
        const label = qs('[data-selector-label]', root);
        const title = qs('[data-selector-title]', root);
        const text = qs('[data-selector-text]', root);
        const link = qs('[data-selector-link]', root);

        if (!buttons.length || !label || !title || !text || !link) return;

        const setActive = (itemId) => {
            const item = selectorItems.find((entry) => entry.id === itemId) || selectorItems[0];
            const service = getServiceById(item.serviceId);

            buttons.forEach((button) => {
                const isActive = button.getAttribute('data-selector-id') === item.id;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            label.textContent = 'Matching suggestion';
            title.textContent = item.title;
            text.textContent = item.text;
            link.href = service?.file || 'contact.html#request-form';
            link.innerHTML = `
                <span>${service ? 'View Service' : 'Start Request'}</span>
                ${icon('arrow-up-right')}
            `;

            if (app.refreshIcons) {
                app.refreshIcons();
            }
        };

        buttons.forEach((button) => {
            const itemId = button.getAttribute('data-selector-id');

            button.addEventListener('click', () => setActive(itemId));

            button.addEventListener('mouseenter', () => {
                if (window.matchMedia('(hover: hover)').matches) {
                    setActive(itemId);
                }
            });
        });

        setActive(selectorItems[0].id);
    };

    const initServicesFaqSchema = () => {
        if (app.createFaqSchema) {
            app.createFaqSchema(servicesFaq);
        }
    };

    const init = () => {
        initServiceSelector();
        initServicesFaqSchema();

        if (app.initAccordions) {
            app.initAccordions(document);
        }

        if (app.refreshIcons) {
            app.refreshIcons();
        }

        if (window.AOS && typeof window.AOS.refreshHard === 'function') {
            setTimeout(() => window.AOS.refreshHard(), 300);
        }
    };

    window.MiraBathAllServices = {
        selectorItems,
        faq: servicesFaq,
        config
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();