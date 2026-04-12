const fs = require('fs');
let code = fs.readFileSync('components/WalkthroughGuide.tsx', 'utf8');
code = code.replace('key="nutriserve-joyride"', 'key={`${pathname}-${stepIndex}`}');
fs.writeFileSync('components/WalkthroughGuide.tsx', code);
