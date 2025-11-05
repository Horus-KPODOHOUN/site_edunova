<?php
// Activer l'affichage des erreurs pour le debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Récupération des données
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : '';
    $subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
    
    // Validation
    $errors = [];
    if (empty($name)) $errors[] = "Nom requis";
    if (!$email) $errors[] = "Email invalide";
    if (empty($subject)) $errors[] = "Sujet requis";
    if (empty($message)) $errors[] = "Message requis";
    
    if (!empty($errors)) {
        echo "validation_error: " . implode(", ", $errors);
        exit;
    }
    
    // Configuration de l'email
    $to = "amadoubachad@gmail.com";
    $email_subject = "Nouveau message de contact: " . $subject;
    
    // Construction du message
    $email_message = "Vous avez reçu un nouveau message de contact.\n\n";
    $email_message .= "Nom: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Sujet: $subject\n\n";
    $email_message .= "Message:\n$message\n";
    
    // En-têtes
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Tentative d'envoi
    if (mail($to, $email_subject, $email_message, $headers)) {
        echo "success";
    } else {
        // Log l'erreur pour debug
        error_log("Erreur envoi email - To: $to, Subject: $email_subject");
        echo "error: L'email n'a pas pu être envoyé. Vérifiez la configuration du serveur.";
    }
    
} else {
    echo "Méthode non autorisée";
}
?>