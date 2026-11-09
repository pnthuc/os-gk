@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Can Node.js de mo ban tuong tac. Co the mo ML-tong-hop.pdf de doc ngay.
  pause
  exit /b 1
)
node mo-slide.mjs
pause
