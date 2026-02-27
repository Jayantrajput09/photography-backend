import nodemailer from 'nodemailer';

export const sendBookingEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // admin
    subject: '📸 New Booking Received',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .content { padding: 30px; }
          .field { margin-bottom: 20px; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; }
          .field-label { font-weight: 600; color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
          .field-value { font-size: 18px; color: #555; }
          .footer { background-color: #f9f9f9; padding: 20px; text-align: center; color: #777; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Booking 📅</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${booking.name}</div>
            </div>
            <div class="field">
              <div class="field-label">Phone</div>
              <div class="field-value">${booking.phone}</div>
            </div>
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${booking.email}</div>
            </div>
            <div class="field">
              <div class="field-label">Event Type</div>
              <div class="field-value">${booking.eventType}</div>
            </div>
            <div class="field">
              <div class="field-label">Preferred Date</div>
              <div class="field-value">${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <div class="field">
              <div class="field-label">Message</div>
              <div class="field-value">${booking.message || '—'}</div>
            </div>
          </div>
          <div class="footer">
            <p>Received on ${new Date(booking.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};