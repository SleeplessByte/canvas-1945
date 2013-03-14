var GamePlayer = new function() {

	var name = null;
	var plane = null; 
	var points = 0;
	var lives = 0;
	var level = 0;
	var loop = null;
	
	this.getLives = function() {
		return lives;
	};
	
	this.getPlane = function() {
		return plane;
	};
	
	this.getPoints = function() {
		return points;
	};
	
	this.getLevel = function() {
		return level;
	};
	
	this.getName = function() {
		return name;
	};
	
	this.spawn = function( newname, sourceImage ) {
	
		name = newname;
		plane = new PlayerPlane( sourceImage );
		plane.attach( Game.getLayer( 'level' ) );
		plane.setPosition( 
			Math.floor( Game.getCenterStage().x - plane.getWidth() / 2 ), 
			400 
		);
		
		var context = this;
		var prev = Input.GetKeys();
		loop = new Kinetic.Animation( function( frame ) {
			
			var delta = 100 * frame.timeDiff / 1000;
			
			if ( Input.IsKeyDown( 38 ) ) // up
				plane.setPosition( plane.getPosition().x,  plane.getPosition().y - delta );
			if ( Input.IsKeyDown( 40 ) ) // down
				plane.setPosition( plane.getPosition().x,  plane.getPosition().y + delta );
			if ( Input.IsKeyDown( 37 ) ) // left
				plane.setPosition( plane.getPosition().x - delta,  plane.getPosition().y );
			if ( Input.IsKeyDown( 39 ) ) // right
				plane.setPosition( plane.getPosition().x + delta,  plane.getPosition().y );		
			
		}, Game.getLayer( 'level' ) );
		loop.start();
	};	
};