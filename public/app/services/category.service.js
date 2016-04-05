/**
 * Created by D'oh on 3/31/16.
 */
(function() {
    angular.module('app')
        .factory('categoryService', categoryService);

    function categoryService($http){

        var getCategories = function(){
            return $http.get("/api/categories/")
                .then(function(response){
                    return response.data;
                })
        };

        var  getCategory = function(categoryid){
            return $http.get("/api/categories/" + categoryid)
                .then(function (response) {
                    return response.data;

                })

        };

        var createCategory = function (category) {
            return $http.post("/api/categories", category)
                .then(function(response){
                    return response.data;
                })

        };

        var deleteCategory = function(categoryid) {
            return $http.delete("/api/categories/" + categoryid)
                .then(function (response) {
                    return response.data;
                })


        };

        var updateCategory  = function (category) {
            return $http.put("/api/categories/" + category._id,{name: category.name})
                .then(function (response) {
                    return response.data;
                })

        };
        return{
            getCategories: getCategories,
            getCategory:getCategory,
            createCategory:createCategory,
            updateCategory:updateCategory,
            deleteCategory:deleteCategory
        }

    }
}());