app.controller('UsersController', ['$scope', 'UserFactory', function($scope, UserFactory) {
    UserFactory.getUserList().then(function(resp) {
         $scope.users = resp.data;
    });
}]);

app.controller('UsersDelController', ['$scope', 'UserFactory', function($scope,UserFactory) {

    $scope.remove=UserFactory.deleteUser(this);
    console.log("user is :"+user , "\n user id :"+user._id);
}]);
