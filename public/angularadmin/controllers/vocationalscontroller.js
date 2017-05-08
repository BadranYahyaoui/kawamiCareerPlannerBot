
app.controller('VocationalsListCtrl', ['$scope','VocationalsFactory',
    function ($scope, VocationalsFactory) {

         $scope.vocationals=VocationalsFactory.query();
     $scope.vocational=new VocationalsFactory();
var selectedIndex=null;


   $scope.delete=function(vocational){
        vocational.$delete(function(){
        $scope.vocationals.splice(selectedIndex,1);
        });
    }
    }]);
