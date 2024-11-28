const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");
const db = require("./src/database");

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    fullscreen: false,
    // width: 800,
    // height: 600,
    icon: path.join(__dirname, "assets/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("default.html");
}

app.whenReady().then(createWindow);

ipcMain.on("login", (event, { username, password }) => {
  db.authenticateUser(username, password)
    .then((isAuthenticated) => {
      if (isAuthenticated) {
        // Load the home page if authentication is successful
        mainWindow.loadFile("case/index.html");
      } else {
        event.reply("login-response", { success: false });
      }
    })
    .catch((err) => {
      console.error(err);
      event.reply("login-response", { success: false });
    });
});

// Handle logout
ipcMain.on("logout", (event) => {
  mainWindow.loadFile("default.html"); // Redirect to login page
});

ipcMain.on("insertReport", (event, formData) => {
  console.log(formData);
  db.insertRecordToDatabase(formData);
  mainWindow.loadFile("case/index.html");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
