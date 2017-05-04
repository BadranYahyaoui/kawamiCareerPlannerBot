app.controller('UniversitiesListCtrl', ['$scope', 'UniversitiesFactory',
    function ($scope, UniversitiesFactory) {

        // UniversitiesFactory.query().$promise.then(function (data) {
        //     $scope.universities = data;
        //     console.log(data);
        // });
        $scope.universities= UniversitiesFactory.query();
    }]);
