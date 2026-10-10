import fs from 'fs';
const all=JSON.parse(fs.readFileSync('faq-tout.json','utf8'));
const old=[...JSON.parse(fs.readFileSync('a-corriger.json','utf8')),...JSON.parse(fs.readFileSync('sans-marqueur.json','utf8'))];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
let html=`<!doctype html><meta charset="utf-8"><title>Lot 7 – FAQ</title><style>body{font:15px/1.5 system-ui;max-width:1100px;margin:2rem auto;padding:0 1rem}h2{margin-top:2.5rem;border-top:2px solid #333;padding-top:1rem}.c{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}.a{background:#fff3f0;padding:.5rem 1rem}.n{background:#effaf0;padding:.5rem 1rem}small{color:#666}</style><h1>Lot 7 : FAQ des ${old.length} articles</h1><p>Gauche : ancienne FAQ. Droite : nouvelle.</p>`;
let i=0;
for(const o of old){
  const n=all[o.slug]; if(!n) throw new Error(o.slug);
  fs.writeFileSync(`apres/${o.slug}.json`,JSON.stringify({slug:o.slug,faq:n},null,1));
  const f=l=>(l||[]).map(q=>`<p><b>${esc(q.question)}</b><br>${esc(q.answer)}</p>`).join('');
  html+=`<h2>${++i}. ${esc(o.title)}</h2><small>${o.slug}</small><div class="c"><div class="a">${f(o.faq)}</div><div class="n">${f(n)}</div></div>`;
}
fs.writeFileSync('RELECTURE.html',html);console.log(i,'articles');
