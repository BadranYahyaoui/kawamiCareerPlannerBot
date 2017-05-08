//var services = angular.module('bot.services', ['ngResource']);
services.factory('UniversitiesFactory', function ($resource) {
    return $resource('http://localhost:3000/api/universities',{}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })

});
services.factory('UniversitieFactory', function ($resource) {
    return $resource('http://localhost:3000/api/universities/:id', {id:'@_id'}, {
        show: { method: 'GET' },
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    })
   
});



