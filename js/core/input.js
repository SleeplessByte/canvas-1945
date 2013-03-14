var Input = new function() {
	
	// Event listeners
	var currentKeys = new Array();	
	
	onKeyDown = function( event ) {
		currentKeys[ event.keyCode ] = true;
	};
	
	onKeyUp  = function( event ) {
		currentKeys[ event.keyCode ] = false;
	};
	
	this.IsKeyDown = function( key ) {
		return currentKeys[ key ] === true;
	};
	
	this.IsKeyUp = function( key ) {
		return currentKeys[ key ] !== true;
	}
	
	this.IsKeyPressed = function( since, key ) {
		return since[ key ] !== true && this.IsKeyDown( key );
	}
	
	this.IsKeyReleased = function( since, key ) {
		return since[ key ] === true && this.IsKeyUp( key );
	}
	
	this.GetKeys = function() {
		return currentKeys;
	};
	
	this.start = function() {
		window.addEventListener( 'keydown', onKeyDown, true);
		window.addEventListener( 'keyup', onKeyUp, true);
	};
	
	this.stop = function() {
		window.removeEventListener( 'keydown', onKeyDown, true);
		window.removeEventListener( 'keyup', onKeyUp, true);
	};
};