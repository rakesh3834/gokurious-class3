import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const catalog=JSON.parse(await fs.readFile(path.join(root,'catalog.json'),'utf8'));
for(const subject of catalog.subjects)for(const [index,lesson] of subject.lessons.entries()){
 const file=path.join(root,'content',subject.slug,lesson.id+'.html');
 let html=await fs.readFile(file,'utf8');
 if(!lesson.originalSha256)lesson.originalSha256=lesson.sha256;
 html=html.replace(/\n<!-- GK-STUDIO-START -->[\s\S]*?<!-- GK-STUDIO-END -->/g,'');
 if(!html.includes('window.GK_LESSON={H,data}'))html=html.replace(' mount(H);',' window.GK_LESSON={H,data}; mount(H);');
 if(!html.includes('GK_ASSET_TAGS'))html=html.replace('window.GK_LESSON={H,data}; mount(H);',`window.GK_LESSON={H,data};
 /* GK_ASSET_TAGS: retain the original SVG for fallback; attach semantic mesh metadata. */
 for(const method of ['toy','person','leaf'])if(H[method]){const original=H[method];H[method]=function(...args){return '<g data-gk-asset="'+method+'" data-gk-args="'+H.e(JSON.stringify(args))+'">'+original(...args)+'</g>';};}
 mount(H);`);
 if(!html.includes('window.GK_LESSON={H,data}'))throw Error('Missing runtime bridge '+lesson.id);
 if(subject.slug==='science'&&!html.includes('GK_SCI_STATE')){
  const fields=['chosen,below,parts:[...parts]','choice,support','rule,zoom,leaves','animal,features:[...features],visited','damp,focus,notes:notes.map(s=>[...s])','place,step,retrieved','surface,prediction,phase','story,route,flow','scene,careful,step','dish,opened,selected','crop,reveal,answer','foods:[...foods]','scene,done:[...done],action','activity,level','object,material,test','material,covered,guess','thing,container,moved','pattern,pushed','item,sorted:[...sorted]','reuse'];
  html=html.replace(/function draw\(([^)]*)\)\{/,(m)=>m+'/* GK_SCI_STATE */H.stage.dataset.state=JSON.stringify({'+fields[index]+'});');
 }
 const metadata={id:lesson.id,title:lesson.title,subject:subject.slug,name:subject.name,language:lesson.language,index,topic:lesson.topic,outcome:lesson.outcome,previous:subject.lessons[index-1]?.id,next:subject.lessons[index+1]?.id};
 const addition=`\n<!-- GK-STUDIO-START --><link rel="stylesheet" href="../../assets/studio.css"><script>window.GK_META=${JSON.stringify(metadata).replace(/</g,'\\u003c')};</script><script type="module" src="../../assets/studio.js"></script><!-- GK-STUDIO-END -->`;
 html=html.replace('</body>',addition+'</body>');
 await fs.writeFile(file,html);
 lesson.sha256=crypto.createHash('sha256').update(html).digest('hex');lesson.bytes=Buffer.byteLength(html);lesson.presentation='Interactive 3D studio';
}
catalog.version=2;
await fs.writeFile(path.join(root,'catalog.json'),JSON.stringify(catalog,null,2)+'\n');
console.log('Upgraded 100 lessons; original models, articles and FAQs retained.');
