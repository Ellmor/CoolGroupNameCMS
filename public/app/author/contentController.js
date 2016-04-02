(function () {
    "use strict";

    angular
        .module('app')
        .controller('contentController', contentController);

    function contentController($scope, contentService, mvNotifier, helperService, $routeParams) {
        var vm = this;

        if ($routeParams.contentId) {
            vm.contentId = $routeParams.contentId;
        }

        var modelContents = function (data) {
            console.log(data);
            $scope.Contents = data;
        }

        var modelContent = function (data) {
            $scope.Content = data;
        }

        $scope.getContents = function () {
            contentService.getContents()
                .then(modelContents);
        }

        $scope.getContent = function (contentid) {
            contentService.getContent(contentid)
                .then(modelContent);
        }

        $scope.createContent = function (content) {
            contentService.createContent(content);
            contentService.getContent()
                .then(modelContent);
        }

        $scope.updateContent = function (content) {
            console.log(content);
            contentService.updateContent(content);
            contentService.getContent(content.contentid)
                .then(modelContent);
        }

        $scope.deleteContent = function (contentid) {
            contentService.deleteContent(contentid).then(
                function(responce){
                    //if the content was deleted
                    if(responce.success){
                        //notify that the content was deleted
                        mvNotifier.notify(responce.message);
                        //get the new list of users and add it to the scope.
                        contentService.getContent()
                            .then(modelContent);
                        //otherwise show error message and do nothing.
                    } else {
                        mvNotifier.notify(responce.message);
                    }
                }
            );

        }

    }

})();
