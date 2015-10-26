angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, Camera, $location, Parse, $cordovaOauth) {

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
    		}, {
				quality: 75,
		      targetWidth: 320,
		      targetHeight: 320,
		      saveToPhotoAlbum: true
			});
  	};

	$scope.redirect = function(){
		$location.hash("/app/home");
	};

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

  $scope.logout = function(){
	$scope.isAutenticate = false;
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(){
	var teste = Parse.authUser($scope.loginData);
	teste.find({
		success: function (res){
			if(res.length > 0){
				$scope.closeLogin();
				$scope.isAutenticate = true;
			}
		},
		error : function(err){
			console.log(err);
		}
	});
  }

	$scope.googleUrl = function(){

                var appScope =  [
                                "https://www.googleapis.com/auth/urlshortener",
                                "https://www.googleapis.com/auth/userinfo.email"
                                ];

                $cordovaOauth.google("468709106249-tmhn3mk47077lkqd2jvvrf6pfa7fp3n1.apps.googleusercontent.com", appScope).then(function(result){
						$scope.isAutenticate = true;
                        }, function(error) {
                                console.log(error);
                        });
        }

        $scope.dropboxUrl = function() {

                $cordovaOauth.dropbox("lcvhtbvooqgwzpt").then(function(result){
                        console.log(result);
                }, function(error){
                        console.log(error);
                });

        }

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

.controller('ListCtrl', function($scope, $stateParams, $cordovaOauth) {


})

.controller('SearchCtrl', function($scope, $cordovaOauth){

	$scope.googleUrl = function(){

		var appScope =  [
				"https://www.googleapis.com/auth/urlshortener", 
				"https://www.googleapis.com/auth/userinfo.email"
				];

		$cordovaOauth.google("468709106249-tmhn3mk47077lkqd2jvvrf6pfa7fp3n1.apps.googleusercontent.com", appScope).then(function(result){
			console.log(result);
			}, function(error) {
            			console.log(error);
        		});
	}
	
	$scope.dropboxUrl = function() {

		$cordovaOauth.dropbox("lcvhtbvooqgwzpt").then(function(result){
                	console.log(result);
        	}, function(error){
                	console.log(error);
        	});

	}


})

.controller('SingupCtrl', function($scope, Parse, $location){
	$scope.form = {activate: false};
	$scope.singUp = function(){
		var User = Parse.singUp();
		console.log($scope.form);
		User.save($scope.form, {
		success: function(User){
			$location.path("/app/home");
			},
			error: function(User, error) {
				console.log(error);
				console.log(User);
			}
		});
	}
})
.controller('ListAdminCtrl', function($scope, Parse){
    $scope.items = [];
	Parse.getUsers().find({
		success : function(result){
			$scope.items.lenght = 0;
			angular.forEach(result, function(value, key){
				$scope.items.push({
						username: value.attributes.username, 
						email: value.attributes.email, 
						checked: value.attributes.activate});
			});

            $scope.$apply();
		}
	});
/*
$scope.items = [
    { id: 0 , text: "PHP", email: 'gabriel@outlook.com'},
    { id: 1 , text: "Angular", email: 'angular@gmail.com'},
    { id: 2 , text: "Ionic", email: 'ionic @hotmail.com'},
    { id: 3 , text: "Ruby", email: 'ruby@bol.com.br'},
    { id: 4 , text: "Node", email: 'node@yahoo.com'},
];

*/

});
