var app=angular.module('myApp',['ui.router']);
let fs = require('fs');
let filename = 'D:\\electron\\hiddenVideoPlayer-part3\\bats\\names'


let no;

app.config(function($stateProvider) {
    $stateProvider
    .state("videoplayer", {
        url:'/videoplayer/:p',
        templateUrl : "video.html",
        controller:"videoCtrl"
    });
    
});


app.service('transporterService', function() {
    var List = [];
  
    this.addList = function(newList) {
        List.push(newList);
    };
    this.getList = function(){
        return List;
    };
  });

app.controller('videoCtrl',function($scope,$stateParams,transporterService){
   
    $scope.myVar=true;
    $scope.no=$stateParams.p;
    $scope.List=transporterService.getList();
    
    $scope.List2 = $scope.List[0].find(i => i.no == $scope.no);

    if($scope.List2.path==""){
        $scope.myVar=false;
    }
})


app.controller('myCtrl',function($scope,transporterService){
    let videos=[];
    let data = fs.readFileSync(filename, 'utf8').split('\n');
    if(data==""){
        var video={
            no:0,
            path:"",
            name:"Please Add a Video"
        }

        videos.push(video);
    }
    for (let index = 0; index < data.length-1; index++) {
        let [ path, name ] = data[index].split(',')
        console.log(data[index])
        var video={
            no:index,
            path:path,
            name:name
        }

        videos.push(video);
        
    }

    $scope.data=videos;
    transporterService.addList(videos);
    
})

