angular.module('starter.factory', [])

.factory('Calendar', function(){
        return {
            teste: function(){
                return "Teste";
            },
            json: function(){
                var cal = new Calendar();
                cal.generateJSON();
                return cal.getJSON();
            }
        };
});
