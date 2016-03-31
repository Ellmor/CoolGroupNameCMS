/**
 * Created by D'oh on 3/31/16.
 */
(function(){
    "use strict";

    angular
        .module('app')
        .controller('categoryController', categoryController);
    function categoryController($scope, categoryService, mvNotifier, $routeParams){
        var vm = this;

        if($routeParams.categoryId){
            vm.categoryId = $routeParams.categoryId;
        }
        //write the category controlle
    }

})();
