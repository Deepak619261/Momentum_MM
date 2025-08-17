# Start-Apps.ps1
# Stop any existing Momentum.API processes
Stop-Process -Name "Momentum.API" -Force -ErrorAction SilentlyContinue

# Start both apps in separate windows
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '${PSScriptRoot}\backend\Momentum.API'; dotnet run --launch-profile Development"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '${PSScriptRoot}\frontend\momentum-ui'; ng serve"

Write-Host "Applications started!"
Write-Host "API running at: https://localhost:7262"
Write-Host "Angular UI running at: http://localhost:4200"
