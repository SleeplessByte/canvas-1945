var PlayerBullet = function( srcimg, type, options ) {
	BasicBullet.call( this, srcimg, type, options );
	
	var damage = 1; // TODO damage per type
	var speed = -Game.getSpeed() * 1.5;
	
	// Returns the planes speed
	this.getSpeed = function() {
		return speed;
	};
	
	// Returns the planes health
	this.getDamage = function() {
		return damage;
	};
	
	//
	this.isSolid = function() {
		return true;
	};
	
	console.info( options );
	
	if ( options ) {
		
		// Set the health
		damage = options.damage || damage;
		speed = options.speed || speed;
	
		// Set the position
		if ( options.position ) {
			this.setPosition( options.position.x || 0, options.position.y || 0 );
			this.updatePosition( true );
			console.info( this.getPosition() );
		}
	}
}

PlayerBullet.prototype = Object.deepExtend( 
	Object.create( BasicBullet.prototype ),
	{ 				
		// On collision
		onCollision : function( collidee ) {
			if ( collidee instanceof BasicPlane )
				this.destroy();
		}
	}
);