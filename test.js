const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3080/pos");
  
  await page.evaluate(() => {
    sessionStorage.setItem("nutriserve_pending_step", "2");
    window.location.reload();
  });
  
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const tooltip = document.querySelector('.react-joyride__tooltip');
    return {
      buttons: tooltip ? Array.from(tooltip.querySelectorAll('button')).map(b => ({
          text: b.textContent,
          title: b.title,
          ariaLabel: b.getAttribute('aria-label')
        })) : null
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
