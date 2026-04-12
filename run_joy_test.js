const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
  
  await page.goto("http://localhost:3080/");
  
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

  // Click Step 1 Next using evaluate natively rather than guessing
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.hasAttribute('data-action') && b.getAttribute('data-action') === 'primary' || (b.textContent && b.textContent.includes('Next')));
    if (btn) btn.click();
  });
  
  await page.waitForTimeout(1000);
  
  const debug = await page.evaluate(() => {
    return {
      stepIndex: window.__JOYRIDE_STEP_INDEX || "unknown",
      tooltipExists: !!document.querySelector('.react-joyride__tooltip')
    };
  });
  console.log("WAIT_STATE:", debug);
  
  await browser.close();
})();
