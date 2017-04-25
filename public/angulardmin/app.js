angular
    .module('bot', ['ngResource', 'bot.services', 'bot.controllers', 'ngRoute', 'ng-fusioncharts'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when(
            '/user-list',
            {
                templateUrl: 'views/user-list.html',
                controller: 'UsersListCtrl'
            });
        $routeProvider.when('/user-detail/:id',
            {
                templateUrl: 'views/user-detail.html',
                controller: 'UserDetailCtrl'
            });
        $routeProvider.when('/user-creation', {
            templateUrl: 'views/user-creation.html',
            controller: 'UserCreationCtrl'
        });
        $routeProvider.when('/user-stats', {
            templateUrl: 'views/user-stat.html',
            controller: 'UserStatCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/user-list'});

    }])
    .run(['$rootScope',function ($rootScope) {

        $rootScope.currentUser = {
            id:"sasa",
            name:"Badran"
        }




    }]);