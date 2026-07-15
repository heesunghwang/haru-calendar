const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");

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
  mainWindow.on("close", (event) => {
    if (quitting) return;
    event.preventDefault();
    mainWindow.hide();
  });
}

async function createTray() {
  const icon = await app.getFileIcon(process.execPath, { size: "small" });
  tray = new Tray(icon);
  tray.setToolTip("하루 캘린더");
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "캘린더 열기", click: showWindow },
    { label: "숨기기", click: () => mainWindow?.hide() },
    { type: "separator" },
    { label: "완전 종료", click: () => { quitting = true; app.quit(); } },
  ]));
  tray.on("click", toggleWindow);
}

app.whenReady().then(async () => {
  app.setLoginItemSettings({ openAtLogin: true });
  createWindow();
  await createTray();
});

app.on("second-instance", showWindow);
app.on("before-quit", () => { quitting = true; });
app.on("window-all-closed", () => {});
