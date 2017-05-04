app.controller('VocationalsListCtrl', ['$scope', 'VocationalsFactory',
    function ($scope, VocationalsFactory) {

        // UniversitiesFactory.query().$promise.then(function (data) {
        //     $scope.universities = data;
        //     console.log(data);
        // });
        $scope.vocationals= VocationalsFactory.query();
    }]);
