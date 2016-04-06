(function () {
    angular
        .module('app')
        .factory('mvUser', mvUser);

    function mvUser($resource) {
        var UserResource = $resource('/api/users/:id', {id: "@id"});

        UserResource.prototype.isAdmin = function () {
            return this.roles && this.roles.indexOf('admin') > -1;
        };

        UserResource.prototype.isAuthor = function () {
            return this.roles && this.roles.indexOf('author') > -1;
        };

        UserResource.prototype.isCommentator = function () {
            return this.roles && this.roles.indexOf('commentator') > -1;
        };

        return UserResource;
    }

})()