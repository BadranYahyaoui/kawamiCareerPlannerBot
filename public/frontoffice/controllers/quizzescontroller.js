app.controller('QuizIndexCtrl', ['$scope', 'QuizzesFactory', 'QuizFactory', '$location','$route', '$window','UserConnectedFactory',
    function ($scope, QuizzesFactory, QuizFactory, $location,$route, $window, UserConnectedFactory) {   

        
        $scope.connecteduser = UserConnectedFactory.query();
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
         $scope.connecteduser = UserConnectedFactory.query();
        
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
                console.log($scope.connecteduser);
        }}
           /* else{
                //$location.path('/');
            }*/
           /* if($scope.interests=="") {
                $route.reload();
            }
            else{
              
            }
                */
        
        

        

  }]);

