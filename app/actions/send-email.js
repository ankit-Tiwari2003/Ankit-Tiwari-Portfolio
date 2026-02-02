'use server';
import nodemailer from 'nodemailer';

export async function sendEmail(formData) {
  const { name, email, message } = Object.fromEntries(formData);

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: 'ankittiwari3690@gmail.com',
      subject: `New message from ${name} ${email}`,
      text: message,
    };

    // Retry logic
    let retries = 0;
    const maxRetries = 1;

    while (retries <= maxRetries) {
      try {
        await transporter.sendMail(mailOptions);
        return { success: true };
      } catch (error) {
        if ((error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') && retries < maxRetries) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}