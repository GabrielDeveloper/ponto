angular.module('starter').factory('Parse', function(){
	return	{
		postParse : function(data){
			Parse.initialize('Q0rLQosAthm2gLN9uaxR7lphfEKPJsMsoXZQVtQd', '6TPBqimxJkdni4Srnlrko9debCtqlM2f2ZKq8tEz');
			var Teste = Parse.Object.extend("TestandoApp");
			var ObjTeste = new Teste();
			ObjTeste.save(data).then(function(){
				return Parse;
			})
		}
	};
});
