

services.factory('UsersFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/userlist', {}, {
        query: { method: 'GET', isArray: true },
        update: { method: 'PUT'},
        create: { method: 'POST' }
    })
});

services.factory('UserConnectedFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/connecteduser', {}, {
        query: { method: 'GET' },
    })
});

services.factory('UserInterestsFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/userlist/users/addinterests/:id', {id:'@_id'}, {
        update: { method: 'POST' },
    })
});

services.factory('UserFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/userlist/:id', {id:'@_id'}, {
        show: { method: 'GET' },
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    })
});