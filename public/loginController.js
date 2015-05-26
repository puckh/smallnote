sampleApp.controller("LoginController", function($scope, $http, $timeout, sharedProperties) {
	


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
		
		var checkObj = $scope.check;
		$http.post("/login", $scope.check).success(function(response) {
			if (response !== null ) {
				if (response === "pass") {
					sharedProperties.setUserName($scope.check.name);
					$scope.loginStatus = "You are logged in as "+ sharedProperties.getUserName() + ".";
				} else if (response === "fail"){
					sharedProperties.setUserName("null");
					$scope.loginStatus = "Incorrect username/password.";
				}
			}
		});


	}



});