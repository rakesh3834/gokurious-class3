import {LearningScene} from './studio-scene.js';
const {H,data}=window.GK_LESSON||{},meta=window.GK_META;
if(!H||!meta)throw Error('Lesson model missing');
const root=H.root,hi=meta.language==='hi',el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const copy=(en,hindi)=>hi?hindi:en;
const oldStage=H.stage,oldControls=H.controls;
const prompts=[...root.querySelectorAll('.gk-try p')].map(e=>e.textContent.trim());
const originalCaption=root.querySelector('.gk-scene-caption'),originalObservation=root.querySelector('.gk-observation');
const title=root.querySelector('h1')?.textContent||meta.title;
const nav=el('nav','studio-nav');nav.setAttribute('aria-label','Lesson navigation');
nav.innerHTML=`<a class="wordmark" href="../../index.html" aria-label="All subjects">Go<span>Kurious</span></a><a class="subject-back" href="../../subjects/${meta.subject}/index.html">‹ ${hi?'हिन्दी':meta.name}</a><span class="nav-id">${meta.index+1} / 20</span><div class="nav-right"><button type="button" class="read-toggle">${copy('Read','पढ़ें')}</button><a href="${meta.next?meta.next+'.html':'../../subjects/'+meta.subject+'/index.html'}" aria-label="${copy('Next lesson','अगला पाठ')}">→</a></div>`;
document.body.prepend(nav);
const studio=el('section');studio.id='studio';studio.setAttribute('aria-label',copy('Interactive learning studio','खेल और खोज'));
const heading=el('div','studio-heading'),titleGroup=el('div','studio-title-group');titleGroup.append(el('h1','',title));heading.append(titleGroup,el('span','topic-number',meta.id));
const stage=el('div','studio-stage'),canvasHost=el('div','scene-canvas'),sceneLabel=el('div','scene-label'),turn=el('button','scene-turn','↻');turn.type='button';turn.title=copy('Turn the 3D view','3D दृश्य घुमाएँ');turn.setAttribute('aria-label',turn.title);
oldStage.classList.add('studio-model');oldStage.setAttribute('aria-hidden','true');
const summary=el('div','scene-summary');stage.append(canvasHost,sceneLabel,turn,oldStage,summary);
const tools=el('section','studio-tools');tools.setAttribute('aria-label',copy('Activity tools','खेल के औज़ार'));
const toolsTitle=el('div','tools-title'),toolLabel=el('select','tool-page-label'),pagination=el('div','tool-pagination');toolLabel.setAttribute('aria-label',copy('Choose a tool group','औज़ार समूह चुनें'));
const prev=el('button','','‹'),next=el('button','','›');prev.type=next.type='button';prev.setAttribute('aria-label',copy('Previous tools','पिछले औज़ार'));next.setAttribute('aria-label',copy('Next tools','अगले औज़ार'));pagination.append(prev,next);toolsTitle.append(toolLabel,pagination);
const toolGrid=el('div','tool-grid');tools.append(toolsTitle,toolGrid);
const feedback=el('div','feedback-strip'),feedbackIcon=el('span','feedback-icon','✦'),feedbackText=el('p','feedback-text'),feedbackNext=el('button','feedback-next','›');feedbackText.setAttribute('role','status');feedbackText.setAttribute('aria-live','polite');feedbackNext.type='button';feedbackNext.setAttribute('aria-label',copy('Continue explanation','व्याख्या आगे पढ़ें'));feedback.append(feedbackIcon,feedbackText,feedbackNext);
const bottom=el('div','bottom-bar'),tabs=el('div','mode-tabs'),bottomTools=el('div','bottom-tools');
const modeButtons=['Explore','Missions','Check'].map((t,i)=>{const b=el('button','',copy(t,['खोजें','मिशन','जाँचें'][i]));b.type='button';b.addEventListener('click',()=>setMode(i));tabs.append(b);return b;});
const reset=el('button','','↺'),help=el('button','','?'),doneEdit=el('button','done-edit',copy('Done editing','लिखना पूरा'));reset.type=help.type=doneEdit.type='button';doneEdit.hidden=true;reset.setAttribute('aria-label',copy('Restart activity','खेल फिर शुरू करें'));help.setAttribute('aria-label',copy('Help and audio','मदद और ऑडियो'));bottomTools.append(reset,help);bottom.append(tabs,bottomTools,doneEdit);
studio.append(heading,stage,tools,feedback,bottom);root.prepend(studio);
// Keep original controls inside their original root. The visible tool shelf hosts
// these very controls; their handlers and model state remain authoritative.
const storage=el('div','studio-storage');storage.hidden=true;storage.append(originalCaption,originalObservation);root.append(storage);toolGrid.append(oldControls);
const originalAudio=root.querySelector('.gk-audio');if(originalAudio)storage.append(originalAudio);
let mode=0,mission=0,quiz=0,toolPage=0,feedbackPage=0,feedbackMessage='',quizAnswers=Array(data.quiz?.length||3).fill(null),read=false,scene=null,queued=false,controlItems=[],stageItems=[],selectedToolKey=null;
const dialog=el('dialog','studio-dialog');document.body.append(dialog);
function showDialog(title,paragraphs,extra){dialog.replaceChildren(el('h2','',title));paragraphs.forEach(t=>dialog.append(el('p','',t)));const actions=el('div','dialog-actions');if(extra)actions.append(extra);const close=el('button','',copy('Back to play','खेल पर लौटें'));close.type='button';close.onclick=()=>dialog.close();actions.append(close);dialog.append(actions);dialog.showModal();}
help.onclick=()=>{const notes=[...oldControls.querySelectorAll('.gk-instruction')].map(n=>n.textContent).filter(Boolean);showDialog(copy('A little help','थोड़ी मदद'),[copy('Change a tool and watch what happens. Use the arrows beside Tools for more choices. Missions offer three ideas to try; Check has the original lesson questions.','औज़ार बदलें और असर देखें। और विकल्पों के लिए औज़ार के पास तीर दबाएँ। मिशन में तीन प्रयोग हैं और जाँचें में पाठ के सवाल।'),...notes,originalCaption?.textContent||'',copy('In this 3D studio, the tool buttons provide tap alternatives to the dragging described in the article. You can turn the scene with ↻. Read opens the article, FAQs and grown-up activities. Your current activity stays here while you read.','इस 3D खेल में लेख के खींचकर रखने वाले काम औज़ारों के बटन दबाकर भी किए जा सकते हैं। ↻ से दृश्य घुमाएँ। पढ़ें में लेख, सवाल-जवाब और गतिविधियाँ हैं। पढ़ते समय आपका खेल यहीं रहता है।'),...(originalAudio?[originalAudio.querySelector('.gk-audio-status')?.textContent||'']:[]),...(hi?['हिन्दी ऑडियो के उच्चारण की समीक्षा बाकी है। किसी बड़े के साथ ध्वनियाँ जाँचें।']:[])],(()=>{const b=el('button','',copy('Stop audio','ऑडियो रोकें'));b.onclick=()=>{H.stop?.();window.speechSynthesis?.cancel();};return b;})());};
reset.onclick=()=>{H.stop?.();window.speechSynthesis?.cancel();H.reset();toolPage=0;mission=0;quiz=0;quizAnswers.fill(null);sync();};
function setRead(value){read=value;document.body.classList.toggle('gk-playing',!read);document.body.classList.toggle('gk-reading',read);nav.querySelector('.read-toggle').textContent=copy(read?'Play':'Read',read?'खेलें':'पढ़ें');nav.querySelector('.read-toggle').setAttribute('aria-pressed',String(read));scene?.setPaused(read);if(read){H.stop?.();window.speechSynthesis?.cancel();}else{window.scrollTo(0,0);requestAnimationFrame(resize);} }
nav.querySelector('.read-toggle').onclick=()=>setRead(!read);
root.querySelectorAll('a[href$="-lab"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();setRead(false);}));
function setMode(i){mode=i;toolPage=0;feedbackPage=0;sync();}
function breakText(text,max){const words=String(text||'').trim().split(/\s+/),out=[];let chunk='';for(const word of words){if(chunk.length+word.length>max&&chunk){out.push(chunk);chunk='';}chunk+=(chunk?' ':'')+word;}if(chunk)out.push(chunk);return out.length?out:[''];}
function say(text){if(text!==feedbackMessage){feedbackMessage=text;feedbackPage=0;}const max=innerWidth>=700&&innerHeight>=650?220:innerHeight<500?95:innerWidth<381?105:155;const parts=breakText(text,max);feedbackPage=Math.min(feedbackPage,parts.length-1);feedbackText.textContent=parts[feedbackPage];feedbackNext.hidden=parts.length<2;feedbackNext.textContent=feedbackPage===parts.length-1?'↺':'›';feedbackNext.title=`${feedbackPage+1} / ${parts.length}`;feedbackNext.onclick=()=>{feedbackPage=(feedbackPage+1)%parts.length;say(feedbackMessage);};}
function collectControls(){
 controlItems=[];
 for(const node of [...oldControls.children]){
  if(node.matches('p,.gk-instruction')){node.hidden=true;continue;}
  if(node.matches('.gk-word-row,.gk-chip-row,.gk-row')){node.style.display='contents';controlItems.push(...node.querySelectorAll('button'));}
  else if(node.matches('label')&&!node.matches('.gk-check')&&node.nextElementSibling?.matches('textarea')){const area=node.nextElementSibling,w=el('div','gk-control-block wide');node.before(w);w.append(node,area);controlItems.push(w);}
  else if(node.parentElement===oldControls)controlItems.push(node);
 }
 controlItems=[...new Set(controlItems)].filter(n=>n.matches('button,.gk-control-block,.gk-check,textarea,input,label')||n.querySelector('button,input,select,textarea'));
 controlItems.forEach(n=>{n.dataset.studioOwner='control';n.hidden=true;});
}
function makeStageTools(){
 stageItems.forEach(n=>n.remove());stageItems=[];
 oldStage.querySelectorAll('button,select,input').forEach((source,i)=>{
  const label=source.textContent.trim()||source.getAttribute('aria-label')||copy('Select','चुनें');
  if(source.tagName==='BUTTON'){
   const proxy=el('button','stage-proxy',label);proxy.type='button';if(source.closest('.gk-keyboard'))proxy.classList.add('letter-key');proxy.disabled=source.disabled;proxy.dataset.studioKey='stage-'+i;proxy.setAttribute('aria-pressed',source.getAttribute('aria-pressed')||'false');proxy.onclick=()=>{source.click();sync();const replacement=toolGrid.querySelector(`[data-studio-key="stage-${i}"]`);if(replacement&&!replacement.hidden)replacement.focus({preventScroll:true});};stageItems.push(proxy);
  }
 });
 stageItems.forEach(n=>{n.hidden=true;toolGrid.append(n);});
}
function toolGroups(items){const out=[];for(let i=0;i<items.length;){const n=items[i],keyboard=n.classList.contains('letter-key');const short=n.tagName==='BUTTON'&&n.textContent.length<=24;let count=keyboard?6:innerWidth>=700&&innerHeight>=650?4:short&&mode!==1&&innerHeight>=500?4:2;let chunk=items.slice(i,i+count);if(keyboard)chunk=chunk.filter(n=>n.classList.contains('letter-key'));else if(chunk.some(n=>n.matches('.gk-control-block')||n.querySelector('select,textarea')))chunk=chunk.slice(0,2);if(!chunk.length)chunk=[n];out.push(chunk);i+=chunk.length;}return out;}
function renderTools(){
 stage.querySelectorAll('.quiz-prompt').forEach(n=>n.remove());stage.classList.toggle('quiz-scene',mode===2);
 toolGrid.querySelectorAll('.mission-banner,.quiz-prompt,.quiz-answer,.mission-action,.quiz-next').forEach(n=>n.remove());
 [...controlItems,...stageItems].forEach(n=>n.hidden=true);
 let items=[...controlItems,...stageItems];
 const groups=toolGroups(items),pages=Math.max(1,groups.length);toolPage=Math.min(toolPage,pages-1);
 if(mode===2){renderQuiz();return;}
 toolLabel.replaceChildren(...groups.map((group,i)=>{const o=el('option','',`${i+1}/${pages} · `+group.map(n=>n.querySelector('label')?.textContent||n.textContent).join(' · '));o.value=i;return o;}));toolLabel.value=toolPage;toolLabel.onchange=()=>{toolPage=Number(toolLabel.value);renderTools();};
 prev.disabled=toolPage===0;next.disabled=toolPage===pages-1;prev.onclick=()=>{toolPage--;renderTools();};next.onclick=()=>{toolPage++;renderTools();};
 const active=groups[toolPage]||[];active.forEach(n=>{n.hidden=false;});toolGrid.classList.toggle('keyboard-keys',active.every(n=>n.classList.contains('letter-key')));
 toolGrid.style.minHeight=active.some(n=>n.querySelector('select,input')||n.matches('input'))?'74px':'48px';
 studio.dataset.toolPage=String(toolPage);studio.dataset.toolPages=String(pages);
 if(mode===1){sceneLabel.textContent=copy(['Predict','Experiment','Explain'][mission],['अनुमान','प्रयोग','समझाएँ'][mission])+' · '+(mission+1)+'/3';summary.textContent='';say(prompts[mission]||meta.outcome);const b=el('button','mission-action',copy('Next mission →','अगला मिशन →'));b.onclick=()=>{mission=(mission+1)%3;renderTools();};b.style.gridColumn='1/-1';toolGrid.append(b);}else say(originalObservation.textContent);
 requestAnimationFrame(fit);
}
function renderQuiz(){const item=data.quiz[quiz];toolGrid.classList.remove('keyboard-keys');toolLabel.replaceChildren(...data.quiz.map((q,i)=>{const o=el('option','',copy(`Question ${i+1} / ${data.quiz.length}`,`सवाल ${i+1} / ${data.quiz.length}`));o.value=i;return o;}));toolLabel.value=quiz;toolLabel.onchange=()=>{quiz=Number(toolLabel.value);renderTools();};prev.disabled=quiz===0;next.disabled=quiz===data.quiz.length-1;prev.onclick=()=>{quiz--;renderTools();};next.onclick=()=>{quiz++;renderTools();};const prompt=el('p','quiz-prompt',item.title);stage.append(prompt);
 item.options.forEach((label,i)=>{const b=el('button','quiz-answer',label);b.type='button';b.setAttribute('aria-pressed',String(quizAnswers[quiz]===i));if(quizAnswers[quiz]===i)b.classList.add(i===item.correct?'correct':'incorrect');b.onclick=()=>{quizAnswers[quiz]=i;renderTools();};toolGrid.append(b);});
 const chosen=quizAnswers[quiz];say(chosen===null?copy('Choose an answer. You can change your answer and try again.','उत्तर चुनें। आप उत्तर बदलकर फिर कोशिश कर सकते हैं।'):(chosen===item.correct?copy('Correct. ','सही। '):copy('Try again. ','फिर कोशिश करें। '))+item.feedback[chosen]);
 studio.dataset.quiz=String(quiz);requestAnimationFrame(fit);
}
function sync(){queued=false;collectControls();makeStageTools();modeButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(mode===i)));sceneLabel.textContent=copy('Explore • turn the scene ↻','खोजें • दृश्य घुमाएँ ↻');
const readout=oldStage.querySelector('.gk-readout');summary.textContent=readout?.textContent?.trim()||'';summary.hidden=!summary.textContent;
 renderTools();scene?.update(oldStage);studio.dataset.ready='true';
}
function schedule(){if(!queued){queued=true;requestAnimationFrame(sync);}}
new MutationObserver(schedule).observe(oldStage,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['data-state']});
new MutationObserver(schedule).observe(oldControls,{childList:true});
new MutationObserver(()=>{if(mode!==1)say(originalObservation.textContent);}).observe(originalObservation,{childList:true,subtree:true,characterData:true});
function fit(){if(read)return;const rect=studio.getBoundingClientRect(),available=window.visualViewport?.height||innerHeight;studio.dataset.overflow=String(rect.bottom>available+2);}
function resize(){document.documentElement.style.setProperty('--vvh',(window.visualViewport?.height||innerHeight)+'px');scene?.resize();renderTools();fit();}
let editTarget=null;studio.addEventListener('focusin',e=>{if(innerWidth>=700||!e.target.matches('input:not([type=range]):not([type=checkbox]),textarea'))return;editTarget=e.target;studio.classList.add('keyboard-mode');const block=e.target.closest('.gk-control-block')||e.target;block.classList.add('editing-control');doneEdit.hidden=false;});
function finishEditing(){editTarget?.blur();studio.classList.remove('keyboard-mode');studio.querySelectorAll('.editing-control').forEach(e=>e.classList.remove('editing-control'));doneEdit.hidden=true;resize();}
doneEdit.addEventListener('pointerdown',e=>{e.preventDefault();finishEditing();});doneEdit.addEventListener('click',finishEditing);
window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);
setRead(false);
try{scene=new LearningScene(canvasHost,meta);turn.onclick=()=>scene.turn();}catch(error){console.warn('3D view unavailable:',error.message);oldStage.classList.add('fallback');oldStage.removeAttribute('aria-hidden');canvasHost.append(el('p','fallback-note',copy('3D is unavailable on this device. The activity still works below.','इस उपकरण पर 3D उपलब्ध नहीं है। खेल के औज़ार काम करते हैं।')));}
sync();resize();
// User-driven motion is mirrored in 3D; reduced motion settles directly to state.
const animate=H.animate;H.animate=(node,frames)=>{animate?.(node,frames);scene?.action(node,frames);};
studio.addEventListener('click',e=>{if(e.target.closest('.tool-grid button'))scene?.pulse();});
document.addEventListener('visibilitychange',()=>{scene?.setPaused(document.hidden||read);if(document.hidden){H.stop?.();window.speechSynthesis?.cancel();}});
window.GK_STUDIO={meta,H,scene,setMode,setRead,sync,get state(){try{return JSON.parse(oldStage.dataset.state||'{}');}catch{return{};}},get tools(){return [...controlItems,...stageItems].map(n=>({label:n.textContent,visible:!n.hidden,disabled:n.disabled}));}};
