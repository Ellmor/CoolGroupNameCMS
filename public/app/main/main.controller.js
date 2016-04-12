(function () {
    angular.module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['helperService', 'contentService'];

    function MainCtrl (helperService, contentService) {
        var vm = this;

        vm.isActive = helperService.isActive;

        vm.title = "welcome";
        vm.Content = {};

        var modelContent5newest = function (data) {
            console.log(data);
            vm.Content = data.slice(0,3);
        }

        vm.getContent = function () {
            contentService.getContent_Published()
                .then(modelContent5newest);
        }
    }

})()