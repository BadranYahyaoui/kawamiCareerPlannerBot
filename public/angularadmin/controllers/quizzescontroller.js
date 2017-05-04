app.controller('QuizzesListCtrl', ['$scope', 'QuizzesFactory', 'QuizFactory', '$location','$route',
    function ($scope, QuizzesFactory, QuizFactory, $location, $route) {
        
        $scope.viewQuiz = function (quizId) {
            $location.path('/quiz-view/' + quizId);
        };
        
         $scope.deleteQuiz = function (quizId) {
            QuizFactory.delete({ id: quizId });
            $scope.quizzes = QuizzesFactory.query();
             $route.reload;
        };
        

        $scope.quizzes = QuizzesFactory.query();
        
  

        

  }]);

app.controller('QuizzesStatsCtrl', ['$scope', 'QuizzesFactory','QuizzesStatsFactory', 'QuizFactory', '$location',
    function ($scope, QuizzesFactory, QuizzesStatsFactory, QuizFactory, $location) {
        
        $scope.stats=QuizzesStatsFactory.query();
        console.log($scope.stats);
        myDataSource = {
    "chart": {
        caption: "Most Successful Quiz Categories",
        numberPrefix: "",
        theme: "ocean"
    },
    "data": [
        
    ]
}
        var model={
            label:"",
            value:"",
            
        }
        $scope.stats.$promise.then(function (result) {
            $scope.stats = result;
            
            for (i=0; i < result.length; i++) {
                model={};
                model.label=result[i]._id;
                model.value=result[i].total;
                
                myDataSource.data.push(model);
                /*console.log(model);*/
                
            }
            
           /* $scope.stats.forEach(function(element){
                model.label=element._id;
                model.value=element.total;
                 console.log(model);
                
                if (myDataSource.data.indexOf(model) == -1) {
    myDataSource.data.push(model);
}
            
            });*/

        });

        $scope.mDataSource=myDataSource;



            
    }]);    

app.controller('QuizzesViewCtrl', ['$scope', '$routeParams', 'QuizFactory', '$location',
    function ($scope, $routeParams, QuizFactory, $location) {

          $scope.quiz = QuizFactory.show({id: $routeParams.id});
        
        
        $scope.editQuiz = function (quizId) {
            $location.path('/quiz-edit/' + quizId);
            
        };
        
        
       

    }]);

app.controller('QuizzesEditCtrl', ['$scope', '$routeParams', 'QuizFactory', 'TagsFactory', '$location',
    function ($scope, $routeParams, QuizFactory, TagsFactory, $location) {


        
            $scope.updateQuiz = function () {
            console.log($scope.quiz);
            QuizFactory.update($scope.quiz);
            quizId = $scope.quiz._id
            $location.path('/quiz-list/');
        };

        $scope.tags = TagsFactory.query();
        $scope.quiz = QuizFactory.show({id: $routeParams.id});
       

    }]);

app.controller('QuizCreationCtrl', ['$scope', 'TagsFactory','QuizzesFactory', '$location',
    function ($scope, TagsFactory, QuizzesFactory, $location) {
        
        $scope.tags = TagsFactory.query();

        $scope.createNewQuiz = function () {
            QuizzesFactory.create($scope.quiz);
            $location.path('/quiz-list');
        }
    }]);

