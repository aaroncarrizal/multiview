import { app, BrowserWindow, ipcMain, screen } from 'electron'

let mainWindow

app.on('ready', () => {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  console.log(`Screen width: ${width}`)
  console.log(`Screen height: ${height}`)

  mainWindow = new BrowserWindow({
    width: width / 4,
    height: height / 2,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadFile('index.html')

  ipcMain.on('open-stream-window', (event, streamURL) => {
    const streamWindow = new BrowserWindow({
      width: width / 2,
      height: width / 4,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    })

    streamWindow.loadFile('stream.html')

    streamWindow.webContents.on('did-finish-load', () => {
      streamWindow.webContents.send('load-stream', streamURL)
    })
  })
})
