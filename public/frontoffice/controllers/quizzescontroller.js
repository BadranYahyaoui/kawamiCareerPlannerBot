app.controller('QuizIndexCtrl', ['$scope', 'QuizzesFactory', 'QuizFactory', '$location','$route', '$window','UserConnectedFactory',
    function ($scope, QuizzesFactory, QuizFactory, $location,$route, $window, UserConnectedFactory) {   

        
        $scope.connecteduser = UserConnectedFactory.query();
        /*$scope.connecteduser =
            {
_id: "590b327fc160b60011bbc320",
__v: 0,   
interests: [ ],
twitter: {
displayName: "Nader Kasri",
id: "417463559",
token: "417463559-UA2px53ngOxfZpTAIORAjkWBIh4zPcBo7yrpIB42",
tokenSecret: "JYmFRmYY08DnWyi3Vah4WmB6u6bMYmfDamFu7gkbZ6bDE",
username: "Ignizkz",
interests: [ ]
},
facebook: {
email: "nader.kasri@gmail.com",
id: "1352705098183480",
name: "Nader Kasri",
token: "EAALXJoVlZBmABAAtMr5bRMzXG6sAWBNIxZCFCdJR51qzYU0lnaTC2A1YJzaeQSZALTgqSgTPU5vKKcFhFtp8r29buZBm1MPBt7OX0onIMmlbrNdk1ZCLG9JL97oYrzuKoZB2gxZA5JAKKR9ZBfaWuTwyZBX4F9AxAZBMQkZCUuXNS2hZAe9RkJCZBnVcR",
interests: [ ]
},
local: {
password: "$2a$08$nW2Sa3lyPdUvaqI10GVAI.ptfV2tVyWiTe/9TFhUm0Ku8u/eMTwu.",
email: "nader.kasri@esprit.tn"
}
};*/
        console.log($scope.connecteduser);
        
       $scope.gotoQuiz = function (quizCategory) {
            if($scope.connecteduser.states==0){
            $window.location.href="https://carrerplanner-bot.herokuapp.com/login";
                console.log($scope.connecteduser);
        }
            else {
                $location.path('/quiz-pass/' + quizCategory);
            }
            }
            
        
        $scope.quizzes = QuizzesFactory.query();
        
        

        

  }]);

app.controller('QuizPassCtrl', ['$scope','$route', '$routeParams', 'UserConnectedFactory','QuizzesFactory', 'QuizFactory','QuizCategoryFactory', '$location','$window',
    function ($scope, $route, $routeParams, UserConnectedFactory,QuizzesFactory, QuizFactory, QuizCategoryFactory, $location, $window) {   

         $scope.interests =[];
         $scope.quiz = QuizCategoryFactory.show({category: $routeParams.category});
         var selectedtimes= $scope.quiz.selectedTimes+1;
         $scope.connecteduser = UserConnectedFactory.query();
        
        /*$scope.connecteduser =
            {
_id: "590b327fc160b60011bbc320",
__v: 0,
interests: [ ],
twitter: {
displayName: "Nader Kasri",
id: "417463559",
token: "417463559-UA2px53ngOxfZpTAIORAjkWBIh4zPcBo7yrpIB42",
tokenSecret: "JYmFRmYY08DnWyi3Vah4WmB6u6bMYmfDamFu7gkbZ6bDE",
username: "Ignizkz",
interests: [ ]
},
facebook: {
email: "nader.kasri@gmail.com",
id: "1352705098183480",
name: "Nader Kasri",
token: "EAALXJoVlZBmABAAtMr5bRMzXG6sAWBNIxZCFCdJR51qzYU0lnaTC2A1YJzaeQSZALTgqSgTPU5vKKcFhFtp8r29buZBm1MPBt7OX0onIMmlbrNdk1ZCLG9JL97oYrzuKoZB2gxZA5JAKKR9ZBfaWuTwyZBX4F9AxAZBMQkZCUuXNS2hZAe9RkJCZBnVcR",
interests: [ ]
},
local: {
password: "$2a$08$nW2Sa3lyPdUvaqI10GVAI.ptfV2tVyWiTe/9TFhUm0Ku8u/eMTwu.",
email: "nader.kasri@esprit.tn"
}
};*/
        
        console.log($scope.connecteduser);
        
        
        
        $scope.gotoPath = function() {
             for(i=0; i < $scope.interests.length; i++) {
            if($scope.interests[i]==null) {
                $scope.interests.splice(i,1);  
            }
        }
            for(i=0; i < $scope.interests.length; i++) {
            if($scope.interests[i]==null) {
                $scope.interests.splice(i,1);  
            }
        }
            console.log($scope.interests);
            if($scope.connecteduser.states==0){
            $window.location.href="https://carrerplanner-bot.herokuapp.com/login";
                
        }
            else{
                $scope.connecteduser.interests.push($scope.interests);
                console.log($scope.connecteduser);
                UserInterestsFactory.update($scope.connecteduser);
                $scope.quiz.selectedTimes=selectedtimes;
                QuizFactory.update($scope.quiz);
                $location.path('/front-index/');
                 
            }}
           /* if($scope.interests=="") {
                $route.reload();
            }
            else{
              
            }
                */
        
        

        

  }]);

