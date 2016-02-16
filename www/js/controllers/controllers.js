angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, Camera, $location, Parse, $ionicPopup, $cordovaSQLite) {

    if (window.cordova) {
      var db = $cordovaSQLite.openDB({ name: "testando" }); //device
    }else{
        var db = window.openDatabase("testando", '1', 'my', 1024 * 1024 * 100); // browser
        db.transaction(
            function(transaction) {
                transaction.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
            },
            function(error) {
                console.log(error);
            }
        );
    }

/*
        var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, ['test', 100]).then(function(res) {
            console.log("insertId: " + res.insertId);
        }, function (err) {
            console.error(err);
        });*/

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
                    destinationType: Camera.DestinationType.FILE_URI,
		    targetWidth: 320,
		    targetHeight: 320,
		    saveToPhotoAlbum: true,
		});
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


  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

    $scope.closeLogin = function(){
        $scope.modal.hide();
    };

  $scope.logout = function(){
	$scope.isAutenticate = false;
  };
  $scope.erroLogin = false;
  // Perform the login action when the user submits the login form
  $scope.doLogin = function(){
    var user = Parse.authUser($scope.loginData);
    user.find({
        success: function (res){
	    if(res.length > 0){
	        $scope.isAutenticate = true;
	        $scope.modal.hide();
	    } else {
		$scope.erroLogin = true;
            	$scope.error = "Username or password not exist";
                $scope.$apply();
	    }
        },
	error: function(err){
	    console.log(err);
	}
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

.controller('SearchCtrl',  function($scope, Calendar){
    console.log(Calendar.json());
    $scope.json = Calendar.json();
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

})

.controller('RegisterCtrl', function ($scope, Parse){

})
