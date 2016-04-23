/**
 * Created by D'oh on 4/12/16.
 */
(function(){
    "use strict";

    angular
        .module('app')
        .controller('tagController', tagController);

    function tagController($scope, tagService, mvNotifier, $routeParams){
        var vm = this;

        if ($routeParams.tagid){
            vm.tagId = $routeParams.tagid;
        }
        else{
            tagService.getTags()
                .then(function(data){
                    $scope.Tags = data;
                });
        }

        var modelTag = function(data){
            $scope.Tag = data;
        }
        var modelTags = function (data) {
            $scope.Tags = data;

        }
        $scope.getCategory = function(tagid){
            tagService.getCategory(tagid)
                .then(modelTag);
        }
        $scope.createTag = function(tag){
            tagService.createTag(tag);
            tagService.getTags()
                .then(modelTags);
        }
        $scope.updateTag = function(tag){
            tagService.updateTag(tag);
            tagService.getTag(tag.tagid)
                .then(modelTag);
        }

        $scope.deleteTag = function (tagid) {
            tagService.deleteTag(tagid)
                .then(function(response){
                    if(response.success){
                        mvNotifier.notify(response.message);

                        tagService.getTags()
                            .then(modelTags);
                    }
                    else{
                        mvNotifier.notify(response.message);
                    }
                });

        }

    }
    /*
    $scope.sortOptions = [{value:"tag.name", text: "Sort by name"},
        {value:"tag.createDate", text: "Sort by date"}];
    $scope.sortOrder = $scope.sortOptions[0].value;
    */


})();
