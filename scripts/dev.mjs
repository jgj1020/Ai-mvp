import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('apps/web');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
const port = Number(process.env.PORT||3000);
http.createServer((req,res)=>{
 const filename = decodeURIComponent(new URL(req.url||'/', 'http://localhost').pathname);
 const target = path.resolve(root,'.'+(filename==='/'?'/index.html':filename));
 if (!(target===root||target.startsWith(root+path.sep))) {res.writeHead(403).end();return;}
 fs.readFile(target,(error,data)=>{if(error){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'content-type':types[path.extname(target)]||'application/octet-stream'}).end(data);});
}).listen(port,()=>console.log('FORGE5 MVP http://localhost:'+port));
