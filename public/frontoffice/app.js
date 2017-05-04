angular
.module('bot', ['angular.filter','ngResource', 'bot.services', 'bot.controllers','ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/quiz-index', {templateUrl: 'views/quiz-index.html', controller: 'QuizIndexCtrl'});
        $routeProvider.when('/quiz-pass/:category', {templateUrl: 'views/quiz-pass.html', controller: 'QuizPassCtrl'});
        $routeProvider.when('/front-index/', {templateUrl: 'views/front-index.html', controller: 'QuizPassCtrl'});
        $routeProvider.otherwise({redirectTo: '/front-index'});
    }])
.run(['$rootScope',function ($rootScope) {

        $rootScope.currentUser = {
            id:"sasa",
            name:"Badran"
        }




    }]);