// scripts/decode-google-services.js
const fs = require('fs');

if (process.env.GOOGLE_SERVICES_JSON_B64) {
  const decoded = Buffer.from(process.env.GOOGLE_SERVICES_JSON_B64, 'base64').toString('utf8');
  fs.writeFileSync('google-services.json', decoded);
  console.log('✅ google-services.json created from EAS secret');
} else {
  console.warn('⚠️ GOOGLE_SERVICES_JSON_B64 is not defined');
}