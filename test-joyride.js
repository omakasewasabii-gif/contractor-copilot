const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto("http://localhost:3080/");
  
  // Start walkthrough
  await page.evaluate(() => {
    sessionStorage.setItem("nutriserve_auth", "true");
    sessionStorage.setItem("nutriserve_role", "admin");
    window.location.href = "/";
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('nutriserve-demo-action', { 
        detail: { id: "01", path: "/" } 
      }));
      window.dispatchEvent(new CustomEvent('start-demo-walkthrough'));
    }, 1000);
  });

  await page.waitForTimeout(3000);

  // Click Step 1 Next
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next (1 of'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(1000);
  
  // Click Step 2 Next
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next (2 of'));
    if (btn) btn.click();
  });
  
  console.log("Waiting for route transition...");
  await page.waitForTimeout(3000);
  
  // Check Step 3 rendered buttons
  const step3Buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.react-joyride__tooltip button')).map(b => b.textContent);
  });
  
  console.log("Buttons found on Step 3:", step3Buttons);
  await browser.close();
})();
