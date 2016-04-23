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
        var modelTags = function(data){
            $scope.Tags = data;
            console.log(data);
        }


        var updateTagsSelected = function(){
        $scope.tagsSelected = contentService.getTagsSelected();
        }

        $scope.contentFilter = function (content) {
            return contentService.contentFilter(content);
        }

        $scope.tagChange = function(tag){
            contentService.tagChange(tag);
            updateTagsSelected();
        }
        $scope.getContents = function () {
            contentService.getContents()
                .then(modelContents);
        }
        $scope.getTags = function(){
            contentService.getTags()
                .then(modelTags);

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
                function(response){
                    //if the content was deleted
                    if(response.success){
                        //notify that the content was deleted
                        mvNotifier.notify(response.message);
                        //get the new list of users and add it to the scope.
                        contentService.getContent()
                            .then(modelContent);
                        //otherwise show error message and do nothing.
                    } else {
                        mvNotifier.notify(response.message);
                    }
                }
            );

        }

        updateTagsSelected();

    }

})();
