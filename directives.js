angular.module('robot').directive('userCommand', ['Conversions', function(Conversions) {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
      function myInput(text) {
        var transInput = text.replace(/[^L,R,F]/g,'');
        if(transInput !== text) {
          ngModelCtrl.$setViewValue(transInput);
          ngModelCtrl.$render();  
          scope.wrongCommand = true;
        } else { 
          scope.wrongCommand = false;
          scope.updated.x = scope.init.x;
          scope.updated.y = scope.init.y;
          scope.updated.d = Conversions.intoDegrees(scope.init.o);
          for (i = 0; i < transInput.length; ++i) {
              var myHor = Math.cos( Conversions.toRadians(scope.updated.d) );
              var myHor = Math.round(myHor);
              var myVer = Math.sin( Conversions.toRadians(scope.updated.d) );
              var myVer = Math.round(myVer);
              switch (transInput[i]) {
                  case 'L':
                      scope.updated.d += 90;
                      break;
                  case 'R':
                      scope.updated.d -= 90;
                      break;
                  case 'F':
                        var myUpdated = updateValues(scope.updated.x, myHor, scope.updated.y, myVer);
                        scope.updated.x = myUpdated[0];
                        scope.updated.y = myUpdated[1];
                        scope.updated.m = myUpdated[2];
                        if(myUpdated[2] == 'Lost'){
                          i = transInput.length;
                        }
                      break;
              }
          }
          scope.updated.direction = Conversions.intoDirections(scope.updated.d);
        }
        return transInput;
      };
      function updateValues(valueX, addX, valueY, addY){
        var message = '';
        var additionX = valueX + addX;
        var additionY = valueY + addY;
        if ( (additionX == scope.edgeValues[0]) || (additionY == scope.edgeValues[1]) || (additionX == scope.edgeValues[2]) || (additionY == scope.edgeValues[3]) ){
          additionX = valueX;
          additionY = valueY;
        } else if (  ( additionX < 0) || (additionX > scope.up.x)  || (additionY < 0) || (additionY > scope.up.y)  ) {
          if (additionX > scope.up.x){
            scope.edgeValues[0] = additionX;
          } else if (additionY > scope.up.y){
            scope.edgeValues[1] = additionY;
          } else if (additionX == -1){
            scope.edgeValues[2] = -1;
          } else if (additionY == -1){
            scope.edgeValues[3] = -1;
          }
          message = "Lost";
          additionX = valueX;
          additionY = valueY;
          scope.robotLost = true;
          console.log(scope.edgeValues);
        }; 
        return [additionX,additionY, message];
      };
      ngModelCtrl.$parsers.push(myInput);
    }
  }; 
}]);
