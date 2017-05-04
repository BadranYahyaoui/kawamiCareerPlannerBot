var app = angular.module('bot.controllers', []);

app.controller('TagsListCtrl', ['$scope', 'TagsFactory', 'TagFactory', '$location',
    function ($scope, TagsFactory, TagFactory, $location) {

        // callback for ng-click 'editTag':
        $scope.editTag = function (tagId) {
            $location.path('/tag-detail/' + tagId);
        };

        // callback for ng-click 'deleteTag':
        $scope.deleteTag = function (tagId) {
            TagFactory.delete({ id: tagId });
            $scope.tags = TagsFactory.query();
        };

        // callback for ng-click 'createTag':
        $scope.createNewTag = function () {
            $location.path('/tag-creation');
        };

        $scope.tags = TagsFactory.query();
    }]);

app.controller('TagDetailCtrl', ['$scope', '$routeParams', 'TagFactory', '$location',
    function ($scope, $routeParams, TagFactory, $location) {

        // callback for ng-click 'updateTag':
        $scope.updateTag = function () {
            TagFactory.update($scope.tag);
            $location.path('/tag-list');
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/tag-list');
        };

        $scope.tag = TagFactory.show({id: $routeParams.id});
    }]);

app.controller('TagCreationCtrl', ['$scope', 'TagsFactory', '$location',
    function ($scope, TagsFactory, $location) {

        // callback for ng-click 'createNewTag':
        $scope.createNewTag = function () {
            TagsFactory.create($scope.tag);
            $location.path('/tag-list');
        }
    }]);