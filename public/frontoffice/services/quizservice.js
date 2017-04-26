services.factory('QuizzesFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/api/quizzes', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('QuizzesStatsFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/api/quizzes/stats', {}, {
        query: { method: 'GET', isArray: true }
    })
});

services.factory('QuizCategoryFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/api/quizzes/pass/:category', {category:'@category'}, {
        show: { method: 'GET'}
    })
});

services.factory('QuizFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/api/quizzes/:id', {id:'@_id'}, {
        show: { method: 'GET' },
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    })
});