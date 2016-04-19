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

        var getUsers = function(limit, fields) {
            var param = '';

            if(limit || fields){
                param += '?';
                if(limit && fields){
                    param += "limit=" + limit + "&fields=" + fields;
                } else if (limit){
                    param += "limit=" + limit;
                } else if (fields){
                    param += "fields=" + fields;
                }
            }
            console.log(param);
            return $http.get("/api/users" + param)
                .then(function(response){
                    return response.data;
                });
        };

        return {
            getLogs: getLogs,
            getUsers: getUsers
        }

    }

}());

