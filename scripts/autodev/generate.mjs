import fs from 'node:fs';
import path from 'node:path';
// A bounded deterministic generator, NOT an independent AI software engineer.
const games={
 "2026-11-21":{slug:"memory",title:"숫자 기억력 챌린지",caption:"3초 안에 4자리 숫자를 외우세요.",code:"const answer=String(Math.floor(1000+Math.random()*9000));document.querySelector('#display').textContent=answer;setTimeout(()=>document.querySelector('#display').textContent='????',3000);document.querySelector('#try').onclick=()=>{let typed=document.querySelector('#answer').value.trim();document.querySelector('#result').textContent=typed===answer?'정답입니다!':'아쉬워요. 정답은 '+answer;document.querySelector('#try').disabled=true;};"},
 "2026-11-22":{slug:"number",title:"숫자 맞히기 챌린지",caption:"1~20의 숨겨진 숫자를 맞히세요.",code:"let secret=1+Math.floor(Math.random()*20),count=0;document.querySelector('#try').onclick=()=>{let value=Number(document.querySelector('#answer').value);if(!Number.isInteger(value)||value<1||value>20){document.querySelector('#result').textContent='1~20을 입력하세요';return;}count++;document.querySelector('#result').textContent=value===secret?'성공! '+count+'번째 정답!':value<secret?'더 큰 수!':'더 작은 수!';if(value===secret)document.querySelector('#try').disabled=true;};"},
 "2026-11-23":{slug:"luck",title:"가위바위보 챌린지",caption:"0=가위, 1=바위, 2=보. 무작위 상대와 승부하세요.",code:"const words=['가위','바위','보'];document.querySelector('#try').onclick=()=>{let a=Number(document.querySelector('#answer').value);if(!Number.isInteger(a)||a<0||a>2){document.querySelector('#result').textContent='0, 1, 2 중 선택하세요';return;}let b=Math.floor(Math.random()*3),result=(a-b+3)%3;document.querySelector('#result').textContent='나 '+words[a]+' / 상대 '+words[b]+' · '+(result===0?'비겼습니다':result===1?'승리!':'패배');};"}
};
const current=process.env.FORGE5_DATE||new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const task=games[current];
if(!task){console.log('SKIP '+current+' / allowed Nov 21-23 only');process.exit(0);}
const output=path.join('apps/web/arcade',task.slug+'.html');
fs.mkdirSync(path.dirname(output),{recursive:true});
if(fs.existsSync(output)){console.log('SKIP already exists: '+output);process.exit(0);}
const html='<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+task.title+' | FORGE5</title><link rel="stylesheet" href="../styles.css"></head><body><header class="nav"><a class="logo" href="../index.html">← FORGE5</a></header><main class="hero"><div class="eyebrow">FORGE5 ARCADE / DAILY EXPERIMENT</div><h1>'+task.title+'</h1><p>'+task.caption+'</p><section style="background:#172535;border:1px solid #456071;border-radius:14px;padding:30px;max-width:500px"><div id="display" style="font-size:42px;font-weight:900;margin:15px 0"></div><label for="answer">답변 입력</label><input id="answer" inputmode="numeric" type="number" style="font-size:20px;padding:12px;border-radius:8px;max-width:100%;background:#fff;color:#111"><button id="try" type="button" style="display:block;background:#a3f4bd;padding:12px 30px;border:0;border-radius:8px;margin-top:15px;font-weight:900">도전하기</button><p id="result" aria-live="polite"></p></section></main><script>'+task.code+'</script></body></html>';
fs.writeFileSync(output,html);
const homepage='apps/web/index.html',raw=fs.readFileSync(homepage,'utf8'),marker='<!-- GENERATED_GAME_LINKS -->';
if(!raw.includes(marker))throw Error('Homepage insertion marker missing');
fs.writeFileSync(homepage,raw.replace(marker,'<a href="arcade/'+task.slug+'.html">'+task.title+' ↗</a>\n'+marker));
console.log('CREATED '+output+' · '+current);
