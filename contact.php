<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| MiraBath contact form settings
|--------------------------------------------------------------------------
| Change this email to your real inbox after the domain email is created.
*/
$recipientEmail = 'support@mirabath.com';
$recipientName = 'MiraBath Request Desk';
$siteName = 'MiraBath';
$minSubmissionSeconds = 3;

function json_response(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

function field(string $key): string
{
    return trim((string)($_POST[$key] ?? ''));
}

function clean_text(string $value): string
{
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? '';
    $value = preg_replace('/\s+/', ' ', $value) ?? '';
    return trim($value);
}

function clean_message(string $value): string
{
    $value = strip_tags($value);
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace("/\n{3,}/", "\n\n", $value) ?? '';
    return trim($value);
}

function header_safe(string $value): string
{
    return str_replace(["\r", "\n"], '', $value);
}

function valid_phone_like(string $value): bool
{
    return (bool)preg_match('/^[0-9+\-\s().]{7,30}$/', $value);
}

/*
|--------------------------------------------------------------------------
| Honeypot anti-spam
|--------------------------------------------------------------------------
| Real users will not see or fill this field.
*/
$honeypot = field('website');

if ($honeypot !== '') {
    json_response(true, 'Thank you. Your request has been received.');
}

/*
|--------------------------------------------------------------------------
| Minimum submission timing anti-spam
|--------------------------------------------------------------------------
*/
$startedAt = (int)field('startedAt');

if ($startedAt > 0) {
    $elapsedSeconds = (time() * 1000 - $startedAt) / 1000;

    if ($elapsedSeconds < $minSubmissionSeconds) {
        json_response(false, 'Please review the form and try again.', 400);
    }
}

/*
|--------------------------------------------------------------------------
| Collect and sanitize fields
|--------------------------------------------------------------------------
*/
$fullName = clean_text(field('fullName'));
$email = filter_var(field('email'), FILTER_SANITIZE_EMAIL);
$phone = clean_text(field('phone'));
$service = clean_text(field('service'));
$message = clean_message(field('message'));
$sourcePage = clean_text(field('sourcePage'));
$privacyConsent = field('privacyConsent');

if ($sourcePage === '') {
    $sourcePage = 'MiraBath website request form';
}

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/
$errors = [];

if ($fullName === '' || mb_strlen($fullName) < 2 || mb_strlen($fullName) > 120) {
    $errors[] = 'fullName';
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 160) {
    $errors[] = 'email';
}

if ($phone === '' || !valid_phone_like($phone)) {
    $errors[] = 'phone';
}

if ($service === '' || mb_strlen($service) > 140) {
    $errors[] = 'service';
}

if ($message === '' || mb_strlen($message) < 10 || mb_strlen($message) > 3000) {
    $errors[] = 'message';
}

if ($privacyConsent === '') {
    $errors[] = 'privacyConsent';
}

if (!empty($errors)) {
    json_response(false, 'Please check the required fields and try again.', 422);
}

/*
|--------------------------------------------------------------------------
| Build email
|--------------------------------------------------------------------------
*/
$subject = 'New MiraBath Bathroom Request';

$emailBody = <<<EMAIL
New bathroom remodelling provider-matching request received from the MiraBath website.

Name:
{$fullName}

Email:
{$email}

Phone:
{$phone}

Requested Service Category:
{$service}

Message:
{$message}

Source Page:
{$sourcePage}

Consent:
The user checked the privacy consent box.

Important platform note:
MiraBath is an independent bathroom remodelling provider-matching platform. Submitting this request does not create a service agreement. Final pricing, scheduling, warranties, and service terms are provided by participating providers.

EMAIL;

$fromEmail = 'no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'mirabath.com');
$fromEmail = preg_replace('/[^a-zA-Z0-9@._-]/', '', $fromEmail) ?: 'no-reply@mirabath.com';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: ' . header_safe($siteName) . ' <' . header_safe($fromEmail) . '>';
$headers[] = 'Reply-To: ' . header_safe($fullName) . ' <' . header_safe($email) . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$headersString = implode("\r\n", $headers);

/*
|--------------------------------------------------------------------------
| Send email
|--------------------------------------------------------------------------
*/
$sent = false;

try {
    $sent = mail(
        $recipientEmail,
        '=?UTF-8?B?' . base64_encode($subject) . '?=',
        $emailBody,
        $headersString
    );
} catch (Throwable $exception) {
    $sent = false;
}

if (!$sent) {
    json_response(false, 'Your request could not be sent right now. Please try again later.', 500);
}

json_response(true, 'Thank you. Your request has been received.');
