app.factory('UserFactory',['$http', function($http) {

  var UserFactory = {};

  //Get User List
  UserFactory.getUserList = function() {
    return $http({
          url: "http://carrerplanner-bot.herokuapp.com/userlist",
          method: 'GET'
         });
  };

  //Insert new User.
  UserFactory.createUser = function (User) {
    return $http({
          url: 'http://carrerplanner-bot.herokuapp.com/userlist',
          method: 'POST',
          data : User
      });
  };

  //Get User.
  UserFactory.getUser = function (User) {
    return  $http({
      url: "http://carrerplanner-bot.herokuapp.com/userlist/" + User.id,
      method: 'GET'
  });
  };

  //Update User.
   UserFactory.updateUser = function (User) {
        return  $http({
          url: 'http://carrerplanner-bot.herokuapp.com/userlist',
          method: 'PUT',
          data : User,
      });
      };

  //Delete User.
  UserFactory.deleteUser = function (user) {
    console.log("user is :"+user , "\n user id :"+user._id);
   return  $http({
          url: 'http://carrerplanner-bot.herokuapp.com/userlist/'+ user._id,
          method: 'DELETE',
      });
  };

  return UserFactory;
}]);
