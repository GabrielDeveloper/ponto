angular.module('starter').factory('Parse', function(){
	Parse.initialize('Q0rLQosAthm2gLN9uaxR7lphfEKPJsMsoXZQVtQd', '6TPBqimxJkdni4Srnlrko9debCtqlM2f2ZKq8tEz');
	return	{
		postParse : function(data){
			var Teste = Parse.Object.extend("TestandoApp");
			var ObjTeste = new Teste();
			ObjTeste.save(data).then(function(){
				return Parse;
			})
		},
		singUp	: function (data) {
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
		}
	};
});
