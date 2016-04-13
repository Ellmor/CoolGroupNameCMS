(function () {
    angular.module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['helperService', 'contentService'];

    function MainCtrl(helperService, contentService) {
        var vm = this;

        vm.isActive = helperService.isActive;

        var Content = {};
        vm.Content = {};
        vm.filters = {
            numberOfArticles: 3
        }

        var modelContent = function (data) {
            console.log(data);
            Content = data;
            vm.sliceContent(vm.filters.numberOfArticles);
        }

        vm.sliceContent = function (numberOfArticles) {
            vm.Content = Content.slice(0, numberOfArticles);
        }

        vm.getContent = function () {
            contentService.getContent_Published()
                .then(modelContent);
        }
    }

})()