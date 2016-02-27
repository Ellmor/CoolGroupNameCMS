(function () {
    'use strict';
    angular.module('app')
        .factory('mvNotifier', mvNotifier);

    function mvNotifier(mvToastr) {
        return {
            notify: function (msg) {
                mvToastr.success(msg);
                console.log(msg);
            }
        }
    }

})()