services.factory('VocationalsFactory', function ($resource) {
    return $resource('http://localhost:3000/api/vocationals/:id', {id:'@_id'}, {
        show: { method: 'GET' },
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    })
});

