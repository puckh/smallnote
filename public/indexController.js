//Define an angular module for our app
var sampleApp = angular.module('sampleApp',  ['ngRoute', "ui.bootstrap"]);

//Define Routing for app
//Uri /AddNewOrder -> template AddOrder.html and Controller AddOrderController
//Uri /ShowOrders -> template ShowOrders.html and Controller AddOrderController
sampleApp.config(['$routeProvider',

  function($routeProvider) {
    $routeProvider
    .when('/Note', {
        templateUrl: 'note.html',
        controller: 'NoteController'
    })
    .otherwise({
		redirectTo: '/Note'
    });
}]);

sampleApp.service('sharedProperties', function() {
//    var username = 'null';
//    var objectValue = {
//        data: 'test object value2'
//    };
//    
//    return {
//        getUserName: function() {
//            return stringValue;
//        },
//        setUserName: function(value) {
//            stringValue = value;
//        },
//        getObject: function() {
//            return objectValue;
//        }
//    }
});

