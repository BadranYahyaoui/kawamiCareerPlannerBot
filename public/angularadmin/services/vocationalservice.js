services.factory('VocationalsFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/api/vocationals', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

