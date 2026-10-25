# ======================================================================
# Lively Wallpaper v2.1.0 Installer Downloader
# ======================================================================
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "   Lively Wallpaper v2.1.0 (Online Catalog + Steam WE Support)       " -ForegroundColor Yellow
Write-Host "======================================================================" -ForegroundColor Cyan

$url = "https://github.com/rocksdanister/lively/releases/download/v2.1.0.0/Lively.Setup.x64.exe"
$output = Join-Path $PSScriptRoot "Lively.Setup.x64.v2.1.0.exe"

if (Test-Path $output) {
    Write-Host "[OK] Файл Lively.Setup.x64.v2.1.0.exe уже существует в папке!" -ForegroundColor Green
    Write-Host "Запуск инсталлятора..." -ForegroundColor Cyan
    Start-Process -FilePath $output
    exit
}

Write-Host "`n[1/2] Загрузка установщика Lively.Setup.x64.v2.1.0.exe (208 МБ)..." -ForegroundColor White
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

try {
    Start-BitsTransfer -Source $url -Destination $output -DisplayName "Скачивание Lively Wallpaper" -ErrorAction Stop
} catch {
    Write-Host "BitsTransfer недоступен, загрузка через WebClient..." -ForegroundColor Gray
    $wc = New-Object System.Net.WebClient
    $wc.DownloadFile($url, $output)
}

if (Test-Path $output) {
    Write-Host "`n[2/2] Установщик успешно сохранен: $output" -ForegroundColor Green
    Write-Host "Запуск процесса установки..." -ForegroundColor Cyan
    Start-Process -FilePath $output
} else {
    Write-Host "`n[ОШИБКА] Не удалось загрузить файл." -ForegroundColor Red
}
