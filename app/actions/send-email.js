// 'use server';

// import nodemailer from 'nodemailer';

// export async function sendEmail(formData) {
//   const { name, email, message } = Object.fromEntries(formData);

//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: email,
//     to: 'ankittiwari3690@gmail.com',
//     subject: `New message from ${name} ${email}`,
//     text: message,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return { success: true };
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return { success: false };
//   }
// }


'use server';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// Define a mongoose model for contact messages
const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', {
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return; // If already connected
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't throw error - let it continue with email
  }
};

// Function to store message in DB without blocking
const storeMessageInDB = async (messageData) => {
  try {
    await connectDB();
    const newMessage = new ContactMessage(messageData);
    await newMessage.save();
    console.log('Message stored in database');
  } catch (error) {
    console.error('Error storing message in database:', error);
    // Don't throw error - this is optional
  }
};

export async function sendEmail(formData) {
  const { name, email, message } = Object.fromEntries(formData);

  // Configure email transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
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

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    // After successful email sending, try to store in DB
    // Use Promise.race with a timeout to ensure it doesn't slow down the response
    const timeoutDuration = 5000; // 5 seconds timeout
    Promise.race([
      storeMessageInDB({ name, email, message }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('DB operation timed out')), timeoutDuration)
      )
    ]).catch(error => {
      // Log error but don't affect the response
      console.error('DB operation failed or timed out:', error);
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false };
  }
}