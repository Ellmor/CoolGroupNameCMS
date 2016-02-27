(function () {
    angular.module('app')
        .controller('mvMainCtrl', mvMainCtrl);

    function mvMainCtrl ($scope) {
        $scope.myVar = "Hello Angular";
    }

})()