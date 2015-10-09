angular.module('starter.controllers', [])

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, Camera, $location, Parse) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

	$scope.lists = [
		{ title: "teste", id: 1},
		{ title: "Gabriel", id:2}
	];

	$scope.getPhoto = function() {
    		Camera.getPicture().then(function(imageURI) {
				Parse.postPicture({url:imageURI});
      			$scope.imgUrl = imageURI;
    		}, function(err) {
      			console.err(err);
    		});
  	};

	function success(pos){
		$scope.longi = pos.coords.longitude;
		$scope.lat   = pos.coords.latitude;
	}
	$scope.localization = function(){
	
		var data = navigator.geolocation.getCurrentPosition(success);
	}
	

  $scope.isAutenticate = false;
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $http({
        method:'post', 
        url:'http://phpextreme.com.br/site/api/auth/', 
        //url:'http://localhost:8000/user',
        data: $.param($scope.loginData),
        headers: { 
			'Content-Type': 'application/x-www-form-urlencoded',
		 }
    }).then(function(resp) {
				$scope.loginData.token = resp.data.token;
				console.log($scope.loginData);
				Parse.postParse($scope.loginData);
                $scope.text = 'Token = ' + resp.data.token;
				$scope.isAutenticate = true;
				$location.path('/register');
                // For JSON responses, resp.data contains the result
            }, function(error) {
				$scope.text = error.status + ' - ' + error.statusText;
                // err.status will contain the status code
        });
    
    
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('ListCtrl', function($scope, $stateParams) {
	navigator.geolocation.getCurrentPosition(success, error);
        function success(pos){
                var mapOptions = {
                	zoom: 16,
                	center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                	mapTypeId: google.maps.MapTypeId.ROADMAP
        	};
        	$scope.map = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);
		new google.maps.Marker({
           		map: $scope.map,
            		position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            		title: "Aqui"
        	});


        }
		
		function error(err){
			console.log(err);
		}
})

.controller('SingupCtrl', function($scope, Parse){
	$scope.form = {activate: false};
	$scope.singUp = function(){
			var User = Parse.singUp();
			console.log($scope.form);
			User.save($scope.form, {
				success: function(User){
					console.log(User);
				},
				error: function(User, error) {
					console.log(error);
					console.log(User);
				}
			});
		}
});
