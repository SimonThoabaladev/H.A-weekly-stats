# Sello Questionnaires - Email Service Setup Guide

## Overview
This guide explains how to set up the email service backend that sends questionnaire responses as PDF files to `sellosthoabala@gmail.com`.

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Gmail account with 2-Factor Authentication enabled

## Step 1: Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication if not already enabled
3. Scroll to "App passwords" 
4. Select "Mail" and "Windows Computer" (or your OS)
5. Generate the password and copy it

## Step 2: Install Backend Dependencies

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

## Step 3: Set Up Environment Variables

Create a `.env` file in the `server` directory:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=5000
```

Replace:
- `your-email@gmail.com` with your Gmail address
- `your-app-password` with the 16-character password from Step 1

## Step 4: Start the Email Service

Run the backend server:

```bash
npm start
```

You should see: `Email service running on port 5000`

## Step 5: Configure React App

Update your React app to point to the correct backend URL in `SelloQuestionnaires.tsx`:

If running locally: `http://localhost:5000/api/send-email`
If deployed: `https://your-backend-url.com/api/send-email`

## Step 6: Test the Setup

1. Start the React app
2. Go to "Sello Questionnaires" 
3. Fill out the form and submit
4. Click "Send to Email"
5. Check the email at `sellosthoabala@gmail.com` for the PDF

## Deployment Options

### Option 1: Deploy to Heroku
```bash
heroku login
heroku create your-app-name
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
git push heroku main
```

### Option 2: Deploy to Railway
1. Connect your GitHub repo
2. Select the `server` directory as root
3. Add environment variables in dashboard
4. Deploy

### Option 3: Deploy to Render
1. Connect GitHub repo
2. Create new Web Service
3. Set Start Command: `npm start`
4. Add environment variables
5. Deploy

## Troubleshooting

**"Failed to send email" error:**
- Verify Gmail App Password is correct
- Check EMAIL_USER and EMAIL_PASSWORD are set correctly
- Ensure 2FA is enabled on Gmail account

**"Connection refused" error:**
- Make sure backend server is running
- Check if port 5000 is available
- Try a different port if needed

**Email not received:**
- Check spam/trash folder
- Verify recipient email address is correct
- Check backend console for error messages

## Security Notes

- Never commit `.env` file with real credentials
- Use environment variables in production
- Consider using a dedicated email account for this service
- Rotate Gmail App Password periodically

## File Structure

```
my-pos-app/
├── server/
│   ├── emailService.js
│   ├── package.json
│   ├── .env (create this file)
│   └── README.md (this file)
└── src/
    └── components/
        ├── SelloQuestionnaires.tsx
        └── SelloQuestionnaires.css
```

## Next Steps

1. Install dependencies: `npm install` in the server folder
2. Create `.env` file with your Gmail credentials
3. Start the backend: `npm start`
4. Test by filling out and submitting the questionnaire form
