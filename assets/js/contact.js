'use strict';

(function () {
    const app = window.MiraBath || {};
    const config = window.MiraBathConfig || {};

    const qs = (selector, scope = document) => scope.querySelector(selector);

    const contactFaq = [
        {
            question: 'What should I include in my message?',
            answer: 'Include the bathroom project type, what you want to change, timing goals, current concerns, and any material or layout preferences you already know.'
        },
        {
            question: 'Will I be contacted immediately?',
            answer: 'Response timing may vary by location, project details, and participating provider availability. MiraBath does not guarantee immediate contact.'
        },
        {
            question: 'Am I required to hire a provider?',
            answer: 'No. Submitting a request does not require you to hire a provider or continue with a service agreement.'
        },
        {
            question: 'Does MiraBath perform the work directly?',
            answer: 'No. MiraBath is an independent provider-matching platform and does not directly remodel bathrooms, install products, inspect projects, or perform service work.'
        },
        {
            question: 'What happens after I submit?',
            answer: 'Your request details may be reviewed and routed toward available participating provider options. Final pricing, scheduling, warranties, and service terms come from providers.'
        }
    ];

    const setMessage = (messageBox, type, text) => {
        if (!messageBox) return;

        messageBox.textContent = text;
        messageBox.classList.remove('is-success', 'is-error', 'is-visible');
        messageBox.classList.add('is-visible', type === 'success' ? 'is-success' : 'is-error');
        messageBox.setAttribute('role', type === 'success' ? 'status' : 'alert');
    };

    const clearMessage = (messageBox) => {
        if (!messageBox) return;

        messageBox.textContent = '';
        messageBox.classList.remove('is-success', 'is-error', 'is-visible');
        messageBox.removeAttribute('role');
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
    };

    const markFieldError = (field, hasError) => {
        if (!field) return;

        field.classList.toggle('has-error', hasError);

        const input = field.querySelector('input, textarea, select');

        if (input) {
            input.setAttribute('aria-invalid', String(hasError));
        }
    };

    const validateForm = (form) => {
        const fields = {
            fullName: form.elements.fullName,
            email: form.elements.email,
            phone: form.elements.phone,
            service: form.elements.service,
            message: form.elements.message,
            privacyConsent: form.elements.privacyConsent
        };

        let isValid = true;

        const requiredTextFields = [
            fields.fullName,
            fields.email,
            fields.phone,
            fields.service,
            fields.message
        ];

        requiredTextFields.forEach((input) => {
            const field = input?.closest('.form-field');
            const empty = !String(input?.value || '').trim();

            markFieldError(field, empty);

            if (empty) {
                isValid = false;
            }
        });

        if (fields.email && fields.email.value.trim() && !isValidEmail(fields.email.value)) {
            markFieldError(fields.email.closest('.form-field'), true);
            isValid = false;
        }

        const consentWrap = fields.privacyConsent?.closest('.checkbox-field');
        const consentMissing = !fields.privacyConsent?.checked;

        if (consentWrap) {
            consentWrap.classList.toggle('has-error', consentMissing);
        }

        if (fields.privacyConsent) {
            fields.privacyConsent.setAttribute('aria-invalid', String(consentMissing));
        }

        if (consentMissing) {
            isValid = false;
        }

        return isValid;
    };

    const initRequestForm = () => {
        const form = qs('[data-request-form]');
        if (!form) return;

        const messageBox = qs('[data-form-message]', form);
        const submitButton = qs('[data-form-submit]', form);
        const startedAtInput = form.elements.startedAt;

        if (startedAtInput) {
            startedAtInput.value = String(Date.now());
        }

        form.addEventListener('input', (event) => {
            const target = event.target;

            if (!target) return;

            const field = target.closest('.form-field');
            markFieldError(field, false);

            if (target.name === 'privacyConsent') {
                target.closest('.checkbox-field')?.classList.remove('has-error');
            }

            clearMessage(messageBox);
        });

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearMessage(messageBox);

            const minSeconds = Number(config.form?.minSubmissionSeconds || 3);
            const startedAt = Number(startedAtInput?.value || Date.now());
            const elapsedSeconds = (Date.now() - startedAt) / 1000;

            if (elapsedSeconds < minSeconds) {
                setMessage(messageBox, 'error', 'Please review the form and try again.');
                return;
            }

            if (!validateForm(form)) {
                setMessage(messageBox, 'error', 'Please check the required fields and try again.');
                return;
            }

            const honeypot = form.elements.website;
            if (honeypot && String(honeypot.value || '').trim()) {
                setMessage(messageBox, 'success', config.form?.successMessage || 'Thank you. Your request has been received.');
                form.reset();

                if (startedAtInput) {
                    startedAtInput.value = String(Date.now());
                }

                return;
            }

            const formData = new FormData(form);

            if (!formData.get('sourcePage')) {
                formData.set('sourcePage', config.form?.sourcePageDefault || document.title);
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.classList.add('is-loading');
                submitButton.dataset.originalText = submitButton.textContent;
                submitButton.textContent = 'Submitting...';
            }

            try {
                const response = await fetch(config.form?.endpoint || form.action || 'contact.php', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const contentType = response.headers.get('content-type') || '';
                const result = contentType.includes('application/json')
                    ? await response.json()
                    : {
                        success: response.ok,
                        message: response.ok
                            ? (config.form?.successMessage || 'Thank you. Your request has been received.')
                            : (config.form?.errorMessage || 'Please check the required fields and try again.')
                    };

                if (!response.ok || !result.success) {
                    throw new Error(result.message || config.form?.errorMessage || 'Please check the required fields and try again.');
                }

                setMessage(
                    messageBox,
                    'success',
                    result.message || config.form?.successMessage || 'Thank you. Your request has been received.'
                );

                form.reset();

                if (startedAtInput) {
                    startedAtInput.value = String(Date.now());
                }
            } catch (error) {
                setMessage(
                    messageBox,
                    'error',
                    error.message || config.form?.errorMessage || 'Please check the required fields and try again.'
                );
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.classList.remove('is-loading');
                    submitButton.textContent = submitButton.dataset.originalText || 'Submit Request';
                }
            }
        });
    };

    const initContactFaqSchema = () => {
        if (app.createFaqSchema) {
            app.createFaqSchema(contactFaq);
        }
    };

    const init = () => {
        initRequestForm();
        initContactFaqSchema();

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

    window.MiraBathContact = {
        faq: contactFaq,
        config
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();