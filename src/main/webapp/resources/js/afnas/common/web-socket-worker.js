'use strict';
importScripts("/resources/js/lib/stomp/stomp.min.js");

/**
 * Websocket API ReadyState
 * @type {string}
 * Value	State	Description
 *	0		UNSENT	Client has been created. open() not called yet.
 *	1		OPENED	open() has been called.
 *	2		HEADERS_RECEIVED	send() has been called, and headers and status are available.
 *	3		LOADING	Downloading; responseText holds partial data.
 *	4		DONE	The operation is complete.
 */

var Socket = (function (url, destination) {
	// property
	var _client = null;
	var _receiveData = [];
	var _sendData = [];
	var _sTimer = null;
	var _url = url;
	var _destination = destination;

	// method
	function connect() {
		close();
		try {
			_client = Stomp.client(_url);
		} catch (e) {
			console.error(e);
		}

		_client.connect("", "",
			function (frame) {
				console.info("WEBSOCKET - connect: ", frame);

				_client.subscribe(destination, function (message) {
					if (!message) {
						return;
					}
					self.postMessage(parser(message));
				});
			}, function (error) {
				console.info("WEBSOCKET - error: ", error);
				setTimeout(connect, 5000);
			});
	}

	function close() {
		if (_client == null)
			return;

		if(_client.connected != false) {
			_client.unsubscribe();
			_client.disconnect();
		}
		_client = null;
	}

	function send(data) {

	}

	// function
	function parser(data) {
		var p = data;
		return JSON.parse(p.body);
	}

	return {
		connect: connect,
		send: send,
		close: close
	}
});

// Web-Worker 용 Interface
var _socket = null;
self.addEventListener("message", function (e) {
	var d = e.data;
	switch (d.operation) {
		case "connect":
			_socket = new Socket(d.url, d.destination);
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