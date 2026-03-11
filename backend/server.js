const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all required fields' 
    });
  }

  try {
    // Email to admin (your emails)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: `${process.env.RECIPIENT_EMAIL_1}, ${process.env.RECIPIENT_EMAIL_2}`,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #9333ea 0%, #f97316 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border: 1px solid #e5e7eb;
            }
            .info-row {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-radius: 8px;
              border-left: 4px solid #9333ea;
            }
            .label {
              font-weight: bold;
              color: #9333ea;
              margin-bottom: 5px;
            }
            .value {
              color: #374151;
              font-size: 15px;
            }
            .footer {
              background: #111827;
              color: #9ca3af;
              padding: 20px;
              text-align: center;
              border-radius: 0 0 10px 10px;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🎉 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px;">You have received a new inquiry</p>
          </div>
          
          <div class="content">
            <div class="info-row">
              <div class="label">👤 Name:</div>
              <div class="value">${firstName} ${lastName}</div>
            </div>
            
            <div class="info-row">
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:${email}" style="color: #9333ea; text-decoration: none;">${email}</a></div>
            </div>
            
            ${phone ? `
            <div class="info-row">
              <div class="label">📱 Phone:</div>
              <div class="value"><a href="tel:${phone}" style="color: #9333ea; text-decoration: none;">${phone}</a></div>
            </div>
            ` : ''}
            
            ${message ? `
            <div class="info-row">
              <div class="label">💬 Message:</div>
              <div class="value" style="white-space: pre-wrap;">${message}</div>
            </div>
            ` : ''}
            
            <div class="info-row">
              <div class="label">🕐 Submitted:</div>
              <div class="value">${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</div>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">This email was sent from your website contact form</p>
            <p style="margin: 5px 0 0 0;">© 2024 New Company. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    };

    // Email to user (auto-reply)
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Us - New Company',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #9333ea 0%, #f97316 100%);
              color: white;
              padding: 40px 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #ffffff;
              padding: 40px 30px;
              border: 1px solid #e5e7eb;
            }
            .message-box {
              background: #f3f4f6;
              border-left: 4px solid #9333ea;
              padding: 20px;
              margin: 20px 0;
              border-radius: 5px;
            }
            .footer {
              background: #111827;
              color: #9ca3af;
              padding: 30px;
              text-align: center;
              border-radius: 0 0 10px 10px;
            }
            .social-links {
              margin-top: 20px;
            }
            .social-links a {
              color: #9333ea;
              text-decoration: none;
              margin: 0 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">✨ Thank You for Reaching Out!</h1>
            <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.95;">We've received your message</p>
          </div>
          
          <div class="content">
            <h2 style="color: #9333ea; margin-top: 0;">Hello ${firstName},</h2>
            
            <p style="font-size: 16px; color: #374151;">
              Thank you for contacting <strong>New Company</strong>! We're excited to hear from you.
            </p>
            
            <div class="message-box">
              <p style="margin: 0; font-size: 15px; color: #1f2937;">
                <strong>🎯 What's Next?</strong><br>
                Our team will review your inquiry and get back to you within 24-48 hours. 
                We're committed to providing you with the best service possible.
              </p>
            </div>
            
            <p style="font-size: 15px; color: #6b7280;">
              In the meantime, feel free to explore our services and recent projects on our website.
            </p>
            
            <p style="font-size: 15px; color: #374151; margin-top: 30px;">
              <strong>Your Details:</strong><br>
              Name: ${firstName} ${lastName}<br>
              Email: ${email}<br>
              ${phone ? `Phone: ${phone}<br>` : ''}
            </p>
            
            <p style="font-size: 15px; color: #374151; margin-top: 30px;">
              Best regards,<br>
              <strong style="color: #9333ea;">The New Company Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0; font-size: 14px;">Need immediate assistance?</p>
            <p style="margin: 0; font-size: 13px; color: #d1d5db;">
              Email: <a href="mailto:akshaysj1111@gmail.com" style="color: #f97316; text-decoration: none;">akshaysj1111@gmail.com</a>
            </p>
            <div class="social-links">
              <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
                © 2024 New Company. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});