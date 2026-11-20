import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync('apps/web/index.html','utf8');
const game=fs.readFileSync('apps/web/game.html','utf8');
const js=fs.readFileSync('apps/web/game.js','utf8');
const css=fs.readFileSync('apps/web/styles.css','utf8');
test('Eight virtual roles are visible',()=>{for(const name of ['아틀라스','루나','코드','모아','하루','리오','노바','쉴드'])assert.ok(html.includes(name),name)});
test('Arcade game is linked',()=>assert.ok(html.includes('href="game.html"')));
test('Game is five rounds',()=>assert.ok(js.includes('MAX_ROUNDS = 5')));
test('Gameplay handles false start',()=>assert.ok(js.includes('1000')));
test('Game supports accessible status',()=>assert.ok(game.includes('aria-live="polite"')));
test('No external advertising or payment scripts',()=>{assert.ok(!html.includes('googlesyndication'));assert.ok(!html.includes('stripe.com'))});
test('Autodev is limited to approved dates',()=>{const s=fs.readFileSync('scripts/autodev/generate.mjs','utf8');assert.ok(s.includes('2026-11-23'));assert.ok(s.includes('2026-11-21'))});

test('Redesigned studio page includes complete navigation and all work areas',()=>{
  for(const anchor of ['content','studio','services','projects','team']) assert.ok(html.includes('id="'+anchor+'"'),anchor);
  for(const section of ['home-hero','approach-section','work-grid','process-panel','team-grid']) assert.ok(html.includes('class="'+section) || html.includes(' '+section),section);
});
test('Auto-generated game links insertion marker is preserved',()=>assert.ok(html.includes('<!-- GENERATED_GAME_LINKS -->')));
test('Responsive design is scoped to home and retains the arcade base style',()=>{
  for(const selector of ['.home .home-hero','.home .work-grid','.home .team-grid']) assert.ok(css.includes(selector),selector);
  assert.ok(css.includes('@media(max-width:860px)'));
  assert.ok(css.includes('@media(max-width:600px)'));
  assert.ok(css.includes('.nav{'));
  assert.ok(css.includes('prefers-reduced-motion:reduce'));
});
