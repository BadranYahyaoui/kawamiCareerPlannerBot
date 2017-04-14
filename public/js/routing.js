
app.config(function($routeProvider){
  $routeProvider.otherwise({redirectTo:'/'})
  .when('/',{
      templateUrl:'tpl/tpl.index.html'
  }).when('/users/list',{
      templateUrl:'tpl/tpl.users.list.html',
      controller:'UsersController'
  }).when('/users/profile',{
      templateUrl:'tpl/tpl.profile.html'
  }).when('/logout',{
      templateUrl:'tpl/tpl.logout.html'
  });
});
