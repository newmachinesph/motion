@echo off
setlocal
cd /d "%~dp0"

if not exist "node_modules\vite\bin\vite.js" (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo Installation failed. Check the error above.
    pause
    exit /b 1
  )
)

echo.
echo Prompt Studio is starting at http://localhost:5173
echo Press Ctrl+C to stop it.
echo.
call npm.cmd run dev -- --host 127.0.0.1 --port 5173
