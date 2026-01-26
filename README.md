
# IṢẸ́YÁÁ | Ogun State Digital OS

Deployment instructions for **iseyaa.org**:

1. **GitHub Setup**: 
   - Push this repository to GitHub.
   - Go to **Settings > Pages**.
   - Under **Custom Domain**, enter `iseyaa.org`.

2. **DNS Configuration**:
   - Point your root domain (`@`) to these GitHub IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add a CNAME for `www` pointing to `[your-username].github.io`.

3. **API Security**:
   - Ensure your Gemini API Key is configured in your execution environment as `process.env.API_KEY`.
