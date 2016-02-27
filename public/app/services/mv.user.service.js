(function () {
    angular
        .module('app')
        .factory('mvUser', mvUser);

    function mvUser($resource) {
        var UserResource = $resource('/api/users/:id');

        UserResource.prototype.isAdmin = function () {
            return this.roles && this.roles.indexOf('admin') > -1;
        };

        return UserResource;
    }

})()