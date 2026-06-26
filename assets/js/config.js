'use strict';

window.MiraBathConfig = {
    brand: {
        name: 'MiraBath',
        tagline: 'Independent Bathroom Remodelling Provider Matching',
        shortTagline: 'Bathroom Provider Matching',
        logo: 'assets/images/logo.svg',
        logoAlt: 'MiraBath logo'
    },

    company: {
        name: 'MiraBath',
        legalName: 'MiraBath Provider Matching',
        companyId: 'MB-BATH-2026',
        address: 'United States Service Area',
        serviceArea: 'Independent bathroom remodelling provider.',
        supportHours: 'Mon–Fri, 8:00 AM–7:00 PM',
        mapQuery: 'United States'
    },

    contact: {
        phoneRaw: '+18885550192',
        phoneDisplay: '(888) 555-0192',
        phoneButtonText: 'Start Request',
        email: 'support@mirabath.com',
        mailSubject: 'Bathroom remodelling request'
    },

    form: {
        endpoint: 'contact.php',
        recipientLabel: 'MiraBath Request Desk',
        sourcePageDefault: 'MiraBath website request form',
        minSubmissionSeconds: 3,
        successMessage: 'Thank you. Your request has been received.',
        errorMessage: 'Please check the required fields and try again.'
    },

    pages: {
        home: 'index.html',
        about: 'about.html',
        services: 'all-services.html',
        contact: 'contact.html',
        privacy: 'privacy-policy.html',
        terms: 'terms-of-service.html',
        cookies: 'cookie-policy.html'
    },

    legal: {
        disclaimer: 'Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.',
        shortDisclaimer: 'MiraBath is an independent provider-matching platform. Final pricing, scheduling, warranties, and service terms are provided by participating providers.',
        privacyUpdated: 'Updated 2026',
        termsUpdated: 'Updated 2026',
        cookiesUpdated: 'Updated 2026'
    },

    footer: {
        description: 'MiraBath helps homeowners submit bathroom remodelling project details and compare available local provider options through an independent matching platform.',
        copyright: '© 2026 MiraBath. All rights reserved.'
    },

    services: [
        {
            id: 'complete-remodel',
            title: 'Complete Bathroom Remodel',
            shortTitle: 'Complete Remodel',
            file: 'complete-bathroom-remodel.html',
            icon: 'layout-panel-left',
            image: 'assets/images/services-overview-1.jpg',
            heroImage: 'assets/images/hero-complete-remodel.jpg',
            searchTerms: ['complete bathroom remodel', 'full bathroom remodel', 'full update', 'layout', 'bathroom renovation'],
            description: 'Compare provider options for a full bathroom update, including layout, surfaces, fixtures, storage, and finishing details.',
            hero: {
                kicker: 'COMPLETE BATHROOM REMODEL',
                heading: 'Complete Remodel',
                text: 'Compare provider options for a full bathroom update, from layout and surfaces to fixtures, storage, and finishing details.'
            }
        },
        {
            id: 'shower-remodelling',
            title: 'Shower Remodelling',
            shortTitle: 'Shower Update',
            file: 'shower-remodelling.html',
            icon: 'shower-head',
            image: 'assets/images/services-overview-2.jpg',
            heroImage: 'assets/images/hero-shower-remodelling.jpg',
            searchTerms: ['shower remodelling', 'shower remodel', 'shower update', 'glass shower', 'shower tile'],
            description: 'Submit shower remodelling details and compare available provider options for shower layouts, finishes, doors, tile, and fixtures.',
            hero: {
                kicker: 'SHOWER REMODELLING',
                heading: 'Shower Update',
                text: 'Submit shower remodelling details and compare available provider options for new shower layouts, finishes, doors, tile, and fixtures.'
            }
        },
        {
            id: 'bathtub-replacement',
            title: 'Bathtub Replacement',
            shortTitle: 'Bath Replacement',
            file: 'bathtub-replacement.html',
            icon: 'bath',
            image: 'assets/images/services-overview-3.jpg',
            heroImage: 'assets/images/hero-bathtub-replacement.jpg',
            searchTerms: ['bathtub replacement', 'bath replacement', 'replace tub', 'old tub', 'new bathtub'],
            description: 'Compare provider options for replacing an old, damaged, outdated, or difficult-to-use bathtub.',
            hero: {
                kicker: 'BATHTUB REPLACEMENT',
                heading: 'Bath Replacement',
                text: 'Compare provider options for replacing an old, damaged, outdated, or difficult-to-use bathtub with a better-fitting solution.'
            }
        },
        {
            id: 'tub-to-shower',
            title: 'Tub-to-Shower Conversion',
            shortTitle: 'Shower Conversion',
            file: 'tub-to-shower-conversion.html',
            icon: 'move-diagonal',
            image: 'assets/images/services-overview-4.jpg',
            heroImage: 'assets/images/hero-tub-to-shower.jpg',
            searchTerms: ['tub to shower conversion', 'convert tub to shower', 'walk in shower', 'shower conversion'],
            description: 'Start a request for converting a bathtub area into a shower space and compare available provider options.',
            hero: {
                kicker: 'TUB-TO-SHOWER CONVERSION',
                heading: 'Shower Conversion',
                text: 'Start a request for converting a bathtub area into a shower space and compare available provider options in your area.'
            }
        },
        {
            id: 'tile-flooring',
            title: 'Bathroom Tile & Flooring',
            shortTitle: 'Tile Flooring',
            file: 'bathroom-tile-flooring.html',
            icon: 'grid-3x3',
            image: 'assets/images/services-overview-5.jpg',
            heroImage: 'assets/images/hero-tile-flooring.jpg',
            searchTerms: ['bathroom tile', 'bathroom flooring', 'floor tile', 'tile update', 'waterproof flooring'],
            description: 'Compare provider options for bathroom tile, flooring, surface updates, waterproof finishes, and style-focused material changes.',
            hero: {
                kicker: 'BATHROOM TILE & FLOORING',
                heading: 'Tile Flooring',
                text: 'Compare provider options for bathroom tile, flooring, surface updates, waterproof finishes, and style-focused material changes.'
            }
        },
        {
            id: 'vanity-storage',
            title: 'Vanity & Storage Upgrades',
            shortTitle: 'Vanity Storage',
            file: 'vanity-storage-upgrades.html',
            icon: 'panel-top',
            image: 'assets/images/services-overview-6.jpg',
            heroImage: 'assets/images/hero-vanity-storage.jpg',
            searchTerms: ['vanity storage', 'bathroom vanity', 'storage upgrades', 'cabinet', 'bathroom cabinets'],
            description: 'Submit vanity or storage upgrade details and compare local provider options for a more functional bathroom layout.',
            hero: {
                kicker: 'VANITY & STORAGE UPGRADES',
                heading: 'Vanity Storage',
                text: 'Submit vanity or storage upgrade details and compare local provider options for a more functional and refined bathroom layout.'
            }
        }
    ],

    mainNavigation: [
        {
            label: 'Home',
            url: 'index.html'
        },
        {
            label: 'About',
            url: 'about.html'
        },
        {
            label: 'Services',
            url: 'all-services.html',
            hasDropdown: true
        },
        {
            label: 'Contact',
            url: 'contact.html'
        }
    ],

    legalNavigation: [
        {
            label: 'Privacy Policy',
            url: 'privacy-policy.html'
        },
        {
            label: 'Terms of Service',
            url: 'terms-of-service.html'
        },
        {
            label: 'Cookie Policy',
            url: 'cookie-policy.html'
        }
    ],

    homepage: {
        heroSlides: [
            {
                image: 'assets/images/hero-home-1.jpg',
                alt: 'Luxury bathroom interior with refined tile and calm spa-inspired surfaces'
            },
            {
                image: 'assets/images/hero-home-2.jpg',
                alt: 'Modern shower and bathtub remodel design with clean premium finishes'
            },
            {
                image: 'assets/images/hero-home-3.jpg',
                alt: 'Bright bathroom interior with vanity storage and polished remodelling details'
            }
        ],

        popularProblems: [
            {
                id: 'outdated-layout',
                title: 'Outdated Layout',
                icon: 'layout-dashboard',
                serviceId: 'complete-remodel',
                text: 'Older bathrooms can feel cramped, dim, or difficult to use. MiraBath helps you compare provider options for full remodel requests, layout updates, and surface changes.'
            },
            {
                id: 'old-shower-area',
                title: 'Old Shower Area',
                icon: 'shower-head',
                serviceId: 'shower-remodelling',
                text: 'A worn shower area can affect comfort, style, and daily use. Submit your shower-focused details and compare available provider options for materials, doors, tile, and fixtures.'
            },
            {
                id: 'worn-tub',
                title: 'Worn Tub',
                icon: 'bath',
                serviceId: 'bathtub-replacement',
                text: 'If an existing bathtub feels outdated, damaged, or hard to use, MiraBath can help you start a replacement request and review available local provider options.'
            },
            {
                id: 'tile-storage-gaps',
                title: 'Tile & Storage Gaps',
                icon: 'panel-top',
                serviceId: 'vanity-storage',
                text: 'Surface wear, limited storage, and unfinished details can make a bathroom feel less refined. Compare options for tile, flooring, vanity, and storage-focused upgrades.'
            }
        ],

        matchingSteps: [
            {
                title: 'Submit Project Details',
                icon: 'clipboard-list',
                text: 'Share the type of bathroom update you are considering.'
            },
            {
                title: 'Request Gets Routed',
                icon: 'route',
                text: 'Your details may be routed toward available provider options.'
            },
            {
                title: 'Compare Options',
                icon: 'search-check',
                text: 'Review quote details, scope, timing, and provider terms.'
            },
            {
                title: 'Choose Next Step',
                icon: 'badge-check',
                text: 'Decide whether to continue with a participating provider.'
            }
        ],

        compareItems: [
            {
                title: 'Scope',
                text: 'Compare what is included and excluded.'
            },
            {
                title: 'Materials',
                text: 'Review tile, fixtures, surface, and finish options.'
            },
            {
                title: 'Timing',
                text: 'Ask about availability and estimated scheduling.'
            },
            {
                title: 'Terms',
                text: 'Check warranty, cleanup, licensing, insurance, and provider terms.'
            }
        ],

        faq: [
            {
                question: 'Does MiraBath remodel bathrooms directly?',
                answer: 'No. MiraBath is an independent bathroom remodelling provider-matching platform. The platform helps homeowners submit project details and compare available provider options.'
            },
            {
                question: 'What happens after I submit a request?',
                answer: 'Your request details may be reviewed and routed toward available participating provider options. Any final pricing, scheduling, and service terms come from those providers.'
            },
            {
                question: 'Can I compare more than one provider?',
                answer: 'Where available, you may review more than one provider option and decide whether to continue with a participating provider.'
            },
            {
                question: 'What affects bathroom remodelling pricing?',
                answer: 'Pricing can depend on scope, bathroom size, materials, layout complexity, timing, provider availability, and final provider terms.'
            },
            {
                question: 'Should I verify licensing and insurance?',
                answer: 'Yes. Homeowners are responsible for verifying that any hired provider has the required license and insurance for the work being performed.'
            },
            {
                question: 'Does submitting a request create a service agreement?',
                answer: 'No. Submitting a request through MiraBath does not create a service agreement. Any agreement is made separately between the homeowner and provider.'
            }
        ]
    },

    finalCta: {
        image: 'assets/images/cta-bathroom.jpg',
        heading: 'Ready to compare bathroom options?',
        text: 'Submit your project details and review available local provider options through MiraBath’s independent matching platform.',
        primaryLabel: 'Start Request',
        primaryUrl: 'contact.html#request-form',
        secondaryLabel: 'View Services',
        secondaryUrl: 'all-services.html'
    },

    cookieConsent: {
        storageKey: 'mirabath_cookie_consent',
        text: 'MiraBath uses essential cookies and local storage to keep this website functional and remember your cookie choice.',
        acceptLabel: 'Accept',
        declineLabel: 'Decline',
        privacyUrl: 'privacy-policy.html',
        cookieUrl: 'cookie-policy.html',
        termsUrl: 'terms-of-service.html'
    }
};