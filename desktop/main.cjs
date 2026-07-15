const { app, BrowserWindow, Menu, Tray, nativeImage } = require("electron");
const path = require("path");
const iconPath = path.join(__dirname, "icon.png");

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();

let mainWindow;
let tray;
let quitting = false;

function showWindow() {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
}

function toggleWindow() {
  if (mainWindow?.isVisible()) mainWindow.hide();
  else showWindow();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 470,
    height: 820,
    minWidth: 390,
    minHeight: 620,
    title: "HARU",
    icon: iconPath,
    frame: false,
    backgroundColor: "#f3f1ec",
    autoHideMenuBar: true,
    skipTaskbar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  mainWindow.setAspectRatio(470 / 820);
  Menu.setApplicationMenu(null);
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.insertCSS("html{scrollbar-width:none}::-webkit-scrollbar{display:none;width:0;height:0}.top{-webkit-app-region:drag;user-select:none}.top button{-webkit-app-region:no-drag}");
  });
  mainWindow.on("close", (event) => {
    if (quitting) return;
    event.preventDefault();
    mainWindow.hide();
  });
}

function createTray() {
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 32, height: 32 });
  tray = new Tray(icon);
  tray.setToolTip("HARU");
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "캘린더 열기", click: showWindow },
    { label: "숨기기", click: () => mainWindow?.hide() },
    { type: "separator" },
    { label: "완전 종료", click: () => { quitting = true; app.quit(); } },
  ]));
  tray.on("click", toggleWindow);
}

app.whenReady().then(() => {
  app.setLoginItemSettings({ openAtLogin: true });
  createWindow();
  createTray();
});

app.on("second-instance", showWindow);
app.on("before-quit", () => { quitting = true; });
app.on("window-all-closed", () => {});
