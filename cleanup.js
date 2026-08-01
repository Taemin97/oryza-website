const fs = require('fs');
const files = ['src/app/[locale]/page.tsx', 'src/components/BrandOriginSection.tsx'];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\$\{locale === 'ko' \? 'break-keep' : locale === 'ja' \? 'break-all' : 'break-normal'\}/g, '');
  content = content.replace(/\$\{locale === 'ko' \? 'break-keep text-pretty' : 'break-normal text-pretty'\}/g, '');
  content = content.replace(/\$\{locale === 'ko' \? 'break-keep' : 'break-normal text-pretty'\}/g, '');
  content = content.replace(/\$\{locale === 'ko' \? 'break-keep' : ''\}/g, '');
  content = content.replace(/ break-keep/g, '');
  content = content.replace(/ text-balance/g, '');
  content = content.replace(/ text-pretty/g, '');
  content = content.replace(/ \}/g, '}');
  content = content.replace(/ \`/g, '`');
  content = content.replace(/ \"/g, '"');
  // Also fix any template literals that became empty e.g. className={`... ${}`}
  content = content.replace(/ \$\{\}/g, '');
  fs.writeFileSync(file, content);
});
