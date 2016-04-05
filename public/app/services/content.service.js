(function(){

    angular
        .module('app')
        .factory('contentService', contentService);

    function contentService($http){

        var getContents = function(){
            return $http.get("/api/content")
                .then(function(response){
                    return response.data;
                })
        };

        var getContent = function(contentid){
            return $http.get("/api/content/" + contentid)
                .then(function(response){
                    return response.data;
                })
        };

        var createContent = function(content){
            return $http.post("/api/content", content)
                .then(function(response){
                    return response.data;
                })
        };

        var deleteContent = function(contentid){
            return $http.delete("/api/content/" + contentid)
                .then(function(response){
                    return response.data;
                })
        };

        var updateContent = function(content){
            return $http.put("/api/content/" + content._id, {title: content.title, headline: content.headline, content: content.content})
                .then(function(response){
                    return response.data;
                })
        };
        return {
            getContents: getContents,
            getContent: getContent,
            createContent: createContent,
            updateContent: updateContent,
            deleteContent: deleteContent
        }

    }

}());

