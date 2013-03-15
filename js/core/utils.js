// Shallow clones all properties from source to destination
Object.extend = function( destination, source ) {
	for ( var property in source )
		destination[property] = source[property];
	return destination;
};

// Deep clones all properties from source to destination 
Object.deepExtend = function(destination, source) {
	for ( var property in source ) {
		
		if ( source[property] && 
			source[property].constructor &&
			source[property].constructor === Object ) {
			destination[property] = destination[property] || {};
			arguments.callee( destination[property], source[property] );
		} else {
			destination[property] = source[property];
		}
	}
	return destination;
};

// Document hidden
(function() {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);

    // IE 9 and lower:
    else if ('onfocusin' in document)
        document.onfocusin = document.onfocusout = onchange;

    // All others:
    else
        window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var body = document.body;
        evt = evt || window.event;

        if (evt.type == "focus" || evt.type == "focusin")
            body.className = "visible";
        else if (evt.type == "blur" || evt.type == "focusout")
            body.className = "hidden";
        else        
            body.className = this[hidden] ? "hidden" : "visible";
    }
})();
