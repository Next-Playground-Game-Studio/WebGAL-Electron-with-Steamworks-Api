const { app, BrowserWindow, globalShortcut, Menu } = require('electron');
const steamworks = require('steamworks.js');
var bigpicture = false

/**
 * 关闭默认菜单栏
 */
Menu.setApplicationMenu(null);

/**
 * 在应用启动后打开窗口
 */
app.whenReady().then(() => {
    createWindow()
    // 适配 Mac OS
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

/**
 * 打开窗口
 */
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    })

    if (process.env.SteamTenfoot) {
        win.setFullScreen(true)
        bigpicture = true
    } else {
        win.maximize()
    }

    win.loadFile('./public/index.html').then(r => console.log(r));

    // 注册快捷键 F11 切换全屏/半屏
    globalShortcut.register("F11", () => {
        bigpicture = !bigpicture
        win.isFocused() && win.setFullScreen(bigpicture)
    });

    // 注册快捷键 Ctrl + F12 切换开发者工具
    /* globalShortcut.register("Ctrl+F12", () => {
        win.isFocused() && win.webContents.toggleDevTools();
    }); */
}

/**
 * 在关闭所有窗口时退出应用
 */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// steamworks.electronEnableSteamOverlay()
