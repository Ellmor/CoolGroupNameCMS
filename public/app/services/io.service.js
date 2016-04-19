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
            socket.on(eventName, function (data) {
                //var args = arguments;
                $timeout(function(){
                    callback(data);
                })

            });
        };

        //template for sending info to server (emitting messages)
        var emit = function (eventName, data) {
            socket.emit(eventName, data);
        };

        return {
            on: on,
            emit: emit
        }
    }

}());
