@echo off
chcp 65001 >nul
title Загрузка и запуск установщика Lively Wallpaper v2.1.0
echo ======================================================================
echo    Lively Wallpaper v2.1.0 + Online Catalog & Wallpaper Engine
echo ======================================================================
echo.
echo [1/2] Загрузка официального установщика Lively.Setup.x64.exe (208 МБ)...
echo Пожалуйста, подождите несколько секунд...
echo.

powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://github.com/rocksdanister/lively/releases/download/v2.1.0.0/Lively.Setup.x64.exe' -OutFile 'Lively.Setup.x64.v2.1.0.exe' -UseBasicParsing"

if exist "Lively.Setup.x64.v2.1.0.exe" (
    echo.
    echo [2/2] Установщик успешно загружен! Запуск установки...
    start "" "Lively.Setup.x64.v2.1.0.exe"
) else (
    echo.
    echo [ОШИБКА] Не удалось автоматически скачать файл.
    echo Вы можете скачать его напрямую по ссылке:
    echo https://github.com/rocksdanister/lively/releases/download/v2.1.0.0/Lively.Setup.x64.exe
    pause
)
