"""
Services for core app functionality.
"""
import logging
from typing import Optional

from django.conf import settings
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

logger = logging.getLogger(__name__)


class EmailService:
    """Service for sending emails"""
    
    @staticmethod
    def send_contact_notification(submission) -> bool:
        """
        Send email notification when a new contact form is submitted.
        
        Args:
            submission: ContactSubmission instance
            
        Returns:
            bool: True if email sent successfully, False otherwise
        """
        try:
            subject = f"[CIES Website] New Contact Form Submission: {submission.subject or 'No Subject'}"
            
            # Plain text content
            message = f"""
New contact form submission received:

Name: {submission.name}
Email: {submission.email}
Phone: {submission.phone or 'Not provided'}
Subject: {submission.subject or 'Not provided'}

Message:
{submission.message}

---
Submitted at: {submission.created_at.strftime('%Y-%m-%d %H:%M:%S')}
IP Address: {submission.ip_address or 'Unknown'}
            """
            
            # HTML content
            html_message = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background-color: #0b3d91; color: white; padding: 20px; text-align: center; }}
        .content {{ padding: 20px; background-color: #f9f9f9; }}
        .field {{ margin-bottom: 15px; }}
        .label {{ font-weight: bold; color: #555; }}
        .value {{ margin-top: 5px; }}
        .message-box {{ background-color: white; padding: 15px; border-left: 4px solid #0b3d91; }}
        .footer {{ font-size: 12px; color: #888; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">{submission.name}</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:{submission.email}">{submission.email}</a></div>
            </div>
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">{submission.phone or 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">Subject:</div>
                <div class="value">{submission.subject or 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">{submission.message}</div>
            </div>
            <div class="footer">
                <p>Submitted at: {submission.created_at.strftime('%Y-%m-%d %H:%M:%S')}</p>
                <p>IP Address: {submission.ip_address or 'Unknown'}</p>
            </div>
        </div>
    </div>
</body>
</html>
            """
            
            # Get admin emails (you can customize this)
            admin_emails = [settings.DEFAULT_FROM_EMAIL]
            if hasattr(settings, 'CONTACT_NOTIFICATION_EMAILS'):
                admin_emails = settings.CONTACT_NOTIFICATION_EMAILS
            
            # Send email
            email = EmailMultiAlternatives(
                subject=subject,
                body=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=admin_emails,
                reply_to=[submission.email]
            )
            email.attach_alternative(html_message, "text/html")
            email.send(fail_silently=False)
            
            logger.info(f"Contact notification email sent for submission {submission.uuid}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send contact notification email: {str(e)}")
            return False

    @staticmethod
    def send_contact_confirmation(submission) -> bool:
        """
        Send confirmation email to the person who submitted the contact form.
        
        Args:
            submission: ContactSubmission instance
            
        Returns:
            bool: True if email sent successfully, False otherwise
        """
        try:
            subject = "Thank you for contacting CIES, IIT Jodhpur"
            
            message = f"""
Dear {submission.name},

Thank you for reaching out to the Civil & Infrastructure Engineering Society (CIES), IIT Jodhpur.

We have received your message and will get back to you as soon as possible.

Your message:
---
{submission.message}
---

Best regards,
CIES Team
IIT Jodhpur
            """
            
            html_message = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background-color: #0b3d91; color: white; padding: 20px; text-align: center; }}
        .content {{ padding: 20px; }}
        .message-box {{ background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0b3d91; margin: 20px 0; }}
        .footer {{ font-size: 12px; color: #888; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Thank You for Contacting Us</h2>
        </div>
        <div class="content">
            <p>Dear {submission.name},</p>
            <p>Thank you for reaching out to the Civil & Infrastructure Engineering Society (CIES), IIT Jodhpur.</p>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p><strong>Your message:</strong></p>
            <div class="message-box">{submission.message}</div>
            <p>Best regards,<br>CIES Team<br>IIT Jodhpur</p>
        </div>
        <div class="footer">
            <p>Civil & Infrastructure Engineering Society</p>
            <p>Indian Institute of Technology Jodhpur</p>
        </div>
    </div>
</body>
</html>
            """
            
            email = EmailMultiAlternatives(
                subject=subject,
                body=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[submission.email]
            )
            email.attach_alternative(html_message, "text/html")
            email.send(fail_silently=False)
            
            logger.info(f"Contact confirmation email sent to {submission.email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send contact confirmation email: {str(e)}")
            return False


class RecaptchaService:
    """Service for reCAPTCHA verification"""
    
    @staticmethod
    def verify(token: str) -> bool:
        """
        Verify reCAPTCHA token.
        
        Args:
            token: reCAPTCHA token from frontend
            
        Returns:
            bool: True if verification successful, False otherwise
        """
        if not token:
            return True  # Skip verification if no token (optional feature)
        
        if not settings.RECAPTCHA_SECRET_KEY:
            return True  # Skip if not configured
        
        try:
            import requests
            
            response = requests.post(
                'https://www.google.com/recaptcha/api/siteverify',
                data={
                    'secret': settings.RECAPTCHA_SECRET_KEY,
                    'response': token
                }
            )
            result = response.json()
            
            return result.get('success', False)
            
        except Exception as e:
            logger.error(f"reCAPTCHA verification failed: {str(e)}")
            return False

