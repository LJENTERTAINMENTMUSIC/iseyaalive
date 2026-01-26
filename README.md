
# IṢẸ́YÁÁ | Ogun State Digital OS
**Official Production Node:** [iseyaa.com](https://iseyaa.com)

## 🚀 "Plug-and-Play" Deployment Strategy

This repository is configured for **Zero-Build Deployment**. This means you can save these files directly to a GitHub repository and they will work on GitHub Pages without a manual build step.

### 1. GitHub Setup
- Push all files to a new repository.
- Go to **Settings > Pages**.
- Under **Build and deployment**, set Source to **Deploy from a branch**.
- Under **Custom domain**, enter `iseyaa.com` and hit Save.

### 2. DNS Configuration (Crucial for iseyaa.com)
Point your domain to GitHub's infrastructure using these records at your domain registrar:
- **A Records (@):**
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **CNAME (www):**
  - Point to `[your-github-username].github.io`

### 3. Blank Screen Fixes
- **Babel Standalone**: Included in `index.html`. This ensures the `.tsx` files are readable by the browser.
- **Process Polyfill**: Prevents `process is not defined` errors common in React apps running on static hosts.
- **Import Maps**: Handles modern ESM dependencies directly from `esm.sh`.

### 4. AI Security
Ensure your `API_KEY` is available in the environment. If you are using a custom CI/CD pipeline, inject it as an environment variable.
