sampleApp.controller("NoteController", function ($scope, $http, $timeout, sharedProperties) {

    $scope.client = {};

    $scope.getAll = function () {

        if ($scope.client === null) {

            return;

        } else {
            $http.post("/note", $scope.client).success(function (response) {
                //$scope.renderClients(response);

                if (response) {
                    $scope.client = response;
                } else {
                    console.log("new account");
                    $scope.client.note = "";
                }
            });
        }
    };
    $scope.getAll();



    $scope.save = function () {
        if ($scope.client === null || $scope.client.name === "") {
            return;
        }

        //old client - update
        $http.put("/note", $scope.client).success(function (response) {
            console.log(response);
            if (response === "invalid") {
                console.log("invalid write key");
            } else {
                $scope.client = response;
                console.log("record updated");
            }
        });

    };

    $scope.insert = function () {

    }




});