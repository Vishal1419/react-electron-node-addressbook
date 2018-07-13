const electron = require('electron');
// Module to control application life.
const { app, BrowserWindow, ipcMain, dialog } = electron;

const fs = require('fs');
const path = require('path');
const url = require('url');

const Excel = require('exceljs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.setMenu(null);
    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../bundle/index.html'),
        protocol: 'file:',
        slashes: true
    });
    
    //mainWindow.loadURL(startUrl);
    const ses = mainWindow.webContents.session;
        ses.setProxy({ proxyRules: 'direct://' }, () => {
        mainWindow.loadURL(startUrl);
        mainWindow.show();
    });
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    ipcMain.on('print-to-pdf', function (event) {
        // Use default printing options
        dialog.showSaveDialog({
            defaultPath: 'D:\\addressbook.pdf',
            filters: [{
                name: 'Adobe PDF',
                extensions: ['pdf']
            }]
        }, pdfPath => {
            if (pdfPath) {
                mainWindow.webContents.printToPDF({}, function (error, data) {
                    if (error) event.sender.send('failed-write-pdf', pdfPath)
                    fs.writeFile(pdfPath, data, function (error) {
                        if (error) {
                            event.sender.send('failed-write-pdf', pdfPath)
                        }
                        // here shell = electron.shell
                        // shell.openExternal('file://' + pdfPath)
                        event.sender.send('wrote-pdf', pdfPath)
                    })
                })
            } else {
                event.sender.send('cancelled-write-pdf')                
            }
        })
    })

    ipcMain.on('export-to-excel', (event, defaultFileNameAndPath, sheets) => {
        // Use default printing options
        dialog.showSaveDialog({
            defaultPath: defaultFileNameAndPath,
            filters: [{
                name: 'Microsoft Excel',
                extensions: ['xlsx']
            }]
        }, excelPath => {
            if (excelPath) {
                const workbook = new Excel.Workbook();
                sheets.forEach(sheet => {
                    let columnWidths = [];
                    const worksheet = workbook.addWorksheet(sheet.name);
                    worksheet.addRow(sheet.header);
                    const headerCellWidths = [];
                    sheet.header.forEach(element => {
                        headerCellWidths.push(String(element).length || 0);
                    });
                    columnWidths.push(headerCellWidths);
                    sheet.data.forEach(element => {
                        const cellWidths = [];
                        worksheet.addRow(element);
                        element.forEach(e => {
                            cellWidths.push(String(e).length || 0);
                        });
                        columnWidths.push(cellWidths);
                    });
                    columnWidths = columnWidths.reduce((max, current) => {
                        const tempArray = [];
                        for(let i = 0; i < max.length; i++) {
                            tempArray.push(max[i] > current[i] ? max[i] : current[i]);
                        }
                        return tempArray;
                    });
                    worksheet.columns.forEach((column, index) => {
                        column.width = columnWidths[index] + 1;
                    });
                });
                workbook.xlsx.writeFile(excelPath).then(() => {
                    event.sender.send('wrote-excel', excelPath)
                }).catch(() => {
                    event.sender.send('failed-write-excel', excelPath)
                });
            } else {
                event.sender.send('cancelled-write-excel');               
            }
        })
    })

    ipcMain.on('export-to-json', (event, defaultFileNameAndPath, data) => {
        // Use default printing options
        dialog.showSaveDialog({
            defaultPath: defaultFileNameAndPath,
            filters: [{
                name: 'JSON',
                extensions: ['json']
            }]
        }, jsonPath => {
            if (jsonPath) {
                try {
                    fs.writeFileSync(jsonPath, data, 'utf-8');
                    event.sender.send('wrote-json', jsonPath);                    
                } catch (err) {
                    event.sender.send('failed-write-json', jsonPath);                    
                }
            } else {
                event.sender.send('cancelled-write-json');               
            }
        })
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

// app.on('activate', function () {
//     // On OS X it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (mainWindow === null) {
//         createWindow()
//     }
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.