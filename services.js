angular.module('robot').service('Conversions', function(){
		var self = this;
		this.intoDegrees = function (d){
			switch (d) {
			    case 'E':
			        return 0;
			        break;
			    case 'W':
			        return 180;
			        break;
			    case 'S':
			        return 270;
			        break;
			    case 'N':
			        return 90;
			        break;
			    
			}
    };
    this.toRadians = function (angle) {
	   	var n = (angle % 360) * (Math.PI / 180);
	   	return n;
		};
		this.intoDirections = function (d){
			var hor = Math.cos( self.toRadians(d) );
			var ver = Math.sin( self.toRadians(d) );
			var res = 'no'; 
			switch (hor) {
			    case 1:
			        res = 'E';
			        break;
			    case -1:
			        res = 'W';
			        break;
			}
			switch (ver){        
			    case 1:
			        res = 'N';
			        break;
			    case -1:
			        res = 'S';
			        break;
			    
			}
			return res;
    };
});