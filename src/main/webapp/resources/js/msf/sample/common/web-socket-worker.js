

var Socket = (function(url) {
	'use strict';
	
    // constant
    var START_CHAR = "START";
    var END_CHAR = "END";

    // property
    var _socket = null;
    var _receiveData = [];
    var _sendData = [];
    var _sTimer = null;
    var _url = url;

    // method
    function connect() {
        close();
        try {
            _socket = new WebSocket(_url);
        } catch (e) {
            console.error(e);
        }

        _socket.onopen = function() {
            console.debug("WebSocket: Open");

            if (_sTimer === null && _sendData && _sendData.length > 0) {
                _sTimer = setInterval(function() {
                    if (socket.readyState == 1) {
                        clearInterval(_sTimer);
                        _sTimer = null;
                        send();
                    }
                }, 200);
            }
        };

        _socket.onerror = function() {
            console.debug("WebSocket: Failed to connection");
            close();
            setTimeout(connect, 5000);
        };

        _socket.onclose = function() {
            console.debug("WebSocket: Closed to connection", url);
            close();
            setTimeout(connect, 5000);
        };

        _socket.onmessage = function(message) {
            var r = message.data;
            if (r != START_CHAR && r != END_CHAR) {
                _receiveData.push(r);
                return;
            }

            if (r == END_CHAR) {
                var d = parser(_receiveData.join(""));
                _receiveData = [];
                self.postMessage(d);
            }
        };
    }

    function close() {
        if (!_socket) {
            return;
        }
        
        _socket.onopen = null;
        _socket.onerror = null;
        _socket.onclose = null;
        _socket.onmessage = null;
        _socket.close();
        _socket = null;
    }

    function send(data) {
        _sendData = data;
        if (_socket === null && _socket.readyState > 1) {
            connect();
        } 
        else if (_socket.readyState === 0) {
            // The connection is not yet open. 39line 참조
        } else {
            while (_sendData.length !== 0) {
                _socket.send(_sendData.shift());
            }
        }
    }

    // function
    function parser(data) {
        var p = JSON.parse(data);
        return p;
    }
	
	this.$get = function() {
		return {
			addOperation: addOperation
		};
	};
	
    return {
        connect: connect,
        send: send,
        close: close
    };
});

// Web-Worker 용 Interface
var _socket = null;
self.addEventListener("message", function(e) {
    var d = e.data;
    switch (d.operation) {
        case "connect":
            _socket = new Socket(d.url);
            _socket.connect();
            break;
        case "send":
            _socket.send(d.data);
            break;
        case "close":
            _socket.close();
            break;
    }
}); 