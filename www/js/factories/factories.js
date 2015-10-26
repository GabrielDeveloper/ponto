angular.module('starter.factory', [])
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

.factory('Parse', function(){
        Parse.initialize('Q0rLQosAthm2gLN9uaxR7lphfEKPJsMsoXZQVtQd', '6TPBqimxJkdni4Srnlrko9debCtqlM2f2ZKq8tEz');
        return  {
                postParse : function(data){
                        var Teste = Parse.Object.extend("TestandoApp");
                        var ObjTeste = new Teste();
                        ObjTeste.save(data).then(function(){
                                return Parse;
                        })
                },
                singUp  : function (data) {
                        var objUser = Parse.Object.extend("Users");
                        var User = new objUser();
                        return User;
                },
                postPicture : function (data){
                        var objPicture = Parse.Object.extend("Picture");
                        var Picture = new objPicture();
                        Picture.save(data).then(function(){
                                return Picture;
                        });
                },
		authUser : function (data) {
			console.log(data);
			var User = Parse.Object.extend("Users");
			var query = new Parse.Query(User);

			query.equalTo('username',data.username);
			query.equalTo('password', data.password);
			query.equalTo('activate', true);
			return query;
			
			
		},
		getUsers : function(){
			var User  = Parse.Object.extend("Users");
			var query = new Parse.Query(User);
			return query;
		}
        };
});



