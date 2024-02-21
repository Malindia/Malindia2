const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post("/api/submit", (req, res) => {
    console.log(req.body);
    const formData = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: emailUser,
            pass: emailPassword,
        },
    });

    // Create the HTML email template
    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        .header {
            background-color: #560bad;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        .field {
            margin-bottom: 10px;
        }
        .field strong {
            color: #560bad;
        }
        @media only screen and (max-width: 600px) {
            .container {
                width: 95%;
                margin: 20px auto;
                padding: 10px;
            }
            .content {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Contact Form Submission</h2>
        </div>
        <div class="content">
            <div class="field">
                <strong>Name:</strong> ${formData.Name}
            </div>
            <div class="field">
                <strong>Email:</strong> ${formData.email}
            </div>
            <div class="field">
                <strong>Country:</strong> ${formData.Country}
            </div>
            <div class="field">
                <strong>Telephone:</strong> ${formData.telephone}
            </div>
            <div class="field">
                <strong>Message:</strong> ${formData.message}
            </div>
        </div>
    </div>
</body>
</html>
`;
    // Setup email data
    const mailOptions = {
        from: "emmanuel4cheru@gmail.com",
        to: "ally@tlink.dk,emmanuel4cheru@gmail.com",
        subject: "New Contact Form Submission",
        html: emailHTML,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.sendFile(__dirname + '/error.html'); // Make sure the path is correct
        } else {
            console.log("Email sent:", info.response);
            return res.sendFile(__dirname + '/success.html'); // Make sure the path is correct
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
