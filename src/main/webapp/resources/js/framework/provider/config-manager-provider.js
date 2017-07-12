define([], function() {
	return function() {
		"use strict";

		// property
		var constants = {};
		var events = {};

		// method		
		this.initialize = function(c, e) {
			constants = c;
			events = e;
		}

		this.$get = function() {
			return {
				getConst : function(key) {
					return constants[key];
				},
				getEvent : function(key) {
					return events[key];
				}
			}
		}
	}
});