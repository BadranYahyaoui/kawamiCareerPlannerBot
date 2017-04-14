angular.module('bot', ['ngResource', 'bot.services', 'bot.controllers','ngRoute']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user-list', {templateUrl: 'views/user-list.html', controller: 'UsersListCtrl'});
        $routeProvider.when('/user-detail/:id', {templateUrl: 'views/user-detail.html', controller: 'UserDetailCtrl'});
        $routeProvider.when('/user-creation', {templateUrl: 'views/user-creation.html', controller: 'UserCreationCtrl'});
        $routeProvider.otherwise({redirectTo: '/user-list'});
    }]);