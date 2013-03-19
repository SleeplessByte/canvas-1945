var GamePlayer = new function() {

	var name = null;
	var plane = null; 
	var points = 0;
	var lives = 0;
	var level = 0;
	var loop = null;
	var shotrate = 400;
	
	var bulletSource = null;
	
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
	
	// Gets the player health
	this.getHealth = function() {
		return this.getPlane().getHealth();
	};
	
	this.getShotRate = function() {
		return shotrate;
	};
	
	this.tryToFire = ( function() {
		var lastShot = 0;
		return function( frame ) {
			if ( frame.time - lastShot > this.getShotRate() ) {
				lastShot = frame.time;
				
				// TODO different shot functions
				var planepos = this.getPlane().getPosition();
				var settings = { 
					position : {  x : planepos.x, y: planepos.y }
				};
				settings.position.x += 32;
				
				var bullet = new PlayerBullet( bulletSource, 'ub', settings );
				bullet.attach( Game.getLayer( 'level' ) );
			};
		};
	})();
	
	// Spawns the player
	this.spawn = function( newname, sourceImage ) {
	
		// Hello player
		name = newname;
		bulletSource = sourceImage;
		
		plane = new PlayerPlane( sourceImage );
		plane.attach( Game.getLayer( 'level' ) );
				
		// Updates the position to the initial placement
		plane.setPosition( 
			Game.getCenterStage().x - plane.getWidth() / 2,
			400
		);
		
		var game_player = this;
	
		// Player animation loop
		plane.update = (function() {
		
			// Returns a clamped position
			var clampPosition = function( width, height, position ) {
				position.x = Math.min( 
					Math.max( position.x, 10 ), 
					Game.getStage().getWidth() - 10 - width 
				);
				position.y = Math.min(
					Math.max( position.y, 10 ),
					Game.getStage().getHeight() - 10 - height
				);
				return position;
			}
		
			var context = plane.update;
			return function( frame ) { 
				
				var delta = plane.getSpeed() * frame.timeDiff / 1000;
				
				// Movement by keys
				if ( Input.IsKeyDown( 38 ) ) // up
					plane.deltaPosition( 0, -delta );
				if ( Input.IsKeyDown( 40 ) ) // down
					plane.deltaPosition( 0, delta );
				if ( Input.IsKeyDown( 37 ) ) // left
					plane.deltaPosition( -delta, 0 );
				if ( Input.IsKeyDown( 39 ) ) // right
					plane.deltaPosition( delta, 0 );
				if ( Input.IsKeyDown( 32 ) ) // space
					game_player.tryToFire( frame );
					
				// Clamp the position
				var position = clampPosition( this.getWidth(), this.getHeight(), this.getPosition() );
				this.setPosition( position.x, position.y );
				
				// Update the position
				context.call( this, frame );
			};
		})();
	};	
	
	// Despawns the player
	this.despawn = function() {
		loop.stop();
		//plane.getSprite().hide();
	}
};