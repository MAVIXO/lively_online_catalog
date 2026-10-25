
<p align="center">
  <img alt="Files Logo" src="resources/figma_promo_16x9.jpg" width="450" />
  <h2 align="center">Lively Wallpaper</h2>
</p>

## Fork Features & Download
Этот форк добавляет:
- **Онлайн-каталог живых обоев** (MoeWalls, MyLiveWallpapers, Shadertoy, Steam Workshop, Lively Gallery).
- **Совместимость с Wallpaper Engine** (импорт/экспорт `project.json`, Steam Workshop ID, pkg/mp4).
- **Полноценный установщик для Windows (.exe)**.

### 📥 Как скачать и установить:
1. **Быстрая загрузка на Windows (1 клик):** запустите скрипт `download_setup.bat` в корневой папке. Он автоматически скачает и запустит `Lively.Setup.x64.v2.1.0.exe` (208 МБ).
2. **Прямое скачивание установщика:** [Lively.Setup.x64.exe (GitHub Official / 208 МБ)](https://github.com/rocksdanister/lively/releases/download/v2.1.0.0/Lively.Setup.x64.exe).
3. **Через веб-приложение:** откройте вкладку **«Релизы»** в запущенном веб-приложении и нажмите **«Скачать установщик (.exe)»**.

> **Примечание:** На GitHub бинарные `.exe` файлы размером более 100 МБ хранятся не в списке файлов кода, а во вкладке [Releases](https://github.com/MAVIXO/lively_online_catalog/releases).

## Contents
- [About](#about)
- [Features](#features)
- [Support](#support)
- [License](#license)

## About
<img src="/resources/main_preview.gif" width="600" height="338"/>

## Features
*Wait a sec, preview gif clips take some time to load.*
#### Types Of Wallpapers
| Wallpaper | Example |  Interactive | Resolution | Performance |
|--|--|--|--|--|
| Video/GIF | <img src="/resources/wallpaper_video.gif" width="256" height="144"/><br><a href="https://www.pexels.com/video/blue-texture-abstract-leaves-7710243/">Video</a> by Rostislav Uzunov | No| Fixed | Fixed |
| Webpage | <img src="/resources/wallpaper_html.gif" width="256" height="144"/><br><a href="http://louie.co.nz/25th_hour/"> 25th Hour</a> by Loius Coyle  | Yes| Variable | Variable |
| Application/Games | <img src="/resources/wallpaper_emulator.gif" width="256" height="144"/><br>Run Unity or Godot games as wallpaper | Yes | Variable | Variable |
#### Screensavers
<img src="/resources/screen_saver.gif" width="600" height="338"/>

* Lively supports Windows screensaver.
* Any wallpaper can be used as screensaver.
* Multiple monitor supported.
* [Learn more..](https://github.com/rocksdanister/lively/wiki/Screen-Saver)
#### Automation
<img src="/resources/rotary_demo.gif" width="600" height="338"/>

* Lively can be controlled with command line arguments from terminal.
* Integrate with other languages like Python or scripting software AutoHotKey.
* [Learn more..](https://github.com/rocksdanister/lively/wiki/Command-Line-Controls)
#### Lively API
<img src="/resources/music_api.gif" width="600" height="338"/>

* Powerful set of API for developers to create interactive wallpapers.
* Get hardware readings, audio graph, music information..
* [Learn more..](https://github.com/rocksdanister/lively/wiki/API)
#### Machine Learning
<img src="/resources/wallpaper_depth.gif" width="600" height="338"/>

* Leverage Machine Learning inference to create dynamic wallpapers.
* [Learn more..](https://github.com/rocksdanister/lively/wiki/Machine-Learning)
#### More Features
- Minimal webpage renderer powered by chromium.
- Hardware accelerated video playback using mpv/vlc player with customizable video filters.
- Easy to use; Just drag'n'drop media or webpages into lively to set as wallpaper.
- Latest Windows 11 design using WinUI 3 + WindowsAppSDK framework.
- Efficient, Lively is native application designed for Windows.
- Fully opensource & free; no blackmagic, no features behind paywall.
- Shadertoy.com urls are supported as wallpaper.
#### Performance
 * Wallpaper playback pauses when fullscreen application/games run on the machine (~0% cpu, gpu usage). 
 * Set wallpaper playback rules based on running foreground application.
 * Can be set to pause wallpaper when running on battery power (laptops.)
 * Wallpaper automatically pauses when running remote desktop session.

## Support
Are you a Lively fan and want to help out? here are some options..

#### Programmer
Code contributions are welcome, [learn more..](https://github.com/rocksdanister/lively/wiki/Contributing-Guidelines)

#### Designer
Help improve UI/UX of Lively, [learn more..](https://github.com/rocksdanister/lively/wiki/Contributing-Guidelines)

#### Localization
Help translate Lively to more languages, [learn more..](https://github.com/rocksdanister/lively-translations)

#### Suggestions & Bug report
Suggest new features or file bug reports to improve Lively, [learn more..](https://github.com/rocksdanister/lively/issues)

#### Spread the word
Star this repository, leave a Microsoft store review or tell your friend.. any help is welcome :)

## License
Lively is licensed under [GPL-v3.](https://github.com/rocksdanister/lively/blob/core-separation/LICENSE)
