(function () {

    angular
        .module('app')
        .factory('contentService', contentService);

    function contentService($http) {

        var tagsSelected = [];

        var findContentInArray = function(data,id){
            return data.filter(function(element){
                if(element.id === id){
                    return element
                }
            });
        }
        var getContents = function () {
            return $http.get("/api/content")
                .then(function (response) {
                    return response.data;
                })
        };

        var getContent = function (contentid) {
            return $http.get("/api/content/" + contentid)
                .then(function (response) {
                    return findContentInArray(response.data, id);
                })
        };

        var getTags = function () {
            return $http.get('/api/categories/')
                .then(function(response){
                    return response.data;
                })
            
        }
        
        var getTagsSelected = function () {
            return tagsSelected;
        }

        var tagChange = function (tag) {
            var i = tagsSelected.indexOf(tag);

            if(i > -1){
                tagsSelected.splice(i, 1);
            }else{
                tagsSelected.push(tag);
            }
        }
        var contentFilter = function(content){
            if(tagsSelected.length > 0){
                if(tagsSelected.indexOf(content.Tag) < 0){
                    return;
                }
            }
            return content;
        }



        var getContent_Published = function () {
            console.log('getNewestContent');
            return $http.get("/api/content/published")
                .then(function (response) {
                    console.log('getNewestContent return');
                    console.log(response);
                    return response.data;
                })
        };

        var createContent = function (content) {
            return $http.post("/api/content", content)
                .then(function (response) {
                    return response.data;
                })
        };

        var deleteContent = function (contentid) {
            return $http.delete("/api/content/" + contentid)
                .then(function (response) {
                    return response.data;
                })
        };

        var updateContent = function (content) {
            return $http.put("/api/content/" + content._id, {
                    title: content.title,
                    headline: content.headline,
                    content: content.content
                })
                .then(function (response) {
                    return response.data;
                })
        };

        return {
            getContents: getContents,
            getContent: getContent,
            createContent: createContent,
            updateContent: updateContent,
            deleteContent: deleteContent,
            getContent_Published: getContent_Published,
            getTags: getTags,
            contentFilter: contentFilter,
            tagChange: tagChange,
            getTagsSelected: getTagsSelected
        }

    }

}());

