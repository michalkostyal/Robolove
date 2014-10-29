angular.module('robot').controller('robotCtrl', function($scope){
	$scope.wrongCommand = false;
	$scope.updated = {};
	$scope.edgeValues = [];

	$scope.resetForm = function(){
		$scope.saveInit = !$scope.saveInit;
		instructions.reset();
		$scope.init = {};
		$scope.updated = {};
		$scope.robotLost = false;
	};
	$scope.saveInitial = function(){
		if ( ($scope.init.x <= $scope.up.x) && ($scope.init.x <= $scope.up.x) ){
			$scope.saveInit = !$scope.saveInit;
			$scope.showInitNotice = false;
		} else { 
			$scope.showInitNotice = true;
		}
	};
});