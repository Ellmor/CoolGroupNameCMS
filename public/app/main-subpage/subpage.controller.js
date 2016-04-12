(function () {
    angular.module('app')
        .controller('SubpageController', SubpageController);

    SubpageController.$inject = ['helperService', 'contentService', '$routeParams', 'mvIdentity'];

    function SubpageController (helperService, contentService, $routeParams, mvIdentity) {
        var vm = this;

        vm.isActive = helperService.isActive;
        vm.identity = mvIdentity;
        vm.Article = {_id: $routeParams.id};

        var modelContent = function (data) {
            console.log(data);
            vm.Article = data;
        }

        vm.getContent = function (articleId) {
            contentService.getContent(articleId)
                .then(modelContent);
        }

        vm.addComment = function(comment){
            console.log(comment);
        }
    }

})()