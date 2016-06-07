(function(){

    angular
        .module('app')
        .factory('ioService', ioService);

    ioService.$inject = ['$timeout'];

    function ioService($timeout) {

        //connecting to server
        var socket = io.connect('http://localhost:3030');

        //initial handshake
        socket.on('connect', function () {
            console.log('SOCKET CONNECTED');
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
            console.log('io.service name: ' + eventName);
            console.log('io.service data: ' + data);
            socket.emit(eventName, data);
        };

        return {
            on: on,
            emit: emit
        }
    }

}());
