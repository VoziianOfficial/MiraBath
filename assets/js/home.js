'use strict';

(function () {
    const app = window.MiraBath || {};
    const config = window.MiraBathConfig || {};

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const escapeHtml = app.escapeHtml || ((value) => String(value ?? ''));

    const icon = app.icon || ((name) => `<i data-lucide="${escapeHtml(name)}" aria-hidden="true"></i>`);

    const getServiceById = (serviceId) => {
        return (config.services || []).find((service) => service.id === serviceId);
    };

    const normalize = (value) => {
        return String(value || '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, ' ');
    };

    const initHeroSlides = () => {
        const slider = qs('[data-home-hero-slides]');
        if (!slider) return;

        const slides = qsa('[data-home-hero-slide]', slider);
        if (slides.length <= 1) return;

        let activeIndex = 0;

        const showSlide = (index) => {
            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('is-active', slideIndex === index);
            });
        };

        showSlide(activeIndex);

        window.setInterval(() => {
            activeIndex = (activeIndex + 1) % slides.length;
            showSlide(activeIndex);
        }, 5200);
    };

    const initServiceSearch = () => {
        const root = qs('[data-service-search]');
        if (!root) return;

        const input = qs('[data-service-search-input]', root);
        const suggestions = qs('[data-service-search-suggestions]', root);

        if (!input || !suggestions) return;

        let activeIndex = -1;
        let currentMatches = [];

        const services = config.services || [];

        const getMatches = (query) => {
            const normalizedQuery = normalize(query);

            if (!normalizedQuery) {
                return services.slice(0, 6);
            }

            return services.filter((service) => {
                const haystack = [
                    service.title,
                    service.shortTitle,
                    service.description,
                    ...(service.searchTerms || [])
                ]
                    .map(normalize)
                    .join(' ');

                return haystack.includes(normalizedQuery);
            });
        };

        const goToService = (service) => {
            if (!service || !service.file) return;
            window.location.href = service.file;
        };

        const renderSuggestions = (matches, query = '') => {
            currentMatches = matches;
            activeIndex = -1;

            if (!query.trim()) {
                suggestions.classList.remove('is-visible');
                suggestions.innerHTML = '';
                return;
            }

            suggestions.classList.add('is-visible');

            if (!matches.length) {
                suggestions.innerHTML = `
                    <div class="home-search__empty" role="status">
                        No exact match yet. Try “shower”, “tile”, “tub”, or “vanity”.
                    </div>
                `;
                return;
            }

            suggestions.innerHTML = matches
                .map((service, index) => {
                    return `
                        <button class="home-search__suggestion" type="button" data-suggestion-index="${index}">
                            <span>${escapeHtml(service.title)}</span>
                            ${icon(service.icon || 'arrow-up-right')}
                        </button>
                    `;
                })
                .join('');

            qsa('[data-suggestion-index]', suggestions).forEach((button) => {
                button.addEventListener('click', () => {
                    const index = Number(button.getAttribute('data-suggestion-index'));
                    goToService(currentMatches[index]);
                });
            });

            if (app.refreshIcons) {
                app.refreshIcons();
            }
        };

        input.addEventListener('input', () => {
            const query = input.value;
            renderSuggestions(getMatches(query), query);
        });

        input.addEventListener('focus', () => {
            if (input.value.trim()) {
                renderSuggestions(getMatches(input.value), input.value);
            }
        });

        input.addEventListener('keydown', (event) => {
            const buttons = qsa('[data-suggestion-index]', suggestions);

            if (event.key === 'ArrowDown') {
                event.preventDefault();

                if (!buttons.length) return;

                activeIndex = (activeIndex + 1) % buttons.length;

                buttons.forEach((button, index) => {
                    button.classList.toggle('is-active', index === activeIndex);
                });

                buttons[activeIndex]?.scrollIntoView({
                    block: 'nearest'
                });
            }

            if (event.key === 'ArrowUp') {
                event.preventDefault();

                if (!buttons.length) return;

                activeIndex = activeIndex <= 0 ? buttons.length - 1 : activeIndex - 1;

                buttons.forEach((button, index) => {
                    button.classList.toggle('is-active', index === activeIndex);
                });

                buttons[activeIndex]?.scrollIntoView({
                    block: 'nearest'
                });
            }

            if (event.key === 'Enter') {
                event.preventDefault();

                if (activeIndex >= 0 && currentMatches[activeIndex]) {
                    goToService(currentMatches[activeIndex]);
                    return;
                }

                const bestMatch = getMatches(input.value)[0];

                if (bestMatch) {
                    goToService(bestMatch);
                    return;
                }

                renderSuggestions([], input.value);
            }

            if (event.key === 'Escape') {
                suggestions.classList.remove('is-visible');
            }
        });

        document.addEventListener('click', (event) => {
            if (!root.contains(event.target)) {
                suggestions.classList.remove('is-visible');
            }
        });
    };

    const initPopularProblems = () => {
        const root = qs('[data-popular-problems]');
        if (!root) return;

        const buttons = qsa('[data-problem-id]', root);
        const title = qs('[data-problem-title]', root);
        const text = qs('[data-problem-text]', root);
        const link = qs('[data-problem-link]', root);

        const problems = config.homepage?.popularProblems || [];

        if (!buttons.length || !title || !text || !link || !problems.length) return;

        const setActive = (problemId) => {
            const problem = problems.find((item) => item.id === problemId) || problems[0];
            const service = getServiceById(problem.serviceId);

            buttons.forEach((button) => {
                button.classList.toggle('is-active', button.getAttribute('data-problem-id') === problem.id);
                button.setAttribute(
                    'aria-pressed',
                    String(button.getAttribute('data-problem-id') === problem.id)
                );
            });

            title.textContent = problem.title;
            text.textContent = problem.text;
            link.href = service?.file || 'all-services.html';
            link.innerHTML = `
                <span>View matching service</span>
                ${icon('arrow-up-right')}
            `;

            if (app.refreshIcons) {
                app.refreshIcons();
            }
        };

        buttons.forEach((button) => {
            const problemId = button.getAttribute('data-problem-id');

            button.addEventListener('click', () => setActive(problemId));

            button.addEventListener('mouseenter', () => {
                if (window.matchMedia('(hover: hover)').matches) {
                    setActive(problemId);
                }
            });
        });

        setActive(problems[0].id);
    };

    const initFaqSwiper = () => {
        const slider = qs('[data-home-faq-swiper]');
        if (!slider || !window.Swiper) return;

        const nextEl = qs('[data-home-faq-next]');
        const prevEl = qs('[data-home-faq-prev]');

        new window.Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 16,
            speed: 700,
            grabCursor: true,
            watchOverflow: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl,
                prevEl
            },
            breakpoints: {
                681: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
                1180: {
                    slidesPerView: 2,
                    spaceBetween: 22
                }
            }
        });
    };

    const addHomepageFaqSchema = () => {
        if (app.createFaqSchema && config.homepage?.faq) {
            app.createFaqSchema(config.homepage.faq);
        }
    };

    const init = () => {
        initHeroSlides();
        initServiceSearch();
        initPopularProblems();
        initFaqSwiper();
        addHomepageFaqSchema();

        if (app.refreshIcons) {
            app.refreshIcons();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();