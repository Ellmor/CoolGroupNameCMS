/**
 * Created by D'oh on 4/12/16.
 */
(function () {
    angular.module('app')
        .factory('tagService', tagService);

    function tagService($http){

        var getTags = function(){
            return $http.get('/api/tags/')
                .then(function(response){

                    return response.data;
                })
        };

        var getTag = function(tagid){
            return $http.get('/api/tags/' + tagid)
                .then(function (response){
                return response.data;
            })
        };

        var createTag = function(tag){
            return $http.post('/api/tags/', tag)
                .then(function(response){
                    return response.data;
                })
        };

        var deleteTag = function(tagid){
            return $http.delete('/api/tags/'+ tagid)
                .then(function(response){
                    return response.data;
                })
        };

        var updateTag = function (tag) {
            return $http.put('/api/tags/' + tag._id,{name: tag.name})
                .then(function(response){
                    return reponse.data;
                })
        };

        return{
            getTags: getTags,
            getTag: getTag,
            createTag: createTag,
            deleteTag: deleteTag,
            updateTag: updateTag
        }

    }
}());