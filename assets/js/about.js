'use strict';

(function () {
    const app = window.MiraBath || {};
    const config = window.MiraBathConfig || {};

    const qs = (selector, scope = document) => scope.querySelector(selector);

    const aboutFaq = [
        {
            question: 'Is MiraBath a contractor?',
            answer: 'No. MiraBath is an independent bathroom remodelling provider-matching platform. It helps homeowners submit project details and compare available provider options.'
        },
        {
            question: 'Do I have to choose a provider?',
            answer: 'No. Submitting a request does not require you to continue with a provider. You can review available details and decide your next step.'
        },
        {
            question: 'What information should I include?',
            answer: 'Helpful details include project type, bathroom size, current concerns, preferred materials, timing goals, and any accessibility or storage needs.'
        },
        {
            question: 'Does availability vary by location?',
            answer: 'Yes. Provider availability, response timing, service categories, and quote options may vary by location and participating provider coverage.'
        },
        {
            question: 'Who provides final pricing?',
            answer: 'Final pricing, scheduling, warranties, licensing details, insurance information, and service terms are provided by participating providers.'
        }
    ];

    const initCompareSwiper = () => {
        const slider = qs('[data-about-compare-swiper]');
        if (!slider || !window.Swiper) return;

        const nextEl = qs('[data-about-compare-next]');
        const prevEl = qs('[data-about-compare-prev]');

        new window.Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 18,
            speed: 720,
            grabCursor: true,
            watchOverflow: true,
            autoHeight: true,
            navigation: {
                nextEl,
                prevEl
            }
        });
    };

    const initAboutFaqSchema = () => {
        if (app.createFaqSchema) {
            app.createFaqSchema(aboutFaq);
        }
    };

    const init = () => {
        initCompareSwiper();
        initAboutFaqSchema();

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

    window.MiraBathAbout = {
        faq: aboutFaq,
        config
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();