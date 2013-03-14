var Game = new function() {
	var objects = {};
	var layers = {};

	var stage = new Kinetic.Stage({
		container: 'container',
		width: 640,
		height: 480
	});
	
	// Adds an object
	this.add = function( key, object ) {
		if ( this.get( key ) !== undefined )
			throw new Error;
			
		objects[ key ] = object;
	};
	
	// Removes an object
	this.remove = function( key ) {
		delete objects[ key ];
	};
	
	// Adds a layer
	this.addLayer = function( key, layer ) {
		layers[ key ] = layer;
		this.getStage().add( layer );
	};
	
	// Gets an object
	this.get = function( key ) {
		return objects[ key ];
	};
	
	this.getStage = function() {
		return stage;
	};
	
	this.getLayer = function( layer ) {
		return layers[ layer ];
	};
	
	this.getCenterStage = function() {
		return { 
			x: this.getStage().getWidth() / 2, 
			y: this.getStage().getHeight() / 2,
		};
	};
	
	this.start = function() {
		Input.start();
	};
	
	this.stop = function() {
		Input.stop();
	};
	
	
};