# DreamKey Properties - Backup & Deployment Guide

## 📦 Backup Strategy

### Automated Supabase Backups
Your Supabase database automatically creates backups:
- **Daily backups**: Last 7 days (Free tier)
- **Point-in-time recovery**: Available on paid plans

### Manual Backup Methods

#### 1. Database Backup (SQL Export)
```bash
# From Supabase Dashboard:
1. Go to Database → Backups
2. Click "Export Database"
3. Save the .sql file to a secure location
```

#### 2. Storage Backup (Media Files)
```bash
# Download all media from Supabase Storage:
1. Go to Storage → media bucket
2. Select all files
3. Click "Download" or use Supabase CLI:
   supabase storage download --bucket media --destination ./backup/media
```

#### 3. Code Backup (Git Repository)
```bash
# Initialize Git (if not already done)
cd "w:\My projects\Dreamkey properties\dreamkey-static"
git init
git add .
git commit -m "Initial commit - DreamKey Properties v1.0"

# Push to GitHub (recommended)
git remote add origin https://github.com/YOUR_USERNAME/dreamkey-properties.git
git push -u origin main
```

### Recommended Backup Schedule
- **Daily**: Automatic Supabase backups (already enabled)
- **Weekly**: Manual code backup to GitHub
- **Monthly**: Full export of database + storage to local drive
- **Before major changes**: Always backup before updating

---

## 🚀 Deployment Options

### Option 1: Netlify (Recommended - Easiest)
```bash
1. Create account at netlify.com
2. Drag & drop your entire "dreamkey-static" folder
3. Site will be live in 30 seconds!
4. Free SSL certificate included
5. Custom domain: yoursite.com (optional)
```

### Option 2: Vercel
```bash
1. Install Vercel CLI: npm install -g vercel
2. cd "w:\My projects\Dreamkey properties\dreamkey-static"
3. Run: vercel
4. Follow prompts
5. Site deployed!
```

### Option 3: GitHub Pages (Free)
```bash
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch: main
4. Select folder: / (root)
5. Save - site will be at: https://username.github.io/dreamkey-properties
```

### Option 4: Traditional Web Hosting
Upload via FTP to any web host:
- Hostinger
- Bluehost
- SiteGround
- Any cPanel hosting

---

## 🔐 Environment Variables (For Deployment)

### Supabase Credentials
```javascript
// Already in js/data.js - NO CHANGES NEEDED
const SUPABASE_URL = 'https://qvomtnivigdqoejqbyqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### Google Analytics
```javascript
// Replace G-XXXXXXXXXX with your actual Measurement ID
// Get it from: analytics.google.com → Admin → Data Streams
gtag('config', 'YOUR-ACTUAL-GA4-ID');
```

---

## 📊 Google Analytics Setup

### Step 1: Create GA4 Property
1. Go to https://analytics.google.com
2. Click "Admin" (bottom left)
3. Click "Create Property"
4. Name: "DreamKey Properties"
5. Select timezone: India
6. Click "Next" → "Create"

### Step 2: Get Measurement ID
1. Go to Admin → Data Streams
2. Click "Add stream" → "Web"
3. Website URL: your-domain.com
4. Stream name: "DreamKey Website"
5. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

### Step 3: Update Your Code
Replace all instances of `G-XXXXXXXXXX` in your HTML files with your actual Measurement ID.

**Files to update:**
- index.html
- listings.html
- property.html
- about.html
- services.html
- contact.html

---

## 🔄 Backup Restoration

### Restore Database
```sql
-- In Supabase SQL Editor:
1. Go to SQL Editor
2. Click "New query"
3. Paste your backup .sql file contents
4. Click "Run"
```

### Restore Media Files
```bash
# Upload to Supabase Storage:
1. Go to Storage → media bucket
2. Click "Upload files"
3. Select all files from backup
4. Upload
```

---

## 📝 Pre-Launch Checklist

### ✅ Content
- [ ] Add real property listings (via Admin panel)
- [ ] Upload property photos
- [ ] Add property videos (optional)
- [ ] Verify all contact information

### ✅ Configuration
- [x] Contact form email updated (tamil101731@gmail.com)
- [ ] Google Analytics ID updated (replace G-XXXXXXXXXX)
- [x] Supabase database created
- [x] Supabase storage bucket created
- [ ] Storage bucket set to public

### ✅ Testing
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Test all forms
- [ ] Test admin login
- [ ] Test property add/edit/delete
- [ ] Test image uploads
- [ ] Verify WhatsApp links work
- [ ] Verify Instagram links work

### ✅ SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Add meta descriptions (already done)
- [ ] Verify all images have alt text
- [ ] Test page speed (pagespeed.web.dev)

### ✅ Security
- [ ] Change admin password (in Supabase Auth)
- [ ] Enable 2FA on Supabase account
- [ ] Backup database
- [ ] Test RLS policies

---

## 🆘 Emergency Recovery

### If Site Goes Down
1. Check Supabase status: status.supabase.com
2. Check your hosting status
3. Restore from latest backup
4. Contact support if needed

### If Data is Lost
1. Go to Supabase → Database → Backups
2. Select latest backup
3. Click "Restore"
4. Wait 5-10 minutes

### If You Get Locked Out
1. Go to Supabase Dashboard
2. Click "Reset Password"
3. Check email for reset link
4. Create new password

---

## 📞 Support Contacts

- **Supabase Support**: support@supabase.io
- **Google Analytics**: https://support.google.com/analytics
- **Netlify Support**: support@netlify.com

---

## 🎯 Next Steps After Deployment

1. **Monitor Analytics**: Check visitor stats weekly
2. **Update Properties**: Add new listings regularly
3. **Backup Monthly**: Export database + media
4. **SEO Optimization**: Add blog posts (optional)
5. **Marketing**: Share on social media
6. **Customer Feedback**: Improve based on user comments

---

**Your website is production-ready! 🚀**
