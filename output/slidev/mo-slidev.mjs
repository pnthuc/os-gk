import { spawn } from 'node:child_process'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('./dist/', import.meta.url))
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
}

async function respond(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405).end()
    return
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname)
    let path = resolve(root, '.' + pathname)
    const key = relative(root, path)
    if (key === '..' || key.startsWith('..' + sep) || isAbsolute(key)) {
      res.writeHead(403).end()
      return
    }
    if (!extname(pathname)) path = join(root, 'index.html')
    const info = await stat(path)
    if (!info.isFile()) {
      res.writeHead(404).end()
      return
    }
    res.writeHead(200, {
      'Content-Type': contentTypes[extname(path)] ?? 'application/octet-stream',
      'Content-Length': info.size,
      'X-Content-Type-Options': 'nosniff',
    })
    if (req.method === 'HEAD') {
      res.end()
      return
    }
    const stream = createReadStream(path)
    stream.on('error', () => res.destroy())
    stream.pipe(res)
  }
  catch {
    res.writeHead(404).end()
  }
}

const server = createServer(respond)
server.on('error', (error) => {
  console.error(error.message)
  process.exitCode = 1
})
server.listen(0, '127.0.0.1', () => {
  const url = 'http://127.0.0.1:' + server.address().port + '/'
  console.log(url)
  if (process.argv.includes('--no-open')) return
  console.log('Giu cua so nay mo khi hoc. Nhan Ctrl+C de dung.')
  const browser = spawn('rundll32.exe', ['url.dll,FileProtocolHandler', url], {
    stdio: 'ignore',
    windowsHide: true,
  })
  browser.on('error', () => console.log('Dan dia chi tren vao trinh duyet.'))
})
