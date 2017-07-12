var _spinner = null;
var _spinnerTarget = null;
function makeSpin() {
    if (_spinner != null) return;

    var opts = {
        lines: 12, // The number of lines to draw
        length: 19, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        scale: 0.5
    };

    _spinner = new Spinner(opts).spin(_spinnerTarget);
}

var _indicatorCount = [];
var _indicatorTime = null;
var _blockUI = null;
function showIndicator(target) {
	if (_indicatorCount.length == 0) {
	    
	    if (!_blockUI) {
    	    _blockUI = $.blockUI({
    	        message: null,
    	        overlayCSS:  { 
    	            opacity: 0
    	        }   	   
    	    });
	    }
	    	    
	    _spinnerTarget = document.getElementById('indicator');
	    if (target) {
	    	_spinnerTarget = $(target);
	    	if (_spinnerTarget.length > 0) {
	    		_spinnerTarget = _spinnerTarget[0];
	    	}
	    }
	    
	    console.log("_spinnerTarget", _spinnerTarget );
	    
	    makeSpin();
	    _spinner.spin(_spinnerTarget);
	    
	    _indicatorTime = setInterval(function() {
	    	_indicatorCount = [];
	    	console.log("TIMEOUT INDICATOR",  _indicatorCount.length);
	        hideIndicator();
	    }, 90000);	    
	}
	
    _indicatorCount.push(new Date());
}

function hideAllIndicator() {
    _indicatorCount = [];
    hideIndicator();
}

function hideIndicator() {	
	if (_indicatorCount.length == 0) {
		return;
	}
	
	clearInterval(_indicatorTime);
	
	_indicatorCount.pop();
	
	if (_indicatorCount.length != 0) {
		return;
	}
	
    $.unblockUI();
    _blockUI = null;
    _spinner.stop(_spinnerTarget);
}

function lazyHideIndicator() {
    setTimeout(function() {
        hideIndicator();
    }, 300);
}

function sel(parentID, childID) {
    var id = "#" + parentID;
    if (childID != undefined && childID != "")
    id += " #" + childID;

    return $(id);
}

function __ap($scope) {
    try {
        $scope.$digest();
    } catch(e) {}
}

function ap($scope) {
    __ap($scope);
}

function camelCase( s ) {
	  return s.replace(/\-(\w)/g, function(i, m) {
		return m.toUpperCase();
	});
}

function camelToUnderscore(s) {
	return s.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
}

function objectJoin(obj, sep) {
    var arr = [], p, i = 0;
    for (p in obj)
        arr[i++] = obj[p];
    return arr.join(sep);
}

function getStyleSheetPropertyValue(selectorText, propertyName) {
    for (var s= document.styleSheets.length - 1; s >= 0; s--) {
        var cssRules = document.styleSheets[s].cssRules ||
                document.styleSheets[s].rules || [];
        for (var c=0; c < cssRules.length; c++) {
            if (cssRules[c].selectorText === selectorText) 
                return cssRules[c].style[propertyName];
        }
    }
    return null;
}

function changeObjectValue(source, target) {
	if (!source || !target) {
		return source;
	}
	
	for (var key in source) {
		if (!target.hasOwnProperty(key)) {
			continue;
		}
		
		source[key] = target[key];
	}
	
	return source;
}

function lowerCaseToUpperCase(list, field) {
	if (!list || list.lenght ==0) {
		return list;
	}
	
	for (var i=0, l=list.length; i < l; i++) {
		var v = list[i][field];
		if (!v || v == "") {
			continue;
		}
		
		list[i][field] = v.toUpperCase();
	}
	
	return list;
}

function isParent(parentID, child) {
    var p = child.parentNode
    if (!p || p.tagName == "BODY") {
        return false;
    }

    var ret = false;
    if (p.id == parentID) {
        ret =  true;
    } else {
        ret = isParent(parentID, p);
    }
    
    return ret
}

function fastParseNumber(value) {
	return +value;
}

function abbreviateNum(number, decPlaces) {
   if (isNaN(number)) {
       return 0;
   }
    
	decPlaces = Math.pow(10,decPlaces);
    var abbrev = [ "k", "m", "b", "t", "K", "M", "B", "T"];

    for (var i=abbrev.length-1; i>=0; i--) {
        var size = Math.pow(10,(i+1)*3);
        if(size <= number) {
             number = Math.round(number*decPlaces/size)/decPlaces;
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }
             number += abbrev[i];
             break;
        }
    }
    return number;
}

function releaseNum(abbrNum) {
	if(abbrNum == null || abbrNum == "")
		return 0;
	
	abbrNum = abbrNum.toString();

    var abbrev = {
    	'k': '000',
    	'm': '000000',
    	'b': '000000000',
    	't': '000000000000',
        'K': '000',
        'M': '000000',
        'B': '000000000',
        'T': '000000000000'    	
    };
    
    var s = abbrNum.match(/[A-Za-z]/);
    if(abbrev.hasOwnProperty(s)) {
        abbrNum = abbrNum.replace(s, abbrev[s]);
    }
    return parseFloat(abbrNum);
}

function serializeData(data) {
    if (!angular.isObject(data)) { return ((data == null) ? "" : data.toString()); }

	var buffer = [];
	for ( var name in data) {
		if (!data.hasOwnProperty(name)) {
			continue;
		}
		
		var value = data[name];
		buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value));
	}
	
	var source = buffer.join("&").replace(/%20/g, "+");
    return (source);
}

function getPosition(el, offsetParent) {
    var xPos = 0;
    var yPos = 0;

    while (el != offsetParent && el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}