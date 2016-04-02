(function(){

    angular
        .module('app')
        .factory('contentService', contentService);

    function contentService($http){

        var getContents = function(){
            return $http.get("/api/users")
                .then(function(response){
                    return response.data;
                })
        };

        var getContent = function(contentid){
            return $http.get("/api/users/" + contentid)
                .then(function(response){
                    return response.data;
                })
        };

        var createContent = function(content){
            console.log(user);
            return $http.post("/api/users", content)
                .then(function(response){
                    return response.data;
                })
        };

        var deleteContent = function(contentid){
            return $http.delete("/api/users/" + contentid)
                .then(function(response){
                    return response.data;
                })
        };

        var updateContent = function(content){
            return $http.put("/api/users/" + user._id, {username: user.username, password: user.password})
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

