app.controller('mainController', function($scope, $rootScope, $location){
	$scope.message = 'This is a homepage message';
	this.booger = function(){
		alert('Uses the "this"');
	};
	$scope.booger = function(){
		alert('Uses the "$scope"');
		$('.boogerTitle').html('Changed by Jquery');
	};

});