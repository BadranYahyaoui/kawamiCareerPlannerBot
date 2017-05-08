var app = angular.module('bot.controllers', ['ngTable']);

app.controller('UniversitiesListCtrl', ['$scope', 'UniversitiesFactory','UniversitieFactory','NgTableParams',
    function ($scope, UniversitieFactory,UniversitiesFactory,NgTableParams) {

UniversitiesFactory.query().$promise.then(function (data) {
            $scope.universities = data;
            $scope.tableParams = new NgTableParams({}, { dataset: $scope.universities});
        });

      var selectedIndex=null;
     $scope.deleteUniversity=function(university){
        university.$delete(function(){
        $scope.universities.splice(selectedIndex,1);
        });
    }
    }]);

