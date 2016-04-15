(function(){

    angular
        .module('app')
        .factory('logService', logService);

    logService.$inject = ['$http'];

    function logService($http){

        //number: identifies the number of posts to fetch
        //sort: defines the sort paramaters. Acceptabe: 'date-asc', 'date-desc'
        //
        var getLogs = function(number, sort) {
            var param = '';
            if(number || sort){
                param += '?';
                if(number && sort){
                    param += "number=" + number + "&sort=" + sort;
                } else if (number){
                    param += "number=" + number;
                } else if (sort){
                    param += "sort=" + sort;
                }
            }
            console.log(param);
            return $http.get("/api/log" + param)
                .then(function(response){
                    return response.data;
                })
        };

        return {
            getLogs: getLogs
        }

    }

}());

