app.controller('TagsListCtrl', ['$scope', 'TagsFactory', 'TagFactory', '$location','NgTableParams','$route',
    function ($scope, TagsFactory, TagFactory, $location, NgTableParams,$route) {

        // callback for ng-click 'editTag':
        $scope.editTag = function (tagId) {
            $location.path('/tag-detail/' + tagId);
        };

        // callback for ng-click 'deleteTag':
        $scope.deleteTag = function (tagId) {
            TagFactory.delete({ id: tagId });
            $scope.tags = TagsFactory.query();
            $route.reload();
        };

        // callback for ng-click 'createTag':
        $scope.createNewTag = function () {
            $location.path('/tag-creation');
        };

        TagsFactory.query().$promise.then(function (data) {
            $scope.tags = data;
            $scope.tableParams = new NgTableParams({}, { dataset: $scope.tags});
        });
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
             console.log($scope.tag)
            $location.path('/tag-list');
           
        }
    }]);