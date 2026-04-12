const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  
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

  // Click Step 1 Next
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Next'));
    if (btn) {
      console.log("Clicking Next button");
      btn.click();
    } else {
      console.log("Next button not found on step 1");
    }
  });
  
  await page.waitForTimeout(1000);

  const dump = await page.evaluate(() => {
    const tooltip = document.querySelector('.react-joyride__tooltip');
    
    // Check state of the page
    return {
      sidebarExists: !!document.querySelector('.sidebar'),
      tooltipExists: !!tooltip,
      tooltipHtml: tooltip ? tooltip.innerHTML : "none",
      sessionState: sessionStorage.getItem('nutriserve_pending_step'),
    };
  });
  
  console.log("STATE:", dump);
  await browser.close();
})();
