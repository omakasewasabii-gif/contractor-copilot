const fs = require('fs');
let code = fs.readFileSync('components/WalkthroughGuide.tsx', 'utf8');
code = code.replace(
  'const handleJoyrideCallback = (data: EventData) => {',
  'const handleJoyrideCallback = (data: EventData) => {\n    console.log("JOYRIDE FULL DATA:", JSON.stringify(data));'
);
fs.writeFileSync('components/WalkthroughGuide.tsx', code);
