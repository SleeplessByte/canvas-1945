var Input = new function() {
	
	// Event listeners
	var currentKeys = new Array();	
	var isFocussed = false;
	
	onKeyDown = function( event ) {
		currentKeys[ event.keyCode ] = true;
	};
	
	onKeyUp  = function( event ) {
		currentKeys[ event.keyCode ] = false;
	};
	
	onFocus = function( event ) {
		isFocussed = true;
	};
	
	onBlur = function( event ) {
		isFocussed = false;
	};
	 
	// Gets the activate-state of the window
	this.IsActive = function() {
		return isFocussed;
	};
	
	// Key is currently pressed
	this.IsKeyDown = function( key ) {
		return currentKeys[ key ] === true;
	};
	
	// Key is currently released
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
	
	// Starts listening for key input
	this.start = function() {
		window.addEventListener( 'keydown', onKeyDown, true );
		window.addEventListener( 'keyup', onKeyUp, true );
		window.addEventListener( 'blur', onBlur, true );
		window.addEventListener( 'focus', onFocus, true );
		
		isFocussed = document.hasFocus();
	};
	
	// Stops listening for key input
	this.stop = function() {
		window.removeEventListener( 'keydown', onKeyDown, true);
		window.removeEventListener( 'keyup', onKeyUp, true);
		window.removeEventListener( 'blur', onBlur, true );
		window.removeEventListener( 'focus', onFocus, true );
	};
};