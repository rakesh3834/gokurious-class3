import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..'),port=4173;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8'};
http.createServer(async(req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(pathname.startsWith('/gokurious-class3/'))pathname=pathname.slice('/gokurious-class3'.length);if(pathname.endsWith('/'))pathname+='index.html';const file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep)||pathname.split('/').some(p=>p.startsWith('.'))){res.writeHead(403).end();return;}const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'}).end(data);}catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}/gokurious-class3/`));
