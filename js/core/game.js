var Game = new function() {
	var objects = {};
	var marked_for_removal = [];
	var layers = {};
	var speed = 80;
	
	this.width = 640;
	this.height = 480;
	
	var game = this;

	var stage = new Kinetic.Stage({
		container: 'container',
		width: game.width,
		height: game.height
	});
	
	var loop = new Kinetic.Animation( function( frame ) { 
		for ( var object in objects ) {
			if ( objects[ object ].update !== undefined )
				objects[ object ].update( frame );
		}
		GameCollisions.step();
	}, stage );
	
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
	
	this.getSpeed = function() {
		return speed;
	}
	
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