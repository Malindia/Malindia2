<?php
 if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect input from the form
    $name = strip_tags(trim($_POST["Name"])); // Note the capital 'N'
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $country = $_POST["Country"]; // Ensure this matches the select name
    $telephone = trim($_POST["Telephone"]); // This field name has a trailing space and the word 'name', which seems incorrect
    $message = trim($_POST["message"]);

    // Validate the inputs
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message) || empty($country) || empty($telephone)) {
        // Error response
        http_response_code(400);
        echo "Please complete all required fields and try again.";
        exit;
    }

    // Prepare email content
    // Ensure the recipient email is correct
    $recipient = "info@malindia.com";
    $subject = "New Contact Submission";
    $email_content = "Name: $name\nEmail: $email\nCountry: $country\nTelephone: $telephone\nMessage: $message";

    // Send the email
    // Note: Ensure your server is configured to send emails
    if (mail($recipient, $subject, $email_content, "From: $email")) {
        http_response_code(200);
        echo "Thank you for your message. It has been sent.";
    } else {
        http_response_code(500);
        echo "Something went wrong, and we couldn't send your message.";
    }
 } 
 
 else {
    // Not a POST request
    http_response_code(403);
    echo "There was a problem with your submission. Please try again.";
}
?>
