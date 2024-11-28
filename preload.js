const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sendLogin: (username, password) =>
    ipcRenderer.send("login", { username, password }),
  onLoginResponse: (callback) =>
    ipcRenderer.on("login-response", (event, response) => callback(response)),
  sendLogout: () => ipcRenderer.send("logout"),
  insertReport: (formData) => ipcRenderer.send("insertReport", formData),
});
