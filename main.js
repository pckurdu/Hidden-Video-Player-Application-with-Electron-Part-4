const {app,BrowserWindow,Menu,dialog,ipcMain}=require('electron')//ipcMain upload

const exec=require('child_process').exec
const fs = require('fs')//I will use file system to upload video

let filename = 'D:\\electron\\hiddenVideoPlayer-part3\\bats\\names'//

const path=require('path')
const url=require('url')

let win 
let child

const template = [
    {
        label:"Upload Video",
        click () {
            dialog.showOpenDialog(
                { filters: [

                    { name: 'video', extensions: ['mp4','webM','ogg'] }
                
                ]},function (fileNames) {
                    

                    const bat=exec('cmd /c move.bat '+'"'+fileNames[0]+'"',{cwd:"D:\\electron\\hiddenVideoPlayer-part3\\bats"},function(){
            
                    });

                    let[a,s,d,f,r,name]=fileNames[0].split('\\');
                    fs.appendFile(filename, "D:\\electron\\hiddenVideoPlayer-part3\\bats\\ElectronFiles\\"+name + ','+name+'\n')
                    
                    win.reload()
            }); 
            
        }
    }
]


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)



function createWindow() {
    
    win =new BrowserWindow({width:1000,height:800,show:false})

    win.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol:'file',
        slashes:true
    }))  

    child = new BrowserWindow({parent:win,width:400,height:300,show:true,frame:false})

    child.loadURL(url.format({
        pathname:path.join(__dirname,'login.html'),
        protocol:'file',
        slashes:true
    }))
   
    win.openDevTools();// Developer Tool

    

}

ipcMain.on('entry-accepted', (event, arg) => {
    if(arg=='ping'){
        const bat=exec('cmd /c electron.bat 123456',{cwd:"D:\\electron\\hiddenVideoPlayer-part3\\bats"},function(){
            
        });
        win.show()
        child.hide()
    }
})

ipcMain.on('exit', (event, arg) => {
    if(arg=='ping'){
        app.quit()
    }
})

app.on('ready',createWindow)

app.on('before-quit', () => {
    const bat=exec('cmd /c electron.bat e',{cwd:"D:\\electron\\hiddenVideoPlayer-part3\\bats"},function(){
            
    });
    app.quit()
})

app.on('closed', () => {
    const bat=exec('cmd /c electron.bat e',{cwd:"D:\\electron\\hiddenVideoPlayer-part3\\bats"},function(){
            
    });
    app.quit()
})