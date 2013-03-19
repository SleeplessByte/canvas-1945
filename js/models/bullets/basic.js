var BasicBullet = function( srcimg, type, options ) {
	Sprite.call( this, srcimg, type );
	
	var damage = 1; // TODO damage per type
	var speed = Game.getSpeed() * 1.5;
	
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

BasicBullet.prototype = Object.deepExtend( 
	Object.create( Sprite.prototype ),
	{ 
		// The starting position of the animation
		getFramePositions : function() {
			return { 
				idle : {
					ubub 	: { x: 4, 	y: 169 	},
					dbdb	: { x: 4, 	y: 202 	},
					ulb		: { x: 4,	y: 235 	},
					urb		: { x: 37,	y: 235 	},
					dlb		: { x: 70,	y: 235 	},
					drb		: { x: 103,	y: 235 	},
					lb		: { x: 136,	y: 235 	},
					rb		: { x: 169,	y: 235 	},
					ub		: { x: 37,	y: 169 	},
					roundb	: { x: 37,	y: 202 	},
					smallb	: { x: 70,	y: 202 	},
				},
			};
		},
	
		// The animation length (number of frames)
		getFrameLength : function() {
			return { 
				idle : { x: 1, y: 1 },
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
			
			// Destroy if out of bounds
			var position = this.getPosition();
			if ( !this.wasInView() )
				this.destroy();
		},
				
		// On collision
		// On collision
		onCollision : function( collidee ) {
			if ( collidee instanceof PlayerPlane )
				this.destroy();
		}
	}
);