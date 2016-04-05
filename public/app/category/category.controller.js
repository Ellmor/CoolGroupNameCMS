/**
 * Created by D'oh on 3/31/16.
 */
(function(){
    "use strict";

    angular
        .module('app')
        .controller('categoryController', categoryController);
    function categoryController($scope, categoryService, mvNotifier, $routeParams) {
        var vm = this;

        if ($routeParams.categoryId) {
            vm.categoryId = $routeParams.categoryId;
        }

        var modelCategories = function (data) {
            console.log(data);
            $scope.Categories = data;
        }

        var modelCategory = function (data) {
            $scope.Category = data;
        }


        $scope.getCategories = function () {
            categoryService.getCategories()
                .then(modelCategories);
        }
        $scope.getCategory = function (categoryid) {
            categoryService.getCategory(categoryid)
                .then(modelCategory);
        }
        $scope.createCategory = function (category) {
            categoryService.createCategory(category);
            categoryService.getCategories()
                .then(modelCategories);
        }
        $scope.updateCategory = function (category) {
            categoryService.updateCategory(category);
            categoryService.getCategory(category.categoryid)
                .then(modelCategory);
        }

        $scope.deleteCategory(categoryid)
        {
            categoryService.deleteCategory(categoryid)
                .then(
                    function (response) {
                        if (response.success) {
                            mvNotifier.notify(response.message);

                            categoryService.getCategories()
                                .then(modelCategories);
                        }
                        else {
                            mvNotifier.notify(response.message);
                        }
                    }
                );
        }
    }



})();
