define([], function() {
    'use strict';

    var model = (function() {
    	// property
    	var width= 400;
    	var height = 200;
    	var title = "기본 제목";
    	var html = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/Se8bbsUFjC8" frameborder="0" allowfullscreen></iframe>';
    	
    	// method
        return {
        	width:width,
        	height:height,
        	title:title,
        	html:html,
            set: function(data) {
                for ( var key in data) {
                    if (this.hasOwnProperty(key))
                        this[key] = data[key];
                }
            }
        };
    });

    return model;
});