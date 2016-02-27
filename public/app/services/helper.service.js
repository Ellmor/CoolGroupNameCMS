/**
 * Created by Liga on 27-02-2016.
 */

(function(){

    angular
        .module('app')
        .factory('helperService', helperService);

    function helperService($location){

        var isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };

        return {
            isActive: isActive
        }

    }

}());

