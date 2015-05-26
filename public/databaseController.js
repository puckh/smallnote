sampleApp.controller("ServiceController", function($scope, $http, $timeout) {
	


        //test tree model 1
    $scope.roleList = [
        { "roleName" : "User", "roleId" : "role1", "children" : [
          { "roleName" : "subUser1", "roleId" : "role11", "children" : [] },
          { "roleName" : "subUser2", "roleId" : "role12", "children" : [
            { "roleName" : "subUser2-1", "roleId" : "role121", "children" : [
              { "roleName" : "subUser2-1-1", "roleId" : "role1211", "children" : [] },
              { "roleName" : "subUser2-1-2", "roleId" : "role1212", "children" : [] }
            ]}
          ]}
        ]},

        { "roleName" : "Admin", "roleId" : "role2", "children" : [] },

        { "roleName" : "Guest", "roleId" : "role3", "children" : [] }
      ];  


	$scope.renderClients= function(response) {
		$scope.clients = response;
	};

	$scope.getAll= function() {
		var id = 'xxx';
		$http.get("/manageClients/"+id).success(function(response) {
			$scope.renderClients(response);
		});	
	};
	$scope.getAll();


	// INSERT
	$scope.create = function() {	
		$http.post("/manageClients", $scope.client).success(function(response) {
			if (response) {


				if (response === "duplicate") {
					$scope.dbStatus = "Duplicate entry.";
					$timeout( clearDbStatus, 1500);
					
				} else {
					$scope.renderClients(response);
					$scope.client = "";
					$scope.dbStatus = "";
				}
			}
		});

		$scope.getAll();
	};

	function clearDbStatus() {
		$scope.dbStatus = "";
	};

	// DELETE
	$scope.remove = function(id) {
		$http.delete("/manageClients/"+id).success(function(res){
			$scope.getAll();
		});
	};


	// SELECT
	$scope.select = function(id) {
		
		$http.get("/manageClients/"+id).success(function(response) {
			$scope.client = response;
		});	

		console.log(this);
	};

	// UPDATE
	$scope.update = function(id) {
		console.log("in update");
		$http.put("/manageClients/"+$scope.client._id, $scope.client).success(function(response) {
			$scope.getAll();
			$scope.client = "";
		});
	};

	$scope.compare = function() {
		console.log("in the db controller");
		var checkObj = $scope.check;
		$http.post("/login", $scope.check).success(function(response) {
			if (response !== null ) {
				if (response === "pass") {
					console.log("logged in");
					$scope.loginStatus = "You are logged in as "+ $scope.check.name + ".";
				} else if (response === "fail"){
					console.log("logged out");
					$scope.loginStatus = "Incorrect username/password.";
				}
			}
		});


	}



});


