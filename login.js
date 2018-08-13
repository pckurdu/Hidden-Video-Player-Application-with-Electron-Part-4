
            let $ = require('jquery')//load jquery
            let fs = require('fs')//load file system
            let filename = 'D:\\electron\\hiddenVideoPlayer-part3\\bats\\authorities'// file name path
            const ipc = require('electron').ipcRenderer;//load ipc renderer

            $('#btn-login').on('click', () => {//when btn-login click
            
                if(fs.existsSync(filename)) {//check file

                let data = fs.readFileSync(filename, 'utf8').split('\n')//read file
                
                data.forEach((authorities, index) => {
                    let [ user, password ] = authorities.split(',')
                    let [name1,usr]=user.split(':')
                    let [name2,pass]=password.split(':')
                    let txtUser=$('#txtUsr').val();
                    let txtPwd=$('#txtPwd').val();
                    if(txtUser==usr && txtPwd==pass){
                        
                        ipc.sendSync('entry-accepted', 'ping')//login success
                        
                    }
                    else{
                        $('#lbl').text('Username or Password is Incorrect')//
                    }
                    
                    })
                }else{
                    $('#lbl').text('File not found')
                }
            })
            
            $('#btn-exit').on('click', () => {//when btn-exit click
                
               ipc.sendSync('exit', 'ping')
            })
