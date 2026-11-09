import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname, resolve, relative, isAbsolute, sep, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
const project=fileURLToPath(new URL('./',import.meta.url))
const root=resolve(project,'dist')
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf','.woff':'font/woff','.woff2':'font/woff2','.json':'application/json'}
const server=createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return}
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname)
  let file=resolve(root,'.'+pathname),key=relative(root,file)
  if(isAbsolute(key)||key==='..'||key.startsWith('..'+sep)){res.writeHead(403).end();return}
  if(!extname(pathname))file=join(root,'index.html')
  if(pathname==='/tai-lieu-ML.pdf')file=join(project,'public','tai-lieu-ML.pdf')
  if(pathname==='/ML-tong-hop.pdf')file=join(project,'ML-tong-hop.pdf')
  const info=await stat(file)
  if(!info.isFile()){res.writeHead(404).end();return}
  res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Content-Length':info.size,'X-Content-Type-Options':'nosniff'})
  if(req.method==='HEAD'){res.end();return}
  const stream=createReadStream(file);stream.on('error',()=>res.destroy());stream.pipe(res)
 }catch{res.writeHead(404).end('Khong tim thay tep')}
})
server.on('error',error=>{console.error(error.message);process.exitCode=1})
server.listen(Number(process.env.ML_SLIDE_PORT)||0,'127.0.0.1',()=>{
 const url=`http://127.0.0.1:${server.address().port}/`
 console.log('ML tong hop: '+url)
 console.log('Giu cua so nay mo khi hoc. Nhan Ctrl+C de dung.')
 if(process.argv.includes('--no-open'))return
 if(process.platform==='win32'){const browser=spawn('rundll32.exe',['url.dll,FileProtocolHandler',url],{stdio:'ignore',windowsHide:true});browser.on('error',()=>console.log('Mo dia chi tren trong trinh duyet.'))}
})
