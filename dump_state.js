const fs = require('fs');
let code = fs.readFileSync('components/WalkthroughGuide.tsx', 'utf8');
code = code.replace(
  '<Joyride',
  '<div id="joyride-state-dump" data-run={run} data-step={stepIndex} style={{display:"none"}}></div>\n    <Joyride'
);
fs.writeFileSync('components/WalkthroughGuide.tsx', code);
