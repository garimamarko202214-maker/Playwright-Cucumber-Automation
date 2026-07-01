// Inspect the actual DOM of the EventHub login page.
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  page.on('pageerror', err => console.log('[pageerror]', err.message));
  page.on('console', msg => { if (msg.type() === 'error') console.log('[console.error]', msg.text()); });

  console.log('--- Navigating to login page ---');
  const resp = await page.goto('https://eventhub.rahulshettyacademy.com/', { waitUntil: 'domcontentloaded' });
  console.log('Status:', resp ? resp.status() : 'no response');
  console.log('Final URL:', page.url());

  // Wait a bit longer for SPA hydration
  await page.waitForTimeout(3000);

  const bodyText = await page.locator('body').innerText();
  console.log('\n--- Body text (first 2000 chars) ---');
  console.log(bodyText.slice(0, 2000));

  console.log('\n--- Outer HTML length ---');
  const html = await page.content();
  console.log('HTML length:', html.length);

  console.log('\n--- Form / input / button counts ---');
  console.log('forms:', await page.locator('form').count());
  console.log('inputs:', await page.locator('input').count());
  console.log('buttons:', await page.locator('button').count());
  console.log('anchors:', await page.locator('a').count());

  console.log('\n--- All visible text containing "create" or "sign" or "register" ---');
  const text = await page.locator('body').innerText();
  const lines = text.split('\n').filter(l => /create|sign|register|email|password/i.test(l));
  console.log(JSON.stringify(lines, null, 2));

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
