const MAX_ROUNDS = 5;
const pad=document.getElementById('pad');
const symbol=document.getElementById('symbol');
const status=document.getElementById('status');
const caption=document.getElementById('caption');
const roundEl=document.getElementById('round');
const progress=document.querySelectorAll('#progress span');
const bestEl=document.getElementById('best');
const message=document.getElementById('message');
const copy=document.getElementById('copy');
let mode='start', scores=[], since=0, timer=null, average=0;
let best=null;
try{let saved=Number(localStorage.getItem('forge5-reflex-best'));if(saved>0&&Number.isFinite(saved))best=saved}catch{}
if(best!==null)bestEl.textContent=best;
function setMode(value){mode=value;pad.classList.toggle('waiting',value==='wait');pad.classList.toggle('go',value==='go');pad.classList.toggle('done',value==='done');}
function wait(){clearTimeout(timer);setMode('wait');symbol.textContent='●';status.textContent='기다리세요!';caption.textContent='초록색이 되기 전에는 누르지 마세요';pad.setAttribute('aria-label','초록색으로 바뀔 때까지 기다리기');timer=setTimeout(()=>{since=performance.now();setMode('go');symbol.textContent='⚡';status.textContent='지금!';caption.textContent='빠르게 누르세요!';pad.setAttribute('aria-label','지금 누르세요');},1300+Math.floor(Math.random()*1900));}
function score(ms,early=false){clearTimeout(timer);scores.push(Math.min(1000,Math.max(1,Math.round(ms))));progress[scores.length-1]?.classList.add('complete');const last=scores.at(-1);symbol.textContent=String(last)+'ms';status.textContent=early?'조기 클릭! +1000ms':'반응속도 기록';message.textContent='완료 '+scores.length+' / '+MAX_ROUNDS;roundEl.textContent=scores.length+' / '+MAX_ROUNDS;if(scores.length>=MAX_ROUNDS){average=Math.round(scores.reduce((a,b)=>a+b,0)/MAX_ROUNDS);setMode('done');symbol.textContent=average+'ms';status.textContent='5라운드 완료! 다시 도전';caption.textContent='클릭하면 다시 시작합니다';copy.hidden=false;message.textContent='5라운드 평균 '+average+'ms';if(best===null||average<best){best=average;bestEl.textContent=String(best);try{localStorage.setItem('forge5-reflex-best',String(best))}catch{}}}else{setMode('result');caption.textContent='다음 라운드를 시작하려면 클릭하세요';}}
function act(){if(mode==='wait'){score(1000,true);return;}if(mode==='go'){score(performance.now()-since);return;}if(mode==='start'||mode==='done'){scores=[];progress.forEach(el=>el.classList.remove('complete'));copy.hidden=true;roundEl.textContent='1 / 5';}if(mode==='result')roundEl.textContent=(scores.length+1)+' / 5';wait();}
pad.addEventListener('click',act);
copy.addEventListener('click',async()=>{const text='FORGE5 REFLEX 05 평균 '+average+'ms — 도전해 보기 '+location.href;try{await navigator.clipboard.writeText(text);message.textContent='기록 복사 완료!'}catch{message.textContent='브라우저 복사 권한을 확인하세요';}});
