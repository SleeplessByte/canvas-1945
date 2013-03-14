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