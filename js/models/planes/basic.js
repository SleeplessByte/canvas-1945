var BasicPlane = function( srcimg, type, options ) {
	Sprite.call( this, srcimg, type );
	
	var health = 1; // TODO health per type

	// Returns the planes speed
	this.getSpeed = function() {
		return Game.getSpeed() * 1.5;
	};
	
	// Returns the planes health
	this.getHealth = function() {
		return health;
	};
	
	//
	this.damage = function( dmg ) {
		health -= dmg;
		if ( health <= 0 ) {
			this.explode();
		}
	};
	
	//
	this.isSolid = function() {
		return this.getSprite().getAnimation() != 'explode';
	};
	
	if ( options ) {
		
		// Set the health
		health = options.health || health;
	
		// Set the position
		if ( options.position ) {
			this.setPosition( options.position.x || 0, options.position.y || 0 );
			this.updatePosition( true );
		}
	}
}

BasicPlane.prototype = Object.deepExtend( 
	Object.create( Sprite.prototype ),
	{ 
		// The starting position of the animation
		getFramePositions : function() {
			return { 
				idle : {
					green 	: { x: 4, 	y: 466 	},
					orange	: { x: 4, 	y: 499 	},
					white	: { x: 103,	y: 466 	},
					olive	: { x: 202,	y: 466 	},
					blue	: { x: 301,	y: 466 	}
				},
				
				explode : {
					green 	: { x: 70, 	y: 169 	},
					orange	: { x: 70, 	y: 169 	},
					white	: { x: 70,	y: 169 	},
					olive	: { x: 70,	y: 169 	},
					blue	: { x: 70,	y: 169 	}
				}
			};
		},
	
		// The animation length (number of frames)
		getFrameLength : function() {
			return { 
				idle : { x: 3, y: 1 },
				explode : { x: 6, y: 1 },
			}
		},
	
		// The size of each animation frame
		getFrameSize : function() {
			return { w: 32, h: 32 }
		},
		
		update : function( frame ) {
			var delta = this.getSpeed() * frame.timeDiff / 1000;
			this.deltaPosition( 0, delta );
			
			this.updatePosition();
			if ( this.getPosition().y > Game.getStage().getHeight() )
				this.destroy();
		},
		
		// Exploded
		explode : function() {
			this.setAnimation( 'explode' );			
			// Hide when it's done.
			this.afterAnimation( this.afterExplode );				
		},
		
		// After explosion
		afterExplode : function() {
			this.destroy();
		},
		
		// On collision
		onCollision : function( collidee ) {
			
			//if ( collidee instanceof PlayerBullet )
			//	this.damage( collidee.getDamage() );
				
			if ( collidee instanceof PlayerPlane )
				this.damage( 100 );
		}
	}
);