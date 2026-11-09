import { chromium } from 'playwright-chromium'
import { PDFDocument, PDFName, PDFNumber, PDFHexString } from 'pdf-lib'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
const root=fileURLToPath(new URL('./',import.meta.url))
const entries=JSON.parse(await readFile(join(root,'noi-dung-doi-chieu.json'),'utf8'))
const server=spawn(process.execPath,[join(root,'mo-slide.mjs'),'--no-open'],{cwd:root,windowsHide:true,stdio:['ignore','pipe','pipe'],env:{...process.env,ML_SLIDE_PORT:'0'}})
let browser
try{
 const url=await new Promise((resolve,reject)=>{let log='';server.stdout.on('data',data=>{log+=data;const match=log.match(/http:\/\/127\.0\.0\.1:\d+\//);if(match)resolve(match[0])});server.once('error',reject);server.once('exit',code=>reject(new Error('Server stopped: '+code)))})
 const candidates=[process.env.CHROME_PATH,'C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',join(process.env.LOCALAPPDATA||root,'Google/Chrome/Application/chrome.exe')]
 const executablePath=candidates.find(p=>p&&existsSync(p))
 browser=await chromium.launch({executablePath,headless:true})
 const buffers=new Array(entries.length);let cursor=0,done=0
 const preview=join(root,'.export-previews');await mkdir(preview,{recursive:true})
 async function worker(){const page=await browser.newPage({viewport:{width:1120,height:630}});page.on('pageerror',error=>{throw error});while(cursor<entries.length){const index=cursor++,n=index+1;await page.goto(`${url}#/${n}?clicks=999`,{waitUntil:'networkidle'});await page.locator(`.slidev-page-${n} .slidev-layout`).waitFor();await page.emulateMedia({media:'screen'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(120);await page.screenshot({path:join(preview,`${String(n).padStart(3,'0')}.png`)});buffers[index]=await page.pdf({width:'1120px',height:'630px',margin:{top:0,bottom:0,left:0,right:0},pageRanges:'1',printBackground:true,preferCSSPageSize:false});done++;if(done%20===0)console.log(`Rendered ${done}/${entries.length}`)}await page.close()}
 await Promise.all([worker(),worker(),worker(),worker()])
 const pdf=await PDFDocument.create();pdf.setTitle('ML tổng hợp');pdf.setSubject('14 chương kiến thức học máy từ ba bài giảng');pdf.setLanguage('vi-VN');pdf.setCreator('Slidev + Playwright');
 for(const buffer of buffers){const source=await PDFDocument.load(buffer);const [page]=await pdf.copyPages(source,[0]);pdf.addPage(page)}
 const context=pdf.context,outline=context.obj({Type:'Outlines'}),outlineRef=context.register(outline)
 const items=entries.map((entry,i)=>({dict:context.obj({Title:PDFHexString.fromText(entry.title),Parent:outlineRef,Dest:[pdf.getPages()[i].ref,PDFName.of('Fit')]}),ref:null}))
 for(const item of items)item.ref=context.register(item.dict)
 items.forEach((item,i)=>{if(i)item.dict.set(PDFName.of('Prev'),items[i-1].ref);if(i+1<items.length)item.dict.set(PDFName.of('Next'),items[i+1].ref)})
 outline.set(PDFName.of('First'),items[0].ref);outline.set(PDFName.of('Last'),items.at(-1).ref);outline.set(PDFName.of('Count'),PDFNumber.of(items.length));pdf.catalog.set(PDFName.of('Outlines'),outlineRef)
 await writeFile(join(root,'ML-tong-hop.pdf'),await pdf.save())
 console.log(`Saved ${entries.length} slides with searchable text and bookmarks`)
}finally{if(browser)await browser.close();server.kill()}
