import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  // Maneja la creación de nuevas ventanas para los streams
  ipcMain.on('open-stream-window', (event, streamURL) => {
    const streamWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false, // Hacer la ventana sin marco
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    // Cargar una página que contenga el stream
    streamWindow.loadURL(streamURL);
  });
});
