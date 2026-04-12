const fs = require('fs');
const file = 'components/WalkthroughGuide.tsx';
let txt = fs.readFileSync(file, 'utf8');
txt = txt.replace('const handleJoyrideCallback = (data: CallBackProps) => {', 'const handleJoyrideCallback = (data: CallBackProps) => { console.log("JOYRIDE_DEBUG", data); window.__JOYRIDE_DEBUG = window.__JOYRIDE_DEBUG || []; window.__JOYRIDE_DEBUG.push(data);');
fs.writeFileSync(file, txt);
