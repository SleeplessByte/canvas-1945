var GamePlayer = new function() {

	var name = null;
	var plane = null; 
	var points = 0;
	var lives = 0;
	var level = 0;
	var loop = null;
	
	// Gets the players plane
	this.getPlane = function() {
		return plane;
	};
	
	// Gets the players lives
	this.getLives = function() {
		return lives;
	};	
	
	// Gets the current number of points
	this.getPoints = function() {
		return points;
	};
	
	// Gets the current level
	this.getLevel = function() {
		return level;
	};
	
	// Gets the player name
	this.getName = function() {
		return name;
	};
	
	// Spawns the player
	this.spawn = function( newname, sourceImage ) {
	
		name = newname;
		plane = new PlayerPlane( sourceImage );
		plane.attach( Game.getLayer( 'level' ) );
				
		// Updates the position to the initial placement
		plane.setPosition( 
			Game.getCenterStage().x - plane.getWidth() / 2,
			400
		);
		
		// Player animation loop
		var context = plane.update;
		plane.update = function( frame ) { 
			this.updatePosition();
			
			var delta = plane.getSpeed() * frame.timeDiff / 1000;
			
			if ( Input.IsKeyDown( 38 ) ) // up
				plane.deltaPosition( 0, -delta );
			if ( Input.IsKeyDown( 40 ) ) // down
				plane.deltaPosition( 0, delta );
			if ( Input.IsKeyDown( 37 ) ) // left
				plane.deltaPosition( -delta, 0 );
			if ( Input.IsKeyDown( 39 ) ) // right
				plane.deltaPosition( delta, 0 );
		};
	};	
	
	// Despawns the player
	this.despawn = function() {
		loop.stop();
		//plane.getSprite().hide();
	}
};