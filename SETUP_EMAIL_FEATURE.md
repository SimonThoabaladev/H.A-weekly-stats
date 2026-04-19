# SETUP GUIDE: Email Questionnaire Responses to sellosthoabala@gmail.com

## Quick Start

This guide will help you set up the email feature to automatically send questionnaire responses as PDF files to `sellosthoabala@gmail.com`.

## What Was Added

✅ **Frontend Changes:**
- "Send to Email" button in the questionnaire results page
- Automatic PDF generation from responses
- Email status notifications (success/error)
- Support for backend API integration

✅ **Backend Service:**
- Node.js Express server to handle email sending
- PDF generation with formatting
- Gmail integration via Nodemailer
- Environment variable configuration

## Setup Steps

### 1. Backend Setup (Email Service)

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the server directory:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=5000
```

### 2. Gmail Configuration

1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification" if not enabled
3. Search for "App passwords"
4. Select Mail → Windows Computer
5. Copy the 16-character password
6. Paste it as `EMAIL_PASSWORD` in your `.env` file

### 3. Start the Backend Server

```bash
npm start
```

You should see: `Email service running on port 5000`

### 4. Frontend Setup

Create a `.env` file in the root directory (same level as package.json):
```
REACT_APP_API_URL=http://localhost:5000
```

### 5. Start the React App

In a new terminal:
```bash
npm start
```

## Testing

1. Open http://localhost:3000
2. Go to "Sello Questionnaires"
3. Fill out the form completely
4. Click "Submit Feedback"
5. Click "Send to Email"
6. Check sellosthoabala@gmail.com for the PDF

## File Structure

```
my-pos-app/
├── .env (create this - frontend config)
├── package.json
├── src/
│   └── components/
│       ├── SelloQuestionnaires.tsx (updated)
│       └── SelloQuestionnaires.css (updated)
└── server/
    ├── .env (create this - backend config)
    ├── package.json
    ├── emailService.js
    └── README.md
```

## Common Issues

**"Failed to send email" when clicking Send to Email:**
- ✓ Verify backend is running on port 5000
- ✓ Check `.env` file in server folder has correct Gmail credentials
- ✓ Verify 2FA is enabled on Gmail account

**Backend won't start:**
- ✓ Run `npm install` in server folder first
- ✓ Check if port 5000 is already in use: `lsof -i :5000`
- ✓ Verify `.env` file exists in server folder

**Email not received:**
- ✓ Check spam/trash folder
- ✓ Wait a few seconds (email takes time to send)
- ✓ Check backend console for error messages
- ✓ Verify Gmail App Password is correct (16 characters)

## Deployment

### Deploy Backend to Production

Option A: Railway (Recommended)
```bash
# Push to GitHub
# Connect to railway.app
# Add environment variables in dashboard
# Deploy
```

Option B: Heroku
```bash
heroku login
heroku create your-app-name
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
git push heroku main
```

Then update frontend `.env`:
```
REACT_APP_API_URL=https://your-deployed-backend.herokuapp.com
```

## Features

- ✅ Automatic PDF generation with formatted content
- ✅ Email directly to sellosthoabala@gmail.com
- ✅ Success/error notifications
- ✅ Download as JSON backup
- ✅ Responsive design
- ✅ Production-ready

## Next Steps

1. Set up backend server
2. Create `.env` files
3. Test locally
4. Deploy to production when ready

For detailed backend configuration, see `server/README.md`
