<?php
// Simple placeholder handler for form submissions.
// In production, replace the mail() logic with your preferred mail service or CRM integration.

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /index.html');
    exit();
}

$required = ['name', 'telefon', 'nachricht'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        header('Location: /kontakt.html?status=error');
        exit();
    }
}

$name = strip_tags(trim($_POST['name']));
$telefon = strip_tags(trim($_POST['telefon']));
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$nachricht = strip_tags(trim($_POST['nachricht']));
$formType = isset($_POST['form_type']) ? strip_tags(trim($_POST['form_type'])) : 'karriere';

$subject = 'Neue Anfrage von Taxi Geßner Website';
$body = "Formular: {$formType}\n" .
        "Name: {$name}\n" .
        "Telefon: {$telefon}\n" .
        (!empty($email) ? "E-Mail: {$email}\n" : '') .
        "Nachricht:\n{$nachricht}\n";

$recipient = 'info@taxi-gessner.de';
$headers = 'From: noreply@taxi-gessner.de' . "\r\n" .
           'Reply-To: ' . (!empty($email) ? $email : 'noreply@taxi-gessner.de');

// mail($recipient, $subject, $body, $headers);

header('Location: /kontakt.html?status=success');
exit();
