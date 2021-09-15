const electron = require("electron");
const { dialog } = require('electron')
const { BrowserWindow } = require('electron')
const { execFile,exec,execSync} = require('child_process');
// const ProgressBar = require('electron-progressbar');
const app = electron.app;
const BrowserWindows = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;
const {ipcMain} = require("electron");
var util = require('util');
const fs = require('fs');
const fsaccess = util.promisify(fs.access);
const readline = require('readline');
const path = require("path");
const url = require("url");
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';



let mainWindow;
let tray = null;
global.DDT; 
global.TT;
global.minTT;
global.debug_log = true;

function createWindow(){
    mainWindow = new BrowserWindows({width:900,height:600,frame:false,webPreferences:{devTools:true,nodeIntegration: true, contextIsolation: false,nodeIntegrationInWorker:true,nodeIntegrationInSubFrames:true}});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol: 'file',
        slashes: true
    }));
    //mainWindow.setMaximizable(false);
    //mainWindow.setResizable(false);
    mainWindow.setMinimumSize(900,600); 
    //mainWindow.removeMenu();
    //mainWindow.setMenuBarVisibility(false);
    //.webContents.openDevTools();
    //mainWindow.setIcon(global.disabledIcon);
    mainWindow.maximize();
    mainWindow.on('closed',() => {
        mainWindow = null; 
    })

}
var contextMenu;
var force_quit = false;
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit()
}
else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        if (mainWindow) {
          if (mainWindow.isMinimized()) mainWindow.restore()
          mainWindow.show();
          mainWindow.focus();
          
        }
    });
    app.on('ready',() =>{
        createWindow();

    mainWindow.on('close', (e) => {
            force_quit = true; 
            app.quit();
            
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
        //app.quit();
        
    });
    });
    app.on('activate', () => {
        if (mainWindow == null) {
            createWindow();
            
        }
    });


    
}

ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })
ipcMain.on('maximize', () => {
    mainWindow.maximize()
  })
ipcMain.on('close', () => {
    mainWindow.close()
    
  })
ipcMain.handle('setDDT', async (event, DDT) => { 
    global.DDT = DDT;
    return "setDDT Done!"
})

ipcMain.handle('getDDT', async (event) => {
    return global.DDT;
})

ipcMain.handle('setTT', async (event, TT) => {
    global.TT = TT;
    return "setTT Done!"
})

ipcMain.handle('getTT', async (event) => {
    return global.TT;
})

ipcMain.handle('setminTT', async (event, minTT) => {
    global.minTT = minTT;
    return "setminTT Done!"
})

ipcMain.handle('getminTT', async (event) => {
    return global.minTT;
})

ipcMain.on('DDTToTT', async (event) => {
    mainWindow.show();
    mainWindow.webContents.send("DDTToTT")
})

ipcMain.on('TTminimize', async (event) => {
    mainWindow.show();
    mainWindow.webContents.send("TTminimize")
})
ipcMain.on('LinIneq', async (event) => {
    mainWindow.show();
    mainWindow.webContents.send("LinIneq")
})
ipcMain.on('Message', async (event,path_save) => {
    const options = {
        type: 'info',
        buttons: ['Ok'],
        defaultId: 2,
        title: 'Linear Inequalities Saved',
        message: 'Linear Inequalities Saved to File: ' + path_save,
      };
    dialog.showMessageBox(null, options);

})