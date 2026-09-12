import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {guides} from '../assets/studio-guides.js';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const catalog=JSON.parse(await fs.readFile(path.join(root,'catalog.json'),'utf8'));
const files=[];async function walk(dir){for(const d of await fs.readdir(dir,{withFileTypes:true})){if(d.name.startsWith('.git')||d.name==='node_modules')continue;const p=path.join(dir,d.name);if(d.isDirectory())await walk(p);else files.push(p);}}
await walk(root);let links=0,lessons=0;
for(const f of files.filter(x=>x.endsWith('.html'))){
 const html=await fs.readFile(f,'utf8');assert.ok(/<!doctype html>/i.test(html),f);assert.ok(!/(?:\/Users\/rakesh|file:\/\/|localhost:\d|gh[opusr]_[A-Za-z0-9]{20})/.test(html),'Private/local reference in '+f);
 // Lesson fragments are generated at runtime inside their self-contained content files.
 if(f.includes(path.sep+'content'+path.sep))continue;
 assert.ok(html.includes('name="viewport"'));assert.ok(html.includes('<title>'));
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(?:https?:|#|data:|mailto:)/.test(url))continue;
  const target=url.startsWith('/gokurious-class3/')?path.join(root,url.slice('/gokurious-class3/'.length)):path.resolve(path.dirname(f),url.split('#')[0]);
  assert.ok(target.startsWith(root+path.sep)||target===root,'Out-of-site path: '+url);
  await fs.access(target.endsWith(path.sep)?path.join(target,'index.html'):target);links++;
 }
}
for(const s of catalog.subjects){
 const index=await fs.readFile(path.join(root,'subjects',s.slug,'index.html'),'utf8');assert.equal((index.match(/class="lesson-card"/g)||[]).length,20);
 for(const [i,l] of s.lessons.entries()){
  assert.ok(guides[l.id]?.goal && guides[l.id]?.cue, 'Missing clear play instructions: '+l.id);
  assert.ok(Array.isArray(guides[l.id].fields),'Missing field labels: '+l.id);
  const b=await fs.readFile(path.join(root,'content',s.slug,l.id+'.html'));assert.equal(crypto.createHash('sha256').update(b).digest('hex'),l.sha256);
  const view=await fs.readFile(path.join(root,'lessons',s.slug,l.id+'.html'),'utf8');assert.equal((view.match(/<iframe /g)||[]).length,0);assert.ok(view.includes(`url=../../content/${s.slug}/${l.id}.html`));assert.ok(b.toString().includes('window.GK_LESSON={H,data}'));assert.ok(b.toString().includes('../../assets/studio.js'));await fs.access(path.join(root,'assets','previews',l.id+'.png'));
  if(i>0)assert.ok(view.includes(`href="${s.lessons[i-1].id}.html"`));if(i<19)assert.ok(view.includes(`href="${s.lessons[i+1].id}.html"`));
  if(s.slug==='hindi'){assert.ok(view.includes('Pronunciation review is pending'));assert.ok(l.status.startsWith('Draft'));}else assert.equal(l.status,'Checked locally');lessons++;
 }
}
assert.equal(Object.keys(guides).length,100);assert.equal(lessons,100);assert.equal(files.filter(x=>x.includes(path.sep+'content'+path.sep)&&x.endsWith('.html')).length,100);
console.log(`Passed: ${lessons} updated lesson hashes, 100 3D studio integrations/previews, 100 redirects, 5 subject indexes, ${links} local references and Hindi draft notices.`);
