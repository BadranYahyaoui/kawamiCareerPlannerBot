services.factory('UniversitiesFactory', function ($resource) {
    return $resource('http://carrerplanner-bot.herokuapp.com/api/universities', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

