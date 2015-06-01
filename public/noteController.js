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
        growl.info("A New Note!");
    };
    $scope.messageGotHasKey = function () {
        growl.info("You will need to enter the write key to modify this note.");
    };
    $scope.messageNoOriginalKey = function () {
        growl.info("You can only add a write key for a new note.", {
            title: 'This note can\'t have a write key...',
            ttl: 7000
        });
    };
    $scope.messageErrorNoName = function () {
        growl.error("Oops, you forgot to name your note.");
    };
    
    
    
    $scope.messageWelcome1 = function () {
        growl.success("Welcome to tinyText!", {
            ttl: 30000
        });
    };
    $scope.messageWelcome2 = function () {
        growl.info("Name your note, enter some text and save it. You can access this note from any browser.", {
            ttl: 30000
        });
    };
    $scope.messageWelcome3 = function () {
        growl.info("Anyone can read and modify your note, if they know its name.", {
            ttl: 30000
        });
    };
    $scope.messageWelcome4 = function () {
        growl.info("If you enter a \'write key\', before the first save, then only you will be able to modify it. It can still be read by anyone who knows the name.", {
            ttl: 30000
        });
    };
    
//
//    $scope.messageWelcome1 = function () {
//        growl.info("Name your note, enter some text and save it. \n \n Anyone can read and modify your note, if they know its name. \n \n If you enter a \'write key\', before the first save, then only you will be able to modify it. It can still be read by anyone who knows the name.", {
//            title: 'Welcome to tinyType.',
//            ttl: 30000
//        });
//    };
    
    $scope.addSpecialWarnMessage2 = function () {
        /*
        //growl.warning("This adds a warn message", {title: 'Warning!'});
        //growl.info("This adds a info message", {title: 'Random Information'});
        //growl.success("This adds a success message"); //no title here
        //growl.error("This adds a error message", {title: 'ALERT WE GOT ERROR'});
        */
    };

      $scope.messageWelcome1();
    $scope.messageWelcome2();
    $scope.messageWelcome3();
    $scope.messageWelcome4();
    
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
        console.log($scope.client);  
        if ($scope.client === null || $scope.client.name === "" || typeof ($scope.client.name) === 'undefined' || $scope.client === undefined) {
            $scope.messageErrorNoName();
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




});