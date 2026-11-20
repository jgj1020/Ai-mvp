import fs from 'node:fs';
import path from 'node:path';
const source = 'apps/web';
const dest = 'dist';
if (!fs.existsSync(path.join(source,'index.html'))) throw new Error('Homepage missing');
fs.rmSync(dest,{recursive:true,force:true});
fs.cpSync(source,dest,{recursive:true});
console.log('Built static FORGE5 MVP into dist/');
