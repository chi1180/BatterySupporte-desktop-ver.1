const {app, BrowserWindow, Tray, Menu, screen} = require('electron/main')
const path = require('node:path')

const ICON_PATH = path.join(__dirname, "./favicon.ico");

let win;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  win = new BrowserWindow({
    width: width,
    height: height,
    icon: ICON_PATH,
  });
  win.setMenu(null);

  win.on("close", (event) => {
    event.preventDefault();
    win.hide();
  });

  win.loadURL("https://battery-supporter-web-ver-2.vercel.app/#dashboard")

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      click: () => {
        process.exit(0);
      }
    }
  ]);

  const tray = new Tray(ICON_PATH);
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    win.show();
  });

  tray.setToolTip("BatterySupporter");
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    win.hidden();
  }
});

function getPropertyOnLocalStorage(property) {
  return JSON.parse(localStorage.getItem("settings-data"))[property];
}

