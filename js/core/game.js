var Game = new function() {
	var objects = {};
	var marked_for_removal = [];
	var layers = {};

	var stage = new Kinetic.Stage({
		container: 'container',
		width: 640,
		height: 480
	});
	
	var loop = new Kinetic.Animation( function( frame ) { 
		for ( var object in objects ) {
			if ( objects[ object ].update !== undefined )
				objects[ object ].update( frame );
		}
		for ( var object in marked_for_removal )
			delete objects[ object ];
		marked_for_removal = [];
	}, stage );
	
	// Adds an object
	this.add = function( key, object ) {
		if ( this.get( key ) !== undefined )
			throw new Error;
			
		objects[ key ] = object;
	};
	
	// Removes an object
	this.remove = function( key ) {
		marked_for_removal.push( key );
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
	
	// Gets the stage
	this.getStage = function() {
		return stage;
	};
	
	// Gets a layer
	this.getLayer = function( layer ) {
		return layers[ layer ];
	};
	
	// Gets the center of the stage
	this.getCenterStage = function() {
		return { 
			x: this.getStage().getWidth() / 2, 
			y: this.getStage().getHeight() / 2,
		};
	};
	
	// Starts the game
	this.start = function() {
		Input.start();
		loop.start();
	};
	
	// Stops the game
	this.stop = function() {
		Input.stop();
		loop.stop();
	};
	
	
};