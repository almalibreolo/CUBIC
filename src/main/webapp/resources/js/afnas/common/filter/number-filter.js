define(['app'], function(app) {
	'use strict';

	app.filter("numFormat", function () {
		return function (value) {
			var num = 0;
			if(angular.isNumber(value))
				num = value;
			else if(angular.isString(value))
				num = (parseInt(value))? parseInt(value): 0;

			var FORMAT = ['', 'K', 'M', 'G', 'T', 'P'];
			var fraction = 0;
			var e = Math.floor(Math.log(num)/Math.log(1000));

			if(e == "-Infinity") return num+FORMAT[0];
			else if(e < 0) return (num/Math.pow(1000, Math.floor(0))).toFixed(fraction)+FORMAT[0];
			else return (num/Math.pow(1000, Math.floor(e))).toFixed(fraction)+FORMAT[e];
		};
	});

	app.filter("floatFormat", function () {
		return function (value, fraction) {
			var num = 0;
			if(angular.isNumber(value))
				num = value;
			else if(angular.isString(value))
				num = (parseInt(value))? parseInt(value): 0;

			var FORMAT = ['', 'K', 'M', 'G', 'T', 'P'];
			// var fraction = 1;
			var e = Math.floor(Math.log(num)/Math.log(1000));

			if(e == "-Infinity") return num+FORMAT[0];
			else if(e < 0) return (num/Math.pow(1000, Math.floor(0))).toFixed(fraction)+FORMAT[0];
			else return (num/Math.pow(1000, Math.floor(e))).toFixed(fraction)+FORMAT[e];
		};
	});

	app.filter("byteFormat", function () {
		return function (value, fraction) {
			var num = 0;
			if(angular.isNumber(value))
				num = value;
			else if(angular.isString(value))
				num = (parseInt(value))? parseInt(value): 0;

			var FORMAT = ['B', 'Kb', 'MB', 'GB', 'TB', 'PB'];
			fraction = fraction ? fraction : 0;
			var e = Math.floor(Math.log(num)/Math.log(1024));

			if(e == "-Infinity") return num+FORMAT[0];
			else if (e < 0) return (num/Math.pow(1024, Math.floor(0))).toFixed(fraction)+FORMAT[0];
			else return (num/Math.pow(1024, Math.floor(e))).toFixed(fraction)+FORMAT[e];
		};
	});
});