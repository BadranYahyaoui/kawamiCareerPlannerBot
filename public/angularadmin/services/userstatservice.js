services.factory('UserStatFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/userlist/users/stats', {}, {
        query: { method: 'GET', isArray: false }
    })
});