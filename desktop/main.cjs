const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 470,
    height: 820,
    minWidth: 390,
    minHeight: 620,
    title: "하루 캘린더",
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
}

app.whenReady().then(() => {
  app.setLoginItemSettings({ openAtLogin: true });
  createWindow();
});

app.on("second-instance", () => {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.focus();
});

app.on("window-all-closed", () => app.quit());
