import fs from 'node:fs';
const [a, b] = process.argv.slice(2).map(Number);
const rows = JSON.parse(fs.readFileSync('a-corriger.json', 'utf8')).slice(a, b);
rows.forEach((r, i) => {
  console.log(`\n### ${a + i} | ${r.slug}\nTITRE: ${r.title}\nRESUME: ${r.resume.slice(0, 380)}`);
  (r.faq || []).forEach((q, k) => console.log(`  Q${k + 1}: ${q.question}\n      R: ${q.answer.slice(0, 230)}`));
});
