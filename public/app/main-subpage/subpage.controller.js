(function () {
    angular.module('app')
        .controller('SubpageController', SubpageController);

    SubpageController.$inject = ['helperService', 'contentService', '$routeParams'];

    function SubpageController (helperService, contentService, $routeParams) {
        var vm = this;

        vm.isActive = helperService.isActive;
        vm.Article = {_id: $routeParams.id};

        var modelContent = function (data) {
            console.log(data);
            vm.Article = data;
        }

        vm.getContent = function (articleId) {
            contentService.getContent(articleId)
                .then(modelContent);
        }

    }

})()