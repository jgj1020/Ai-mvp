/** FORGE5 read-only recurring audit: Atlas (offer), Luna (UX), Code (QA). */ 
import {readFileSync,existsSync,mkdirSync,writeFileSync,appendFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const checks=[];
const add=(owner,name,pass,evidence,otherwise='review')=>checks.push({owner,name,status:pass?'pass':otherwise,evidence});
const read=p=>existsSync(path.join(root,p))?readFileSync(path.join(root,p),'utf8'):'';
const html=read('apps/web/index.html'),css=read('apps/web/styles.css'),game=read('apps/web/game.js'),roadmap=read('docs/PRODUCT-ROADMAP.md');
add('atlas','Service offering visible',/홈페이지|웹사이트 제작|제작 서비스/.test(html),'Read-only homepage content check');
add('atlas','Customer inquiry/quote CTA',/문의|견적|상담|크몽|mailto:/i.test(html),'Does customer see a way to inquire or request a quote?');
add('atlas','Product hypothesis documented',/START|GROW|PRO|가격|상품/.test(roadmap),'Roadmap is not evidence of actual price acceptance');
add('atlas','Traffic/leads/revenue measured',false,'No verified sales or analytics integration. Never infer visitor count or earnings.','unverified');
add('luna','Mobile viewport',/<meta\s+name=["']viewport["']/i.test(html),'Static viewport declaration');
add('luna','Semantic landmarks',/<main[\s>]/i.test(html)&&/<nav[\s>]/i.test(html),'Static homepage HTML');
add('luna','Reduced-motion styling',/prefers-reduced-motion/.test(css),'CSS check; visual test still required');
add('luna','Keyboard focus styling',/:focus-visible|:focus\s*\{/.test(css),'CSS check; keyboard E2E still required');
add('code','Homepage exists',html.length>0,'apps/web/index.html');
add('code','Arcade JavaScript exists',game.length>0,'apps/web/game.js; playthrough is not covered');
const hrefs=[...html.matchAll(/\bhref=["']([^"']+)["']/gi)].map(m=>m[1]);
const missing=hrefs.filter(h=>!/^(?:#|mailto:|tel:|https?:|javascript:|data:)/i.test(h)).map(h=>h.split(/[?#]/,1)[0]).filter(Boolean).filter(h=>!existsSync(path.join(root,'apps/web',h.replace(/^\//,''))));
add('code','Internal page links resolve',missing.length===0,missing.length?'Missing: '+[...new Set(missing)].join(', '):hrefs.length+' links scanned');
if(process.env.FORGE5_LIVE_CHECK==='true'){
 for(const [name,url] of [['studio','https://forgefive-ops-2026.higgsfield.app/'],['game','https://forgefive-ops-2026.higgsfield.app/sample/game'],['cafe','https://forgefive-ops-2026.higgsfield.app/sample/cafe']]){
  try{
   const response=await fetch(url,{method:'GET',redirect:'follow',signal:AbortSignal.timeout(10000),headers:{'user-agent':'FORGE5-readonly-audit/1.0'}});
   add('code','Live '+name,response.ok,'HTTP '+response.status+'; does not prove visual render',response.status===401||response.status===403?'access-restricted':'review');
  }catch(e){add('code','Live '+name,false,String(e?.message??e),'unverified');}
 }
}else add('code','Live site request',false,'Not run; set FORGE5_LIVE_CHECK=true','not-run');
const now=new Date().toISOString();
const result={project:'FORGE5',timestamp_utc:now,scope:'static checks and public HTTP availability only',human_review_required:true,caveats:['Not 24/7 independent AI staff','No real-device visual test','No measured visitors, leads, sales or profits','No code edits or external posts'],checks};
const summary=['# FORGE5 operations audit','',now,'','| Role | Check | Status | Evidence |','|---|---|---|---|',...checks.map(c=>'| '+[c.owner,c.name,c.status,c.evidence.replaceAll('|','\\|').replaceAll('\n',' ')].join(' | ')+' |'),'','Read-only automation. Results require human review; workflow execution is not business growth.'].join('\n')+'\n';
const out=path.join(root,'artifacts/ops');
mkdirSync(out,{recursive:true});
writeFileSync(path.join(out,'audit.json'),JSON.stringify(result,null,2)+'\n');
writeFileSync(path.join(out,'audit.md'),summary);
if(process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary);
console.log(JSON.stringify({checked:checks.length,passed:checks.filter(c=>c.status==='pass').length,review:checks.filter(c=>c.status!=='pass').length}));
