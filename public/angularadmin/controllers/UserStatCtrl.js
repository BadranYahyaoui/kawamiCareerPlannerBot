app.controller('UserStatCtrl', ['$scope','UserStatFactory','$location','$timeout',
    function ($scope, UserStatFactory, $location,$timeout) {


        $scope.stats=UserStatFactory.query();
        myDataSource = {
            chart: {
                caption: "Numer of users that linked thier socia media accounts",
                subcaption: "Facebook | Twitter | Google",
                startingangle: "120",
                showlabels: "0",
                showlegend: "1",
                enablemultislicing: "0",
                slicingdistance: "15",
                showpercentvalues: "1",
                showpercentintooltip: "0",
                plottooltext: "Total Number of : $label Users is  : $datavalue",
                theme: "fint"
            },
            data: [
                {
                    label: "Facebook",
                    value: ""
                },
                {
                    label: "Twitter",
                    value: ""
                },
                {
                    label: "Google",
                    value: ""
                },
                {
                    label: "NO account linked",
                    value: "15"
                }
            ]
        };
        $scope.stats.$promise.then(function (result) {
            $scope.stats = result;

                myDataSource.data[0].value=$scope.stats.facebook;
                myDataSource.data[1].value=$scope.stats.twitter;
                myDataSource.data[2].value=$scope.stats.google;
                myDataSource.data[3].value=$scope.stats.unverified;

        });

        $scope.mDataSource=myDataSource;
        console.log($scope.mDataSource);
        // $timeout( function(){
        //    console.log(myStats.facebook);
        //     myDataSource.data[0].value=myStats.facebook;
        //     myDataSource.data[1].value=myStats.twitter;
        //     myDataSource.data[2].value=myStats.google;
        //     myDataSource.data[3].value=myStats.unverified;
        //
        //     $scope.myDataSource=myDataSource;
        // }, 1500 );

    }]);

