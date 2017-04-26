var services = angular.module('bot.services', ['ngResource']);

services.factory('TagsFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/api/tags', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('TagFactory', function ($resource) {
    return $resource('https://carrerplanner-bot.herokuapp.com/api/tags/:id', {id:'@_id'}, {
        show: { method: 'GET' },
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    })
});