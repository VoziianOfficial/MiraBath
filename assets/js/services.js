'use strict';

(function () {
    const app = window.MiraBath || {};
    const config = window.MiraBathConfig || {};

    const qs = (selector, scope = document) => scope.querySelector(selector);

    const serviceFaq = [
        {
            question: 'Does MiraBath provide this service directly?',
            answer: 'No. MiraBath is an independent bathroom remodelling provider-matching platform and does not directly remodel bathrooms, install products, inspect projects, or perform service work.'
        },
        {
            question: 'Can I compare multiple providers?',
            answer: 'Where available, your request may help you compare participating provider options before deciding whether to continue.'
        },
        {
            question: 'What affects pricing?',
            answer: 'Pricing can depend on bathroom size, current layout, material choices, plumbing or electrical complexity, timing, availability, and final provider terms.'
        },
        {
            question: 'Should I verify credentials?',
            answer: 'Yes. Homeowners are responsible for verifying licensing, insurance, warranties, and qualifications before hiring any provider.'
        },
        {
            question: 'What happens after I submit?',
            answer: 'Your request details may be reviewed and routed toward available participating provider options. Final pricing, scheduling, warranties, and service terms come from providers.'
        }
    ];

    const servicePageData = {
        'complete-bathroom-remodel.html': {
            id: 'complete-remodel',
            faq: serviceFaq,
            slides: [
                {
                    title: 'Outdated Layout',
                    text: 'Older bathroom layouts may feel cramped, dark, or difficult to use. Submit project details and compare provider options for a more complete update.',
                    icon: 'layout-dashboard',
                    tags: ['Layout', 'Function', 'Full update']
                },
                {
                    title: 'Worn Surfaces',
                    text: 'Tile, flooring, countertops, shower areas, and wall surfaces can affect the look and comfort of the room.',
                    icon: 'sparkles',
                    tags: ['Tile', 'Surfaces', 'Finishes']
                },
                {
                    title: 'Limited Storage',
                    text: 'Vanity, shelving, cabinets, and linen storage needs can be included when comparing full bathroom remodel options.',
                    icon: 'panel-top',
                    tags: ['Vanity', 'Cabinetry', 'Storage']
                },
                {
                    title: 'Fixture Updates',
                    text: 'Faucets, lighting, shower fixtures, bath fixtures, mirrors, and accessories can be part of a complete bathroom request.',
                    icon: 'lamp',
                    tags: ['Fixtures', 'Lighting', 'Details']
                },
                {
                    title: 'Full Style Refresh',
                    text: 'A complete remodel request can help compare options for a more cohesive spa-inspired, modern, or refined bathroom direction.',
                    icon: 'droplets',
                    tags: ['Style', 'Comfort', 'Compare']
                }
            ]
        },

        'shower-remodelling.html': {
            id: 'shower-remodelling',
            faq: serviceFaq,
            slides: [
                {
                    title: 'Old Shower Area',
                    text: 'A worn shower area can affect comfort, style, and daily use. Compare provider options for refreshed shower finishes and layout details.',
                    icon: 'shower-head',
                    tags: ['Shower', 'Refresh', 'Daily use']
                },
                {
                    title: 'New Glass or Door',
                    text: 'Glass, doors, entry style, and enclosure details can change the overall look and function of a shower-focused update.',
                    icon: 'scan-line',
                    tags: ['Glass', 'Door', 'Enclosure']
                },
                {
                    title: 'Tile Refresh',
                    text: 'Shower tile, grout lines, wall surfaces, niches, and waterproof finishes can be compared as part of your request.',
                    icon: 'grid-3x3',
                    tags: ['Tile', 'Walls', 'Finish']
                },
                {
                    title: 'Layout Change',
                    text: 'Some shower requests involve a changed footprint, entry direction, seating, shelving, or improved usability.',
                    icon: 'move-diagonal',
                    tags: ['Layout', 'Access', 'Function']
                },
                {
                    title: 'Fixture Update',
                    text: 'Shower heads, controls, trim, drains, and accessories may affect the final provider quote and project details.',
                    icon: 'droplets',
                    tags: ['Fixtures', 'Controls', 'Details']
                }
            ]
        },

        'bathtub-replacement.html': {
            id: 'bathtub-replacement',
            faq: serviceFaq,
            slides: [
                {
                    title: 'Old or Worn Tub',
                    text: 'A scratched, stained, cracked, or outdated bathtub can be included in a replacement request for provider comparison.',
                    icon: 'bath',
                    tags: ['Tub', 'Replacement', 'Condition']
                },
                {
                    title: 'Hard-to-Use Bath',
                    text: 'Some homeowners compare tub replacement options because the current bath is uncomfortable, awkward, or difficult to enter.',
                    icon: 'accessibility',
                    tags: ['Comfort', 'Use', 'Access']
                },
                {
                    title: 'Style Update',
                    text: 'Bathtub replacement can be part of a cleaner, calmer, more refined bathroom style direction.',
                    icon: 'sparkles',
                    tags: ['Style', 'Finish', 'Refresh']
                },
                {
                    title: 'Material Choices',
                    text: 'Provider options may vary based on bathtub type, surround materials, wall finishes, and fixture selections.',
                    icon: 'layers',
                    tags: ['Materials', 'Surround', 'Fixtures']
                },
                {
                    title: 'Bathroom Fit',
                    text: 'Existing layout, alcove size, plumbing placement, and room dimensions can affect available bathtub replacement options.',
                    icon: 'ruler',
                    tags: ['Size', 'Layout', 'Fit']
                }
            ]
        },

        'tub-to-shower-conversion.html': {
            id: 'tub-to-shower',
            faq: serviceFaq,
            slides: [
                {
                    title: 'Tub Area Conversion',
                    text: 'A bathtub area can become a shower-focused request when daily use, access, or layout goals change.',
                    icon: 'move-diagonal',
                    tags: ['Conversion', 'Tub area', 'Shower']
                },
                {
                    title: 'Walk-In Shower Goal',
                    text: 'Some requests focus on a lower-threshold shower, cleaner access, glass details, and a more open bathroom feel.',
                    icon: 'shower-head',
                    tags: ['Walk-in', 'Access', 'Open feel']
                },
                {
                    title: 'Wall and Floor Finish',
                    text: 'Tile, panels, waterproofing, floor slope, and shower surface details can influence provider options.',
                    icon: 'grid-3x3',
                    tags: ['Tile', 'Waterproofing', 'Floor']
                },
                {
                    title: 'Fixture Placement',
                    text: 'Controls, shower heads, niches, grab bars, and storage details may be discussed with participating providers.',
                    icon: 'droplet',
                    tags: ['Controls', 'Fixtures', 'Storage']
                },
                {
                    title: 'Existing Conditions',
                    text: 'Plumbing location, wall condition, floor structure, and current bathtub setup may affect final provider terms.',
                    icon: 'scan-search',
                    tags: ['Existing setup', 'Scope', 'Terms']
                }
            ]
        },

        'bathroom-tile-flooring.html': {
            id: 'tile-flooring',
            faq: serviceFaq,
            slides: [
                {
                    title: 'Worn Tile',
                    text: 'Cracked, dated, stained, or uneven tile can be included in a tile and flooring request for provider comparison.',
                    icon: 'grid-3x3',
                    tags: ['Tile', 'Condition', 'Surface']
                },
                {
                    title: 'Flooring Update',
                    text: 'Bathroom flooring choices may affect style, comfort, waterproofing, and long-term maintenance expectations.',
                    icon: 'panels-top-left',
                    tags: ['Flooring', 'Waterproof', 'Material']
                },
                {
                    title: 'Wall Surface Changes',
                    text: 'Tile walls, shower surrounds, backsplash areas, and accent surfaces can be part of a surface-focused request.',
                    icon: 'layout-panel-top',
                    tags: ['Walls', 'Backsplash', 'Surround']
                },
                {
                    title: 'Material Direction',
                    text: 'Stone-look tile, porcelain, ceramic, matte surfaces, and spa-inspired finishes can be compared through provider options.',
                    icon: 'sparkles',
                    tags: ['Stone look', 'Porcelain', 'Style']
                },
                {
                    title: 'Installation Details',
                    text: 'Subfloor condition, waterproofing, transitions, trim, layout pattern, and grout choices may affect final quote details.',
                    icon: 'ruler',
                    tags: ['Pattern', 'Grout', 'Scope']
                }
            ]
        },

        'vanity-storage-upgrades.html': {
            id: 'vanity-storage',
            faq: serviceFaq,
            slides: [
                {
                    title: 'Outdated Vanity',
                    text: 'An old vanity can affect the entire bathroom look. Compare options for updated cabinetry, counters, sinks, and finishes.',
                    icon: 'panel-top',
                    tags: ['Vanity', 'Counter', 'Sink']
                },
                {
                    title: 'Limited Storage',
                    text: 'Small or poorly planned storage can make a bathroom feel cluttered. Include cabinets, drawers, shelves, and linen needs in your request.',
                    icon: 'archive',
                    tags: ['Storage', 'Cabinetry', 'Organization']
                },
                {
                    title: 'Counter Space Needs',
                    text: 'Countertop size, sink style, mirror placement, and lighting can affect how useful the vanity area feels.',
                    icon: 'ruler',
                    tags: ['Counter', 'Sink', 'Use']
                },
                {
                    title: 'Style Upgrade',
                    text: 'Vanity and storage updates can help create a more refined, spa-like, or custom interior look.',
                    icon: 'sparkles',
                    tags: ['Style', 'Finish', 'Interior']
                },
                {
                    title: 'Layout Fit',
                    text: 'Wall length, plumbing placement, door swing, and existing bathroom layout can influence final provider options.',
                    icon: 'layout-dashboard',
                    tags: ['Layout', 'Fit', 'Provider terms']
                }
            ]
        }
    };

    const getCurrentPageKey = () => {
        const page = (window.location.pathname.split('/').pop() || '').trim();
        return page || 'complete-bathroom-remodel.html';
    };

    const getCurrentServiceData = () => {
        const key = getCurrentPageKey();
        return servicePageData[key] || servicePageData['complete-bathroom-remodel.html'];
    };

    const initServiceOverviewSwiper = () => {
        const slider = qs('[data-service-overview-swiper]');
        if (!slider || !window.Swiper) return;

        const pagination = qs('[data-service-overview-pagination]');

        new window.Swiper(slider, {
            direction: 'vertical',
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 720,
            autoHeight: false,
            watchOverflow: true,
            mousewheel: {
                forceToAxis: true,
                releaseOnEdges: true
            },
            pagination: {
                el: pagination,
                clickable: true
            },
            breakpoints: {
                0: {
                    direction: 'horizontal',
                    autoHeight: true
                },
                721: {
                    direction: 'vertical',
                    autoHeight: false
                }
            }
        });
    };

    const initServiceFaqSchema = () => {
        const current = getCurrentServiceData();

        if (app.createFaqSchema) {
            app.createFaqSchema(current.faq || serviceFaq);
        }
    };

    const init = () => {
        initServiceOverviewSwiper();
        initServiceFaqSchema();

        if (app.initAccordions) {
            app.initAccordions(document);
        }

        if (app.refreshIcons) {
            app.refreshIcons();
        }

        if (window.AOS && typeof window.AOS.refreshHard === 'function') {
            setTimeout(() => window.AOS.refreshHard(), 350);
        }
    };

    window.MiraBathServices = {
        servicePageData,
        faq: serviceFaq,
        getCurrentServiceData
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();