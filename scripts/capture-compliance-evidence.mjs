/**
 * Captures compliance evidence as text files (no PII).
 * Run: node scripts/capture-compliance-evidence.mjs
 */
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '../../compliance/evidence')

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', timeout: 30000 }).trim()
  } catch (e) {
    return (e.stdout || '') + (e.stderr || '') + `\n[exit ${e.status}]`
  }
}

function write(name, content) {
  const p = path.join(OUT, name)
  fs.writeFileSync(p, content, 'utf8')
  console.log('wrote', p)
}

fs.mkdirSync(OUT, { recursive: true })

// 1. Hosting
const vercel = fs.readFileSync(path.resolve(__dirname, '../vercel.json'), 'utf8')
const readme = fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf8')
write(
  '01-hosting-location.txt',
  `HOSTING LOCATION EVIDENCE — cies.iitj.ac.in
Captured: ${new Date().toISOString()}

Primary stack (from README + deployment config):
- Frontend + API routes: Vercel Inc. (Cloud / External Service Provider)
- CMS: Sanity.io (project py29aahl, dataset production)
- Database: Neon Serverless Postgres
- Image CDN: Sanity CDN (cdn.sanity.io)

vercel.json:
${vercel}

Live response Server header:
${run('curl -sI https://cies.iitj.ac.in | grep -i "^Server:"')}

Vercel region (bom1 = Mumbai, India):
${run('curl -sI https://cies.iitj.ac.in | grep -i "x-vercel-id"')}
`
)

// 2. HTTPS / TLS
write(
  '02-https-tls-certificate.txt',
  `HTTPS / SSL-TLS EVIDENCE — cies.iitj.ac.in
Captured: ${new Date().toISOString()}

HTTP → HTTPS redirect:
${run('curl -s -o /dev/null -w "http://cies.iitj.ac.in → HTTP %{http_code} redirect=%{redirect_url}" http://cies.iitj.ac.in')}

TLS verify (0 = valid):
${run('curl -s -o /dev/null -w "https://cies.iitj.ac.in TLS verify=%{ssl_verify_result} scheme=%{scheme}" https://cies.iitj.ac.in')}

Certificate details (openssl):
${run('echo | openssl s_client -servername cies.iitj.ac.in -connect cies.iitj.ac.in:443 2>/dev/null | openssl x509 -noout -issuer -subject -dates 2>/dev/null')}
`
)

// 3. Security headers
write(
  '03-security-headers.txt',
  `SECURITY HEADERS — https://cies.iitj.ac.in
Captured: ${new Date().toISOString()}

${run('curl -sI https://cies.iitj.ac.in | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy|server"')}
`
)

// 4. Production API BEFORE fix (redacted — no PII in this file)
const prodApi = run(
  'curl -s "https://cies.iitj.ac.in/api/contact?page=999999&limit=1"'
)
let prodParsed = {}
try {
  prodParsed = JSON.parse(prodApi)
} catch {
  prodParsed = { raw: prodApi }
}
write(
  '04-production-api-status-BEFORE-deploy.txt',
  `PRODUCTION API STATUS (pre-security-deploy)
Captured: ${new Date().toISOString()}

NOTE: Security fixes are implemented in codebase but require Vercel deployment
with ADMIN_PASSWORD and ADMIN_SESSION_SECRET env vars to take effect on production.

Non-intrusive check (out-of-range page, no PII returned):
${JSON.stringify(
  {
    http_equivalent: 'GET /api/contact?page=999999&limit=1',
    success: prodParsed.success,
    data_length: Array.isArray(prodParsed.data) ? prodParsed.data.length : null,
    pagination: prodParsed.pagination,
    security_status:
      prodParsed.success === true
        ? 'VULNERABLE — unauthenticated access still active until deploy'
        : 'Protected',
  },
  null,
  2
)}
`
)

// 5. Local API after fix (if dev server running)
const local401 = run(
  'curl -s -w "\\nHTTP %{http_code}" "http://localhost:3000/api/contact?limit=1" 2>/dev/null'
)
write(
  '05-local-api-protected-AFTER-fix.txt',
  `LOCAL API AFTER SECURITY FIX
Captured: ${new Date().toISOString()}

GET /api/contact (no session cookie):
${local401 || '[dev server not running — start with npm run dev and re-run script]'}

DELETE /api/admin/submissions/1 (no session):
${run('curl -s -w "\\nHTTP %{http_code}" -X DELETE "http://localhost:3000/api/admin/submissions/1" 2>/dev/null')}

PATCH /api/admin/submissions/1 (no session):
${run('curl -s -w "\\nHTTP %{http_code}" -X PATCH -H "Content-Type: application/json" -d "{\\"is_read\\":true}" "http://localhost:3000/api/admin/submissions/1" 2>/dev/null')}
`
)

// 6. npm audit
write(
  '06-npm-audit-security-updates.txt',
  `DEPENDENCY / SECURITY UPDATE EVIDENCE
Captured: ${new Date().toISOString()}

Production runtime audit (npm audit --omit=dev):
${run('cd "' + path.resolve(__dirname, '..') + '" && npm audit --omit=dev 2>&1 | tail -20')}

Dependabot configured: .github/dependabot.yml (weekly npm + github-actions scans)
`
)

console.log('\nDone. Evidence files in', OUT)
