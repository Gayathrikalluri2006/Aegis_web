# AEGIS Web - Deployment & Testing Setup Guide

## 📋 Quick Status
- ✅ Project builds and runs successfully (`npm run dev`)
- ✅ GitHub Actions workflow configured
- ✅ Selenium E2E tests ready
- ⏳ **Awaiting GitHub Secrets configuration**

---

## 🔑 GitHub Secrets Setup (Required for Green Checkmarks)

**These MUST be set up for the CI/CD pipeline to pass:**

### Step 1: Go to GitHub Repository Settings
1. Navigate to: https://github.com/Gayathrikalluri2006/Aegis_web
2. Click **Settings** → **Secrets and variables** → **Actions**

### Step 2: Create 4 Secrets

| Secret Name | Value | Purpose |
|---|---|---|
| `TEST_USER_EMAIL` | `gayathrikalluri17@gmail.com` | Test account for E2E login tests |
| `TEST_USER_PASSWORD` | `daa@2004` | Test account password |
| `VITE_SUPABASE_URL` | Your Supabase URL | Backend API endpoint |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase Public Key | Auth configuration |

### Step 3: Get Supabase Values
1. Go to https://supabase.com → Your Project
2. Click **Settings** → **API**
3. Copy:
   - **Project URL** → Use for `VITE_SUPABASE_URL`
   - **Public anon key** → Use for `VITE_SUPABASE_PUBLISHABLE_KEY`

### Step 4: Verify Test Account
**IMPORTANT:** The test account must exist in Supabase
- Email: `gayathrikalluri17@gmail.com`
- Password: `daa@2004`

If account doesn't exist:
1. Run `npm run dev` locally
2. Go to http://localhost:8080/Aegis_web
3. Sign up with the test credentials
4. Then set the GitHub Secrets

---

## 🚀 What Happens After Secrets Are Set

1. **Any push to `main` branch** triggers the workflow
2. **Workflow steps:**
   - Checkout code
   - Install dependencies (`npm install --force`)
   - Build with Vite (`npm run build`)
   - Start preview server on port 4173
   - Run Selenium tests against auth page
   - Browser fills login form with TEST_USER_EMAIL/PASSWORD
   - Verifies redirect to dashboard
3. **Expected result:** ✅ All steps pass with green checkmarks

---

## 🧪 Local Testing

### Run E2E tests locally:
```bash
# Start preview server in one terminal
npm run build
npm run preview

# Run tests in another terminal
npm run test:e2e
```

### Manual testing:
```bash
npm run dev
# Navigate to http://localhost:8080/Aegis_web
```

---

## 📊 Repository Status

| Component | Status |
|-----------|--------|
| Vite Build | ✅ Working |
| Dev Server | ✅ Running |
| E2E Tests | ✅ Configured |
| GitHub Actions | ✅ Ready (pending secrets) |
| GitHub Pages | ✅ Configured |
| Deployment Script | ✅ Ready |

---

## 🔗 Useful Links

- GitHub Repo: https://github.com/Gayathrikalluri2006/Aegis_web
- Actions Workflow: https://github.com/Gayathrikalluri2006/Aegis_web/actions
- Deployed App: https://Gayathrikalluri2006.github.io/Aegis_web
- Supabase Dashboard: https://supabase.com

---

## ⚠️ Troubleshooting

### Workflow still failing after setting secrets?
1. Check secrets are spelled correctly (case-sensitive)
2. Verify test account exists in Supabase
3. Ensure Supabase URL and key are correct
4. Check GitHub Actions logs for specific errors

### Local tests fail?
1. Run `npm install` to ensure all dependencies installed
2. Check if test account exists: `gayathrikalluri17@gmail.com`
3. Verify Supabase connection by signing in manually in the app

---

**Next Step:** Set up the 4 GitHub Secrets listed above, then push any commit to `main` to trigger the workflow! 🎯
