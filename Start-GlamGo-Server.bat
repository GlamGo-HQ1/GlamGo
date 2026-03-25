@echo off
color 0A
TITLE GlamGo Development Server (Port 3000)

echo ===================================================
echo               GLAMGO DEVELOPMENT SERVER
echo ===================================================
echo.
echo Cleaning up old server instances on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    if "%%a" neq "0" taskkill /F /PID %%a >nul 2>&1
)

echo.
echo Starting fresh server on http://localhost:3000
echo Please wait...
echo.

npm run dev -- -p 3000
