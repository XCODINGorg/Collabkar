$ErrorActionPreference = 'Stop'

Write-Host "Starting backend (port 4001)..." -ForegroundColor Cyan
Start-Process -WorkingDirectory backend -FilePath npm.cmd -ArgumentList @('run','dev')

Write-Host "Starting frontend (port 3000)..." -ForegroundColor Cyan
Start-Process -WorkingDirectory frontend -FilePath npm.cmd -ArgumentList @('run','dev')

Write-Host "Open http://localhost:3000" -ForegroundColor Green

