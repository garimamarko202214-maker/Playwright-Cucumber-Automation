// Inspect the duplicate-email error in detail.
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  page.on('response', r => {
    if (r.url().includes('auth/register')) {
      console.log('[register response]', r.status(), r.url());
      r.text().then(t => console.log('  body:', t.slice(0, 500))).catch(() => {});
    }
  });

  await page.goto('https://eventhub.rahulshettyacademy.com/register', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.locator('#register-email').fill('ginni@gmail.com');
  await page.locator('input[type="password"]').nth(0).fill('Test@123456');
  await page.locator('input[type="password"]').nth(1).fill('Test@123456');
  await page.locator('#register-btn').click();
  await page.waitForTimeout(5000);

  console.log('URL after submit:', page.url());
  console.log('Body text:');
  console.log((await page.locator('body').innerText()).slice(0, 2000));

  // Search for any error/toast
  console.log('\nAll visible text matching "email|register|exists|error" (case-insensitive):');
  const body = await page.locator('body').innerText();
  body.split('\n').filter(l => /email|register|exists|error|already/i.test(l)).forEach(l => console.log('  >', l));

  // Dump form HTML
  const formHtml = await page.locator('form').first().innerHTML().catch(() => 'no form');
  console.log('\nForm HTML (last 2000 chars):');
  console.log(formHtml.slice(-2000));

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
