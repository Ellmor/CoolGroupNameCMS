(function(){

    angular
        .module('app')
        .factory('ioService', ioService);

    function ioService() {

        //connecting to server
        var socket = io.connect('http://localhost:3030');

        //initial handshake
        socket.on('connect', function () {
            socket.send('connect');
        });


        //template for listeners (receiving data)
        //the listeners can be defined for example in controllers
        var on = function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                callback(args[0]);
            });
        };

        //template for sending info to server (emitting messages)
        var emit = function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        };

        return {
            on: on,
            emit: emit
        }
    }

}());
