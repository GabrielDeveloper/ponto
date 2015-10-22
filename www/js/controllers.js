angular.module('starter.controllers', [])

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
  /*function() {
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
  };*/
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

	$cordovaOauth.google("8XmUxPky5ryWxyX_IbXKk1sV",
		["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"])
		.then(function (result){
			console.log(result);
		}, function(error){
				console.log(error);
		});

	$cordovaOauth.dropbox("lcvhtbvooqgwzpt").then(function(result){
		console.log(result);
	}, function(error){
		console.log(error);
	});

})

.controller('SearchCtrl', function($scope){
	var service = {};
	service.access_token = false;
        service.redirect_url = '/#/home';
        service.client_id = '468709106249-tmhn3mk47077lkqd2jvvrf6pfa7fp3n1.apps.googleusercontent.com';
        service.secret = 'TEqj12t1B44Os7xuBuyXxtnv';
        service.scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me';

	var params = 'client_id=' + encodeURIComponent(service.client_id);
                params += '&redirect_uri=' + encodeURIComponent(service.redirect_url);
                params += '&response_type=code';
                params += '&scope=' + encodeURIComponent(service.scope);
                var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + params;
	

	
	$scope.googleUrl = function(){
			var win = window.open(authUrl, '_blank', 'location=no,toolbar=no,width=800, height=800');
			 var context = this;
		if (ionic.Platform.isWebView()) {
                    console.log('using in app browser');
			win.addEventListener('loadstart', function (data) {
                        console.log('load start');
                        if (data.url.indexOf(context.redirect_url) === 0) {
                            	console.log('redirect url found ' + context.redirect_url);
                            	console.log('window url found ' + data.url);
                            	win.close();
                            	var url = data.url;
                            	var access_code = context.gulp(url, 'code');
                            	if (access_code) {
                                	context.validateToken(access_code, def);
                            	} else {
                                		def.reject({error: 'Access Code Not Found'});
                            		}
                        	}
			})
		} else {
                    console.log('InAppBrowser not found11');
			console.log("google window url " + win.document.URL);
			console.log(win.document.URL.indexOf(context.redirect_url));
		}
	}

		console.log(authUrl);


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
