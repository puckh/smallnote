var sampleApp = angular.module('noteApp', ['angular-growl', 'ui.bootstrap']);

sampleApp.config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(4000);
    growlProvider.globalDisableCountDown(true);
}]);

sampleApp.controller("NoteController", function ($scope, $http, $timeout, growl) {

    $scope.isCollapsed = true;
    $scope.client = {};

    $scope.messageSaveSuccess = function () {
        growl.success("Save complete :)");
    };
    $scope.messageSaveWrongKey = function () {
        growl.error("Invalid write key used.", {
            title: 'Save failed :('
        });
    };
    $scope.messageGotNoKey = function () {
        growl.info("This note can be modified by anyone. Hope you're cool with that.", {
            title: 'No Write Key',
            ttl: 7000
        });
    };
    $scope.messageNewNote = function () {
        growl.info("No previous note of this name exists. It's yours if you save it.", {
            title: 'A New Note!',
            ttl: 7000
        });
    };
    $scope.messageGotHasKey = function () {
        growl.info("This note can only be modified using the matching write key.", {
            title: 'Write Protected',
            ttl: 7000
        });
    };
    $scope.messageNoOriginalKey = function () {
        growl.info("This note was created without a write key, so it stays that way... forever.", {
            title: 'Write Key Ignored',
            ttl: 7000
        });
    };
    $scope.messageErrorNoName = function () {
        growl.error("Oops, you forgot to name your note.");
    };

    $scope.addSpecialWarnMessage2 = function () {
        
        /*
        //growl.warning("This adds a warn message", {title: 'Warning!'});
        //growl.info("This adds a info message", {title: 'Random Information'});
        //growl.success("This adds a success message"); //no title here
        //growl.error("This adds a error message", {title: 'ALERT WE GOT ERROR'});
        */
    };

    $scope.getAll = function () {

        if ($scope.client === null) {

            return;

        } else {
            $http.post("/note", $scope.client).success(function (response) {
                //$scope.renderClients(response);

                if (response) {
                    $scope.client = response;

                    if (typeof (response.gotpass) !== 'undefined') {
                        if (response.gotpass === 'yes') {
                            //have pass
                            $scope.messageGotHasKey();
                        } else {
                            //no pass
                            $scope.messageGotNoKey();
                        }
                    }
                } else {
                    $scope.messageNewNote();
                }
            });
        }
    };




    $scope.save = function () {

        if ($scope.client === null || $scope.client.name === "") {
            $scope.status = "no name, pls add name";
            return;
        } else {

            $http.put("/note", $scope.client).success(function (response) {
                console.log(response);
                if (response === "invalid") {
                    $scope.messageSaveWrongKey();
                } else {
                    $scope.client = response;
                    $scope.messageSaveSuccess();
                    if (typeof (response.gotpass) !== 'undefined') {
                        if (response.gotpass === 'yes') {
                            //have pass
                            $scope.messageGotHasKey();
                        } else if (response.gotpass === 'nooriginal') {
                            $scope.messageNoOriginalKey();
                        } else {
                            //no pass
                            $scope.messageGotNoKey();
                        }
                    }
                }
            });
        }

    };

    $scope.insert = function () {

    }




});