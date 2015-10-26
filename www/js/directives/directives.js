angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
	navigator.geolocation.getCurrentPosition(success, error);
        function success(pos){
                var mapOptions = {
                        zoom: 16,
                        center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                };
        	var map = new google.maps.Map($element[0], mapOptions);
                new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                });


        	$scope.onCreate({map: map});
	}
	function error(er){	
		console.log(er);
	}
        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});

