const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const { Readable } = require('stream');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Email transporter configuration
// Replace these with your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    // Note: For Gmail, use an App Password, not your regular password
    // Generate App Password here: https://myaccount.google.com/apppasswords
  }
});

// Generate PDF from text content
function generatePDF(textContent) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    let buffers = [];

    doc.on('data', (data) => {
      buffers.push(data);
    });

    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });

    doc.on('error', (err) => {
      reject(err);
    });

    // Add title
    doc.fontSize(20).font('Helvetica-Bold').text('SELLO QUESTIONNAIRES', { align: 'center' });
    doc.fontSize(14).text('FEEDBACK REPORT', { align: 'center' });
    doc.moveDown();

    // Add metadata
    doc.fontSize(10).font('Helvetica').text(`Generated on: ${new Date().toLocaleString()}`, { align: 'left' });
    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Add content
    const lines = textContent.split('\n');
    lines.forEach((line) => {
      if (line.startsWith('Question')) {
        doc.fontSize(11).font('Helvetica-Bold').text(line);
      } else if (line.startsWith('Answer:')) {
        doc.fontSize(10).font('Helvetica-Bold').text(line);
      } else if (line === '='.repeat(50) || line === '-'.repeat(50)) {
        doc.moveDown(0.3);
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(0.3);
      } else if (line.trim()) {
        doc.fontSize(10).font('Helvetica').text(line, { align: 'left' });
      } else {
        doc.moveDown(0.3);
      }
    });

    // Finalize PDF
    doc.end();
  });
}

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, pdfContent, filename, responses } = req.body;

    if (!to || !subject || !pdfContent) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate PDF
    const pdfBuffer = await generatePDF(pdfContent);

    // Prepare email content
    const emailBody = `
Dear Feedback Provider,

Thank you for completing the Sello Questionnaire. Your feedback has been recorded and saved.

Below is a summary of your responses:

${responses.map((r, i) => `Q${i + 1}: ${r.question}\nA: ${r.answer || '(No response)'}`).join('\n\n')}

Best regards,
Sello Research Team
    `;

    // Send email with PDF attachment
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: to,
      subject: subject,
      text: emailBody,
      attachments: [
        {
          filename: filename,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Email service running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});
