(function(){
    "use strict";

    angular
        .module('app')
        .controller('commentatorController', commentatorController);

    function commentatorController($scope){
        var vm = this;

        $scope.title = "Commentator Profile";


    }

})();